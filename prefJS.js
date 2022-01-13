elemId(newSiteIP)
elemId(siteNameIP)
elemId(addSiteButton)
elemId(blockedSites)
elemId(webButtonsDiv)
elemId(clearWebs)

if (localStorage.getItem("sites")) {

    sites = JSON.parse(localStorage.getItem("sites"))
    renderSiteButtons(sites)
} else {
    sites = {
        FaceBook: {
            block: true,
            url: "www.facebook.com",
            default: true
        },
        YouTube: {
            block: true,
            url: "www.youtube.com",
            default: true
        },
        Instagram: {
            block: true,
            default: true,
            url: "www.instagram.com"
        },
        Twitter: {
            block: true,
            default: true,
            url: "twitter.com"
        },
        NetFlix: {
            block: true,
            default: true,
            url: "www.netflix.com"
        }
    }
    renderSiteButtons(sites)
}


addSiteButton.addEventListener("click", function () {
    addNewSite()
})

clearWebs.addEventListener("click", function () {
    clearSites()
})


function addNewSite() {
    if (newSiteIP.value == "" || siteNameIP.value == "") {
        alert("invalid!!!")
    } else {
        sites[siteNameIP.value] = {
            block: true,
            url: newSiteIP.value
        }

        localStorage.setItem("sites", JSON.stringify(sites))

        renderSiteButtons(sites)
        newSiteIP.value = ""
        siteNameIP.value = ""
    }
}

function clearSites() {
    sites = {
        FaceBook: {
            block: true,
            url: "www.facebook.com",
            default: true
        },
        YouTube: {
            block: true,
            url: "www.youtube.com",
            default: true
        },
        Instagram: {
            block: true,
            default: true,
            url: "www.instagram.com"
        },
        Twitter: {
            block: true,
            default: true,
            url: "twitter.com"
        },
        NetFlix: {
            block: true,
            default: true,
            url: "www.netflix.com"
        }
    }

    renderSiteButtons(sites)
    localStorage.setItem("sites", JSON.stringify(sites))
}


function renderSiteButtons(siteObject) {
    webButtonsDiv.innerHTML = ""
    for (elem of Object.keys(siteObject)) {
        let elementID=siteObject[elem]["url"]
        // console.log(elementID);
        let butt = `
                <button class="webButton${siteObject[elem]["default"] ? '' : 'New'}  blockSite${siteObject[elem]["block"]} siteBtns" id="${elementID}"> ${elem}
                </button>
                `
        webButtonsDiv.innerHTML += butt

    }
    
    Array.from(document.getElementsByClassName('siteBtns')).map(l1=>l1.addEventListener('click', function(){
        toggleBlocking(this.id)
    }))
}


function toggleBlocking(id) {
    let siteName = ''
    for (key of Object.keys(sites)) {
        if (sites[key]["url"] == id) {
            siteName = key
            break
        }
    }
    sites[siteName]['block'] = !sites[siteName]['block']
    localStorage.setItem("sites", JSON.stringify(sites))
    renderSiteButtons(sites)
}

function elemId(id) {
    id = document.getElementById(id)
}