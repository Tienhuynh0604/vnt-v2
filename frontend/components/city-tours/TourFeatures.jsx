import React, {memo} from "react";
import {Button} from "react-bootstrap";
import {Icon} from "@iconify/react";

const TourFeatures = ({}) => {
    return <div className="icon-flex-wrap justify-content-sm-start justify-content-md-between">
        <div className="btn-icon text-primary">
            <Icon icon={"bx:map"} height={45}/>
            <br/>
            <span>13 Bus stops</span>
        </div>
        <div className="btn-icon text-primary">
            <Icon icon={"akar-icons:sound-on"} height={45}/>
            <br/>
            <span>Multilingual audio commentary</span>
        </div>
        <div className="btn-icon text-primary">
            <Icon icon={"ant-design:clock-circle-outlined"} height={45}/>
            <br/>
            <span>90 minutes</span>
        </div>
        <div className="btn-icon text-primary">
            <Icon icon={"fluent:headphones-sound-wave-24-filled"} height={45}/>
            <br/>
            <span>Headphone</span>
        </div>
        <div className="btn-icon text-primary">
            <Icon icon={"bi:shield-plus"} height={45}/>
            <br/>
            <span>Tourism insurance</span>
        </div>
        <div className="btn-icon text-primary">
            <Icon icon={"akar-icons:wifi"} height={45}/>
            <br/>
            <span>Wifi</span>
        </div>
        <div className="btn-icon text-primary">
            <Icon icon={"clarity:map-outline-badged"} height={45}/>
            <br/>
            <span>City tour map</span>
        </div>
        <div className="btn-icon text-primary">
            <Icon icon={"fluent:drink-bottle-20-regular"} height={45}/>
            <br/>
            <span>A bottle of water</span>
        </div>
    </div>
};

export default memo(TourFeatures);