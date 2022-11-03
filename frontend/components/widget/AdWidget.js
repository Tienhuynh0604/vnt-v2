import React, {memo} from "react";
import Image from "next/future/image";

const AdWidget = (props) => {
    return <div className="ad-wg">
        <Image alt={"Vietlife"} src={"/images/advl.jpg"}
               width="0"
               height="0"
               sizes="100vw"
               style={{width: '100%', height: 'auto'}}
        />
    </div>;
};


export default memo(AdWidget);