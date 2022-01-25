// responding to a request made by loaded page on chrome
chrome.extension.onRequest.addListener(newPageHandler);

const urlExtractor = (url) => {
  if (url.indexOf(" ") != -1) throw new Error("Spaces Not allowed");
  if (url.indexOf("//") != -1) {
    url = url.split("//")[1];
  }
  url = url.split("/")[0];
  if (url.startsWith("www.")) {
    url = url.substring(4);
  }
  return url;
};

// handling the request and sending a response back to the requesting page
function newPageHandler(request, sender, sendResponse) {
  const currentUrl = urlExtractor(sender.tab.url);
  let dataSending = parseTransferData(currentUrl);
  let currentTask = "";
  try {
    currentTask = JSON.parse(localStorage.getItem("currentTaskText"));
  } catch (error) {}
  sendResponse({
    blockingData: dataSending,
    currentUrl,
    currentTask,
  });
}

function parseTransferData(currentUrl) {
  let sendAbleData = {
    toBlock: false,
  };
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

  let sites = JSON.parse(localStorage.getItem("sites"));
  let focusStatusVar = focusStatus();
  let blockAbleURL = containsString(currentUrl, sites);

  if (blockAbleURL) {
    sendAbleData.toBlock = focusStatusVar;
  }
  return sendAbleData;
}

// to get the focus status from local storage

function focusStatus() {
  if (localStorage.getItem("checkboxChecked")) {
    checkboxChecked = JSON.parse(localStorage.getItem("checkboxChecked"));
  } else {
    checkboxChecked = false;
  }
  return checkboxChecked;
}

// check if sent url contains blocked sites' url

function containsString(currentUrl, siteObject) {
  for (elem of Object.keys(siteObject)) {
    const blockedUrl = urlExtractor(siteObject[elem]["url"]);
    if (currentUrl == blockedUrl) {
      if (siteObject[elem]["block"]) {
        return true;
      } else return false;
    }
  }
  return false;
}
