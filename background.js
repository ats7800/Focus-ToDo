// responding to a request made by loaded page on chrome
chrome.extension.onRequest.addListener(newPageHandler);

// handling the request and sending a response back to the requesting page
function newPageHandler(request, sender, sendResponse) {
    let linkString = sender.tab.url
    let dataSending = parseTransferData(linkString)
    sendResponse({
        blockingData: dataSending,
        linkString1: linkString
    });
}

function parseTransferData(stringLink) {

    let sendAbleData={
        toBlock:false
    }
// parsing defalut blocked websites and newly added ones each time request is made
    // if (localStorage.getItem("sites")) {
        // sites = JSON.parse(localStorage.getItem("sites"))
    // } else {
        // sites={
        //     FaceBook:{
        //         block:true,
        //         url:"www.facebook.com",
        //         default:true
        //     },
        //     YouTube:{
        //         block:true,
        //         url:"www.youtube.com",
        //         default:true
        //     },
        //     Instagram:{
        //         block:true,
        //         default:true,
        //         url:"www.instagram.com"
        //     },
        //     Twitter:{
        //         block:true,
        //         default:true,
        //         url:"twitter.com"
        //     },
        //     NetFlix:{
        //         block:true,
        //         default:true,
        //         url:"www.netflix.com"
        //     }
        // }
    // }

    let sites = JSON.parse(localStorage.getItem("sites"))
    let focusStatusVar=focusStatus()
    let blockAbleURL=containsString(stringLink, sites)

    if(blockAbleURL){
        sendAbleData.toBlock=focusStatusVar
    }
    return sendAbleData
}

// to get the focus status from local storage

function focusStatus(){
    if (localStorage.getItem("checkboxChecked")) {
        checkboxChecked = JSON.parse(localStorage.getItem("checkboxChecked"))
    }else{
        checkboxChecked = false
    }
    return checkboxChecked
}

// check if sent url contains blocked sites' url

function containsString(stringLink,siteObject){
    for(elem of Object.keys(siteObject)){
        if(stringLink.indexOf(siteObject[elem]['url'])<12&&stringLink.indexOf(siteObject[elem]['url'])>-1){
            if(siteObject[elem]['block']){
                return true
            }else return false
        }
    }
    return false
}

console.log("no error");
