import React, {memo} from "react";
import Image from "next/image";
import {Button} from "react-bootstrap";
import {Icon} from "@iconify/react";

const FloatingButton = ({onClick, icon, className}) => {
    return <Button className={`btn-floating hvr-pulse ${className}`} onClick={onClick}>
        <Icon icon={icon}/>
    </Button>
};

export default memo(FloatingButton);