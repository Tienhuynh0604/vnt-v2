import React, {memo} from "react";
import {Icon} from "@iconify/react";
import Link from "next/link";

const TourFeatures = ({id = "", features = []}) => {
    return <div id={id}  className="icon-flex-wrap justify-content-between">
        {features.map((item, idx) => {
            return (
                <Link href={item.link ? item.link : `#${id}`} scroll key={`fl_${idx}`}>
                    <div className="btn-icon text-primary">
                        <Icon icon={item.optionValue} height={45}/>
                        <br/>
                        <span>{item.title}</span>
                    </div>
                </Link>
            )
        })}
    </div>
};

export default memo(TourFeatures);