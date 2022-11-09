import React, {memo} from "react";
import Image from "next/image";

const DecorComponent = () => {
    return <>
        <Image src="/images/Frame-2.png"
               width={658}
               height={522}
               className="position-absolute"
               alt={"vn-sightseeing"}
               style={{
                   left: 0,
                   bottom: 0,
                   maxWidth: "50%",
                   zIndex: -1,
                   height: "auto"
               }}
        />
        <Image src="/images/Frame-1.png"
               width={658}
               height={522}
               className="position-absolute"
               alt={"vn-sightseeing"}
               style={{
                   right: 0,
                   bottom: 0,
                   maxWidth: "50%",
                   zIndex: -1,
                   height: "auto"
               }}
        />
    </>
};

export default memo(DecorComponent);