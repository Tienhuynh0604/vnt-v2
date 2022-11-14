import React from "react";
import Script from "next/script";

const FacebookChatScript = ({facebookPageId}) => {

    if(!facebookPageId){
        return <></>;
    }

    return <>
        <Script id="fb-customer-chat" strategy="afterInteractive">
            {`
                var chatbox = document.getElementById('fb-customer-chat');
                chatbox.setAttribute("page_id", "${facebookPageId}");
                chatbox.setAttribute("attribution", "biz_inbox");
            `}
        </Script>
        <Script id="fb-sdk-load" strategy="afterInteractive">
            {`
                window.fbAsyncInit = function() {
                FB.init({
                      xfbml            : true,
                      version          : 'v15.0'
                    });
                  };
        
                  (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                    fjs.parentNode.insertBefore(js, fjs);
                  }(document, 'script', 'facebook-jssdk'));
            `}
        </Script>
    </>
};

export default FacebookChatScript;