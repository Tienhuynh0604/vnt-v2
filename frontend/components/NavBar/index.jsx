import React, {useState} from "react";
import NavHeader from "./nav-header";
import {useRouter} from 'next/router'
import {useAppContext} from "../../layouts/AppLayout";
import Link from "next/link";
import {Navbar as NavBarBs, NavbarBrand, Badge, Container, NavDropdown} from "react-bootstrap";
import {renderImage} from "../../ulti/appUtil";
import {useTranslation} from "react-i18next";
import Image from "next/image";
import {Icon} from "@iconify/react";

const NavBar = (props) => {

    const {t} = useTranslation("common");
    const {headerMenus, common, cartModal, setCartModal, locale} = useAppContext();
    const router = useRouter();
    const {asPath} = router;
    const [expanded, setExpanded] = useState(false);

    let activeRoute = null;
    if (asPath) {
        const [param1, param2] = asPath.split('/');
        activeRoute = param2;
    }

    const onToggle = (e) => {
        setExpanded(e);
    };

    const closeNav = () => {
        setExpanded(false);
    };

    const onShowCart = () => {
        setCartModal({
            ...cartModal,
            isVisible: true,
        })
    };

    const renderMenuItems = () => {
        if (!headerMenus) {
            return [];
        }

        let items = [];

        headerMenus.map(item => {
            if (item.items && item.items.length > 0) {
                items.push(renderItemWithChild(item));
            } else {
                items.push(renderItem(item));
            }
        });

        return items;
    };

    const renderItemWithChild = (item) => {
        let childItems = [];
        item.items.map(c => {
            childItems.push(<li key={`navc${c.id}`}>
                <Link href={c.path} className="dropdown-item" onClick={closeNav}>
                    {c.title}
                </Link>
            </li>);
        });

        return <li className="nav-item dropdown" key={`navc${item.id}`}>
            {/*<Link href={item.path && item.path.length > 0 ? item.path : "#"}*/}
            {/*      className={`nav-link dropdown-toggle ${activeRoute && `/${activeRoute}` === item.path ? "active" : ""}`}*/}
            {/*      id={`navbarDropdown${item.id}`}*/}
            {/*      role="button"*/}
            {/*      data-bs-hover="dropdown" aria-expanded="false"*/}
            {/*>*/}
            <NavDropdown title={item.title} id={`navbarDropdown${item.id}`}>
                {childItems.map(i => i)}
            </NavDropdown>
        </li>
    };

    const renderItem = (item) => {
        return <li className="nav-item" key={`navc${item.id}`}>
            <Link href={item.path}
                  className={`nav-link ${activeRoute && `/${activeRoute}` === item.path ? "active" : ""}`}
            >
                {item.title}
            </Link>
        </li>
    };

    return <div className="header-navbar">
        {/*<NavHeader/>*/}
        {/*<hr className="m-0"/>*/}
        <NavBarBs expand="lg" className="main-navbar py-0" expanded={expanded} onToggle={onToggle}>
            <Container className="d-flex align-items-start">
                <NavbarBrand href="/">
                    {renderImage(common.logo)}
                </NavbarBrand>
                <NavBarBs.Toggle aria-controls="basic-navbar-nav"/>
                <NavBarBs.Collapse className="d-lg-flex justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/"
                                  className={`nav-link ${!activeRoute || activeRoute === "/" ? "active" : ""}`}
                                  onClick={closeNav}
                                  aria-current="page"
                            >
                                {t("Home")}
                            </Link>
                        </li>
                        {renderMenuItems()}
                        <li className="nav-item">
                            <NavDropdown
                                title={<span className="text-uppercase"><Image alt={locale} src={`/images/${locale}.jpg`} width={27} height={21}/> {locale}</span>}
                                className="d-inline-block me-3">
                                <NavDropdown.Item href="/en">
                                    <Image alt={"English"} src="/images/en.jpg" width={27} height={21}/> EN
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/vi">
                                    <Image alt={"Tiếng Việt"} src="/images/vi.jpg" width={27} height={21}/> VI
                                </NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li className="nav-item">
                            <a
                                  className={`nav-link ${!activeRoute || activeRoute === "/" ? "active" : ""}`}
                                  onClick={()=>{
                                      closeNav();
                                      onShowCart();
                                  }}
                                  aria-current="page"
                            >
                                <Icon icon={"bi:cart-fill"} height={24}/>
                                <Badge pill bg="danger">{cartModal.items.length}</Badge>
                            </a>
                        </li>
                    </ul>
                </NavBarBs.Collapse>
            </Container>
        </NavBarBs>
    </div>;
};

export default NavBar;