// sending request to extension background page
chrome.extension.sendRequest({}, function (response) {
  console.log(response);
  blocker(response);
});

// to execute blocking script
function blocker(response) {
  const task = response.currentTask;
  if (response.blockingData.toBlock) {
    document.body.innerHTML = `
        <h1 style="text-align:center; margin-top:100px; color:red">This Site Is Blocked For now You need to Complete your Task first</h1>
        `;
    setTimeout(() => {
      alert(
        `${response.currentUrl}\nIs currently blocked\n${
          task == "Focus On" || task == ""
            ? "Focus Mode Is On"
            : task + " event is going on!"
        } `
      );
    }, 0);
  }
}
