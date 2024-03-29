import React from "react";
import Image from "next/image";
import Link from "next/link";

const TitleSection = ({
                          title = "Hà Nội",
                          coverImage,
                          breadcrumbs = [],
                      }) => {
    return <section className="title-section">
        <div className={"cover"}>
            <Image src={coverImage ? coverImage : "/images/bg/bg-1.jpg"}
                   alt={title}
                   fill={true}
                   style={{objectFit:"cover"}}
            />
            <div className="overlay"/>
            <div className="nav-block">
                <h1 className="text-uppercase" style={{fontWeight: "bold"}}>{title}</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" aria-current="page">
                            <Link href={"/"}>
                                <span className="text-light">Home</span>
                            </Link>
                        </li>
                        {breadcrumbs.map((item, idx) => {
                            return <li key={`brc_${idx}`} className={`breadcrumb-item ${idx === breadcrumbs.length - 1 ? "active" : ""}`}
                                       aria-current="page">
                                <Link href={item.link}>
                                    <span className="text-light text-capitalize">{item.title}</span>
                                </Link>
                            </li>
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    </section>
};

export default TitleSection;