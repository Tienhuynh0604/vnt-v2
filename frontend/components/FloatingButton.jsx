import React, {memo} from "react";
import Image from "next/image";
import {Badge, Button} from "react-bootstrap";
import {Icon} from "@iconify/react";

const FloatingButton = ({onClick, icon, className, badgeNum = null}) => {
    return <Button className={`btn-floating hvr-pulse ${className}`} onClick={onClick}>
        {badgeNum > 0 && <Badge pill bg="danger">{badgeNum}</Badge>}
        <Icon icon={icon}/>
    </Button>
};

export default memo(FloatingButton);