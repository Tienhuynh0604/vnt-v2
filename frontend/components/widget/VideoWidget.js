import React, {memo} from "react";
import Link from "next/link";
import Image from "next/future/image";

const VideoWidget = ({className = ""}) => {

    return <div className={`${className} video-ad-wg`}>
        <h6>Video về Vietlife</h6>
        <Link href={"/"} target="_blank">
            <div className="video-item">
                <div className="video-thumb">
                    <Image alt={"Vietlife"} src={"/images/advideo.jpg"}
                           width="0"
                           height="0"
                           sizes="100vw"
                           style={{width: '100%', height: 'auto'}}
                    />
                    <div className="video-btn">
                        <Image alt={"Vietlife"} src={"/images/bi_play-circle.png"} width={57} height={58}/>
                    </div>
                </div>
            </div>
        </Link>
    </div>;
};


export default memo(VideoWidget);