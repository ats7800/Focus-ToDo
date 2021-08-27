// sending request to extension background page
chrome.extension.sendRequest({}, function(response) {
    console.log(response);
    blocker(response.blockingData.toBlock)
})

// to execute blocking script
function blocker(BlockBool){
    if(BlockBool){
        document.body.innerHTML=`
        <h1 style="text-align:center; margin-top:100px; ">This Site Is Blocked For now You need to Complete your Task first</h2>
        `
    }
}