import React, {useEffect, useRef, useState, memo} from "react";
import Image from "next/future/image";
import Button from "react-bootstrap/Button";

const ShowMoreContent = (props) => {
    const {content, hideHeight = 700} = props;

    const [isHideContent, setIsHideContent] = useState(true);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    const showContent = () => {
        setIsHideContent(false);
    };

    useEffect(() => {
        if(ref){
            setHeight(ref.current.clientHeight);
        }
    }, [content]);

    const renderHideArrow = () => {
        if (!isHideContent) {
            return <></>;
        }
        return <div className="show-more-arrow">
            <div className={"show-more-alpha"}/>
            <Image alt={"vl"} src={"/images/navigate_next.png"} width={48} height={48}/>
            <Button onClick={showContent} variant={"link"}>Xem thêm</Button>
        </div>
    };

    const maxHeightStyle = isHideContent ? {
        maxHeight: `${hideHeight}px`
    } : {};

    return <div className={`show-more-content ${!isHideContent ? "show-more-content-showed" : ""}`}>
        <div className={isHideContent ? "overflow-hidden" : "overflow-visible"}
             style={maxHeightStyle}
             ref={ref}
        >
            {content}
        </div>
        {renderHideArrow()}
    </div>
        ;

};


export default memo(ShowMoreContent);