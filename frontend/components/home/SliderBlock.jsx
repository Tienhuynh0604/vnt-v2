import {Row, Carousel, Container, Col, Button} from 'react-bootstrap';
import Link from "next/link";
import React, {memo} from "react";
import {nl2br, renderImage} from "../../ulti/appUtil";
import {getImageUrl} from "../../ulti/helper";
import Image from "next/image";
import {strapiImg} from "../../ulti/strapiHelper";

const SliderBlock = ({dataSource = []}) => {

    if (dataSource.length === 0) {
        return <></>;
    }

    return <Carousel fade className={"main-slider"}>
        {dataSource.map((item, idx) => {
            return <Carousel.Item key={`main-banner${idx}`}>
                <div className="main-slider-item">
                    {item.image
                    && <div className="slider-img">
                        {strapiImg(item.image.data, '', true, true, 'default', 100)}
                    </div>}
                    <Carousel.Caption>
                        <div className="sub-title" dangerouslySetInnerHTML={{__html: nl2br(item.subTitle)}}/>
                        <h3 className="title mt-2" dangerouslySetInnerHTML={{__html: nl2br(item.title)}}/>
                        {item.ctaText &&
                        <Link href={item.ctaLink}>
                            <Button className="mt-2" type={"button"} color={'primary'}>
                                {item.ctaText}
                            </Button>
                        </Link>
                        }
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        })}
    </Carousel>
};

export default memo(SliderBlock);