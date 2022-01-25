elemId(newSiteIP);
elemId(siteNameIP);
elemId(addSiteButton);
elemId(blockedSites);
elemId(webButtonsDiv);
elemId(clearWebs);

if (localStorage.getItem("sites")) {
  sites = JSON.parse(localStorage.getItem("sites"));
  renderSiteButtons(sites);
} else {
  sites = {
    FaceBook: {
      block: true,
      url: "www.facebook.com",
      default: true,
    },
    YouTube: {
      block: true,
      url: "www.youtube.com",
      default: true,
    },
    Instagram: {
      block: true,
      default: true,
      url: "www.instagram.com",
    },
    Twitter: {
      block: true,
      default: true,
      url: "twitter.com",
    },
    NetFlix: {
      block: true,
      default: true,
      url: "www.netflix.com",
    },
  };
  renderSiteButtons(sites);
}

addSiteButton.addEventListener("click", function () {
  addNewSite();
});

clearWebs.addEventListener("click", function () {
  clearSites();
});

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

function addNewSite() {
  try {
    if (newSiteIP.value == "" || siteNameIP.value == "")
      throw new Error("Empty Value fields Not Permitted");
    const url = urlExtractor(newSiteIP.value);
    sites[siteNameIP.value] = {
      block: true,
      url: url,
    };

    localStorage.setItem("sites", JSON.stringify(sites));

    renderSiteButtons(sites);
    newSiteIP.value = "";
    siteNameIP.value = "";
  } catch (error) {
    alert(error.message);
  }
}

function clearSites() {
  sites = {
    FaceBook: {
      block: true,
      url: "www.facebook.com",
      default: true,
    },
    YouTube: {
      block: true,
      url: "www.youtube.com",
      default: true,
    },
    Instagram: {
      block: true,
      default: true,
      url: "www.instagram.com",
    },
    Twitter: {
      block: true,
      default: true,
      url: "twitter.com",
    },
    NetFlix: {
      block: true,
      default: true,
      url: "www.netflix.com",
    },
  };

  renderSiteButtons(sites);
  localStorage.setItem("sites", JSON.stringify(sites));
}

function renderSiteButtons(siteObject) {
  webButtonsDiv.innerHTML = "";
  for (elem of Object.keys(siteObject)) {
    let elementID = siteObject[elem]["url"];
    let butt = `
                <button class="webButton${
                  siteObject[elem]["default"] ? "" : "New"
                }  blockSite${
      siteObject[elem]["block"]
    } siteBtns" id="${elementID}"> ${elem}
                </button>
                `;
    webButtonsDiv.innerHTML += butt;
  }

  Array.from(document.getElementsByClassName("siteBtns")).map((l1) =>
    l1.addEventListener("click", function () {
      toggleBlocking(this.id);
    })
  );
}

function toggleBlocking(id) {
  let siteName = "";
  for (key of Object.keys(sites)) {
    if (sites[key]["url"] == id) {
      siteName = key;
      break;
    }
  }
  sites[siteName]["block"] = !sites[siteName]["block"];
  localStorage.setItem("sites", JSON.stringify(sites));
  renderSiteButtons(sites);
}

function elemId(id) {
  id = document.getElementById(id);
}
