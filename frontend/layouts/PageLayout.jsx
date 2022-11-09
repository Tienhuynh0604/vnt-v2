import React from "react";
import TitleSection from "../components/TitleSection";

const PageLayout = ({
                        children,
                        title = "Hà Nội",
                        coverImage = "/images/bg/bg-1.jpg",
                        breadcrumbs = [],
                    }) => {
    return (
        <>
            <TitleSection title={title} coverImage={coverImage} breadcrumbs={breadcrumbs}/>
            <section className="page-section">
                {children}
            </section>
        </>
    )
};

export default PageLayout;