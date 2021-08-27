elemId(newSiteIP)
elemId(siteNameIP)
elemId(addSiteButton)
elemId(blockedSites)
elemId(webButtonsDiv)
elemId(insta)
elemId(faceBook)
elemId(youtube)
elemId(twitter)
elemId(netflix)
elemId(clearWebs)
console.log("good till now ext");


if(localStorage.getItem("blockedSitesNames")){
    blockedSitesNames=JSON.parse(localStorage.getItem("blockedSitesNames"))
    blockedSitesLink=JSON.parse(localStorage.getItem("blockedSitesLink"))
    renderSiteButtons(blockedSitesNames)
}else{
    blockedSitesNames=[]
    blockedSitesLink=["www.youtube.com","www.facebook.com","twitter.com","www.netflix.com","www.instagram.com"]
}



// function disable(idOfElem){
// let tempElem=document.getElementById(idOfElem)
// tempElem.style.backgroundColor="rgb(216, 103, 103)"
// }
// function remove(idOfElem){
//     let tempElem=document.getElementById(idOfElem)

// }

addSiteButton.addEventListener("click",function(){
    addNewSite()
})

clearWebs.addEventListener("click",function(){
    clearSites()
})

console.log("hi");

function addNewSite(){
    if(newSiteIP.value==""||siteNameIP.value==""){
        alert("invalid!!!")
    } else {        
        blockedSitesNames.push(siteNameIP.value)
        blockedSitesLink.push(newSiteIP.value)

        localStorage.setItem("blockedSitesNames",JSON.stringify(blockedSitesNames))
        localStorage.setItem("blockedSitesLink",JSON.stringify(blockedSitesLink))

        renderSiteButtons(blockedSitesNames)
        newSiteIP.value=""
        siteNameIP.value=""
    }
}

function clearSites() {
    blockedSitesNames=[]
    blockedSitesLink = ["www.youtube.com", "www.facebook.com", "twitter.com", "www.netflix.com", "www.instagram.com"]
    renderSiteButtons(blockedSitesNames)
    localStorage.setItem("blockedSitesNames",JSON.stringify(blockedSitesNames))
    localStorage.setItem("blockedSitesLink",JSON.stringify(blockedSitesLink))    
}

function renderSiteButtons(arr){
    webButtonsDiv.innerHTML=""
    arr.forEach(elem => {
        let butt=`
        <button class="webButtonNew" id="${elem}"> ${elem}
        </button>
        `
        webButtonsDiv.innerHTML+=butt
    });
}












function elemId(id){
    id=document.getElementById(id)
}