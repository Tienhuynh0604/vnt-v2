import React from "react";
import EmptyLayout from "../layouts/EmptyLayouts";
import absoluteUrl from "next-absolute-url";
import {callGet, initialProps} from "../ulti/helper";

const Index = (props) => {

    return <>
    </>
};

export default Index;

Index.getLayout = (page, props) => {
    return <EmptyLayout {...props}>
        {page}
    </EmptyLayout>
};


const createArticleSitemapItem = (item, origin, locale, changeFeq = "yearly", priority = 0.5) => {
    return `<url>
                <loc>${origin}/${locale}/articles/${item.attributes.slug}</loc>
                <changefreq>${changeFeq}</changefreq>
                <priority>${priority}</priority>
            </url>`;
};

const createTourSitemapItem = (item, origin, locale, changeFeq = "monthly", priority = 1.0) => {
    return `<url>
                <loc>${origin}/${locale}/${item.attributes.destination?.data?.attributes?.slug}/${item.attributes.slug}</loc>
                <changefreq>${changeFeq}</changefreq>
                <priority>${priority}</priority>
            </url>`;
};

const createDestinationSitemapItem = (item, origin, changeFeq = "monthly", priority = 1.0) => {
    return `<url>
                <loc>${origin}/city-tours/${item.attributes.slug}</loc>
                <changefreq>${changeFeq}</changefreq>
                <priority>${priority}</priority>
            </url>`
};

const genDestinationSiteMap = async (allTours, origin, locale = "en") => {
    let models = await callGet(`/destinations`, {
        fields: ['slug'],
        pagination: {
            page: 1,
            pageSize: 100
        }
    }, locale, true);

    if (models) {
        models.data.forEach(item => {
            allTours.push(createDestinationSitemapItem(item, origin));
        });
        let count = 1;
        while (models.meta.page < models.meta.pageCount || count > 500) {
            models = await callGet(`/destination`, {
                fields: ['slug'],
                pagination: {
                    page: models.meta.page + 1,
                    pageSize: 100
                }
            }, locale, true);
            models.data.forEach(item => {
                allTours.push(createDestinationSitemapItem(item, origin));
            });
            count++;
        }
    }
};

const genTourSiteMap = async (allTours, origin, locale = "en") => {
    let models = await callGet(`/tours`, {
        fields: ['slug'],
        populate: {
            destination: {
                fields: ['slug']
            }
        },
        pagination: {
            page: 1,
            pageSize: 100
        }
    }, locale, true);

    if (models) {
        models.data.forEach(item => {
            allTours.push(createTourSitemapItem(item, origin, locale));
        });
        let count = 1;
        while (models.meta.page < models.meta.pageCount || count > 500) {
            models = await callGet(`/articles`, {
                fields: ['slug'],
                pagination: {
                    page: models.meta.page + 1,
                    pageSize: 100
                }
            }, locale, true);
            models.data.forEach(item => {
                allTours.push(createTourSitemapItem(item, origin, locale));
            });
            count++;
        }
    }
};

const genArticlesSitemap = async (allArticles, origin, locale = "en") => {
    let allViArticles = await callGet(`/articles`, {
        fields: ['slug'],
        pagination: {
            page: 1,
            pageSize: 100
        }
    }, locale, true);

    if (allViArticles) {
        allViArticles.data.forEach(item => {
            allArticles.push(createArticleSitemapItem(item, origin, locale));
        });
        let count = 1;
        while (allViArticles.meta.page < allViArticles.meta.pageCount || count > 500) {
            allViArticles = await callGet(`/articles`, {
                fields: ['slug'],
                pagination: {
                    page: allArticles.meta.page + 1,
                    pageSize: 100
                }
            }, locale, true);
            allViArticles.data.forEach(item => {
                allArticles.push(createArticleSitemapItem(item, origin, locale));
            });
            count++;
        }
    }
};

const getMenuSitemap = async (menus, origin, locale) => {
    const navigation = await callGet(`/navigation/render/header`, {
        type: 'TREE'
    }, locale, true);
    navigation.forEach(item => {
        if (item.items && item.items.length > 0) {
            item.items.forEach(c => {
                let path = c.type === "INTERNAL" ? `/${c.related.slug}` : c.path;
                if (!path.startsWith("http://") && !path.startsWith("https://")) {
                    path = `${origin}/${locale}${item.path}${path}`;
                }
                menus.push(`<url>
                        <loc>${path}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>0.6</priority>
                    </url>`);
            });
        } else {
            menus.push(`
                    <url>
                        <loc>${origin}/${locale}${item.path}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>0.8</priority>
                    </url>
                `);
        }
    });
};

export const getServerSideProps = async (context) => {
    const {res, req} = context;
    const {origin} = absoluteUrl(req, 'localhost:3000');

    const menus = [];
    const allArticles = [];
    const tours = [];
    const destination = [];
    try {
        await getMenuSitemap(menus, origin, "vi");
        await getMenuSitemap(menus, origin, "en");
        await genArticlesSitemap(allArticles, origin, "vi");
        await genArticlesSitemap(allArticles, origin, "en");
        await genDestinationSiteMap(destination, origin);
        await genTourSiteMap(tours, origin, 'vi');
        await genTourSiteMap(tours, origin, 'en');
    } catch (e) {
        console.error(e);
    }
    res.setHeader('Content-Type', 'text/xml');
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${origin}</loc>
          <changefreq>monthly</changefreq>
          <priority>1</priority>
        </url>
        ${menus}
        ${allArticles}
        ${destination}
        ${tours}
    </urlset>`);
    res.end();
    return {
        props: {}
    }
};