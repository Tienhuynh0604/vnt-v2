import React, {memo, useEffect, useState} from "react";
// import LightGallery from 'lightgallery/react';
// import Image from "next/image";
// import Link from "next/link";
import {getImageUrl} from "../../ulti/helper";
import ImageGallery from "../../lib/react-image-gallery/src/ImageGallery";

const ImageSlider = ({images = []}) => {
    const [rImages, setRImages] = useState([]);

    const onInit = () => {
    };

    useEffect(() => {
        setRImages(images.map(image => {
            return {
                original: getImageUrl(image.attributes.url),
                thumbnail: getImageUrl(image.attributes.url),
                originalAlt: image.attributes.name,
                thumbnailAlt: image.attributes.name,
            }
        }))
    }, [images]);

    // const renderEachImage = (image) => {
    //     if (!image) return '';
    //     return (
    //         <LightGallery
    //             onInit={onInit}
    //             speed={500}
    //         >
    //             <Link href={`${getImageUrl(image.attributes.url)}`}>
    //                 <Image src={`${getImageUrl(image.attributes.url)}`}
    //                        fill
    //                        alt={getImageUrl(image.attributes.name)}/>
    //             </Link>
    //         </LightGallery>
    //     )
    // };

    return <>
        <div className="image-slider-item">
            <ImageGallery items={rImages}
                          thumbnailPosition={"right"}
                          showBullets={true}
                          autoPlay={false}
                          infinite={true}
            />
        </div>
    </>
};

export default memo(ImageSlider);