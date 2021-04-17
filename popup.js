// 71 Lines -- Matteo Mosca
'use strict';
// Login to the "server-side" https://bubble.io/page?name=index&id=lootv1&tab=tabs-2

// Constants
const FRAME_SRC_ORIGIN = "https://lootv1.bubbleapps.io";
const FRAME_SRC = `${FRAME_SRC_ORIGIN}/version-test?debug_mode=true`;

window.onload = load_iframe();

function load_iframe()
{
    var iframe = document.createElement('iframe');
    iframe.id = "71Lines-iFrame";
    iframe.src = FRAME_SRC;
    iframe.frameBorder= 0; 
    iframe.scrolling= "no";
    iframe.style.cssText = 'width:300px;height:600px;';
    document.body.appendChild(iframe);
}

// With "addEventListener" we register the current page window as listener for the
// postMessage's events. This means that when we call it from the Bubble app 
// (see Step 5 of this lesson) we'll execute the javascript function defined below
window.addEventListener('message', (event) => {

    console.log(`71Lines-Chrome Extension: postMessage called from: ${event.origin}`);
    // Event.origin is the URL of the window that posts the message. 
    // For security reasons, we'll ignore all the messages sent by windows with URLs 
    // different than our Bubble app's URL. Make sure to replace [YOUR NAME]
    if (event.origin != FRAME_SRC_ORIGIN) { return; }

    console.log("71Lines-Chrome Extension: postMessage's targetOrigin validated, OK.");

    //bubble_fn_tabOpened
    // We get the iFrame's window that loads the Bubble app and we send our message to Bubble
    var iframe = document.getElementById("71Lines-iFrame");
    var iframeWindow = (iframe.contentWindow || iframe.contentDocument);
    switch(event.data.event) {
        case "LOADED":
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                let url = (new URL(tabs[0].url));
                console.log(`The current URL is: ${tabs[0].url}`);

                const msg = JSON.stringify( {"hostname": url.hostname});
                iframeWindow.postMessage( {"msg": msg}, "*");
            });
            break;
        default:
            console.error("UNKNOWN Event!")
    }
}, false);
