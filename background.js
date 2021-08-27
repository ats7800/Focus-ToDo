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
    if (localStorage.getItem("blockedSitesLink")) {
        blockedSitesLink = JSON.parse(localStorage.getItem("blockedSitesLink"))
    } else {
        blockedSitesLink = ["www.youtube.com", "www.facebook.com", "twitter.com", "www.netflix.com", "www.instagram.com"]
    }

    let focusStatusVar=focusStatus()
    let blockAbleURL=containsString(stringLink, blockedSitesLink)

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
function containsString(string, arrOString) {
    for (let i = 0; i < arrOString.length; i++) {
        const elem = arrOString[i];
        if(string.indexOf(elem)!=-1){
            return true
        }
    }
    return false
}
console.log("no error");
