import React from "react";
import Image from "next/image";
import {getImageUrl} from "../ulti/helper";

const TitleSection = ({
                          title = "Hà Nội",
                          coverImage = "/images/bg/bg-1.jpg",
                          breadcrumbs = [],
                      }) => {
    return <section className="title-section">
        <div className={"cover"}>
            <Image src={coverImage}
                   alt={title}
                   fill={true}
                   objectFit="cover"
            />
            <div className="overlay"/>
            <div className="nav-block">
                <h1>{title}</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" aria-current="page">Home</li>
                        <li className="breadcrumb-item" aria-current="page">City tours</li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>
            </div>
        </div>
    </section>
};

export default TitleSection;