function getCookie(cookieName) {
    for (const cookie of document.cookie.split(";")) {
        var name = cookie.split("=")[0];
        var content = cookie.split("=")[1];
        if (name === cookieName) {
            return content;
        }
    }
    return null;
}
chrome.storage.sync.get((data) => {
    if (data.marginTop) {
        document.getElementById("search-section").style.marginTop = data.marginTop + "px";
    }
    if (data.searchWidth) {
        document.getElementById("search-input").style.width = data.searchWidth + "px";
    }
    if (data.linksWidth) {
        document.getElementById("links-div").style.width = data.linksWidth + "px";
    }
    if (data.links) {
        document.getElementById("links-div").innerHTML = data.links;
    }
    console.log(data);
});

var clear = document.getElementById("search-clear");
var input = document.getElementById('search-input');
clear.addEventListener("click", () => {
    input.value = "";
    clear.style.display = 'none';
});
input.addEventListener("keyup", () => {
    clear.style.display = input.value === '' ? 'none' : 'inline-flex';
});
var editMode = false;
var editDiv = document.getElementById("links-div");
var editButton = document.getElementById("edit-button");
var activeElement = null;
editButton.addEventListener("click", () => {
    if (editMode) {
        editMode = false;
        editButton.querySelector("#edit").style.display = "";
        editButton.querySelector("#close").style.display = "none";
        editDiv.querySelectorAll("h2").forEach((element) => {
            element.contentEditable = false;
        });
        document.querySelectorAll(".LVal7b").forEach((element) => {
            element.querySelector("#add-button").remove();
        });
        editDiv.querySelectorAll("a").forEach((element) => {
            element.querySelector("#delete-button").remove();
            element.removeEventListener("click", preventDefault);
            element.querySelector("div").removeEventListener("click", edit);
        });
        editDiv.querySelectorAll(".Rq5Gcb").forEach((element) => {
            element.contentEditable = false;
        });
        document.getElementById("add-section-button").remove();
    } else {
        editMode = true;
        var button = document.createElement("button");
        button.id = "add-section-button";
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>`;
        editDiv.appendChild(button);
        document.getElementById("add-section-button").addEventListener("click", function () {
            var h2 = document.createElement("h2");
            h2.contentEditable = true;
            h2.innerHTML = `Section`;
            document.getElementById("add-section-button").insertAdjacentElement("beforebegin", h2);
            var div = document.createElement("div");
            div.className = "EHzcec";
            div.style.height = "120px";
            div.innerHTML = `<ul class="LVal7b u4RcUd">
                <li class="j1ei8c" id="add-button">
                    <span class="tX9u1b" style="cursor: pointer;">
                        <div class="CgwTDb"><svg style="background: none;" class="MrEfLc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div>
                    </span>
                </li>
            </ul>`;
            document.getElementById("add-section-button").insertAdjacentElement("beforebegin", div);
            div.querySelector("#add-button").addEventListener("click", function () {
                document.getElementById("add-name").value = "";
                document.getElementById("add-url").value = "";
                document.getElementById("add-link").style.display = "";
                activeElement = this.parentElement;
            });
        });
        editButton.querySelector("#edit").style.display = "none";
        editButton.querySelector("#close").style.display = "";
        editDiv.querySelectorAll("h2").forEach((element) => {
            element.contentEditable = true;
        });
        document.querySelectorAll(".LVal7b").forEach((element) => {
            element.innerHTML += `<li class="j1ei8c" id="add-button">
                    <span class="tX9u1b" style="cursor: pointer;">
                        <div class="CgwTDb"><svg style="background: none;" class="MrEfLc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div>
                    </span>
                </li>`;
            element.querySelector("#add-button").addEventListener("click",function () {
                document.getElementById("add-name").value = "";
                document.getElementById("add-url").value = "";
                document.getElementById("add-link").style.display = "";
                activeElement = this.parentElement;
            });
        });
        editDiv.querySelectorAll("a").forEach((element) => {
            element.innerHTML += `<button id="delete-button">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-trash-alt fa-w-14 fa-2x"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" class=""></path></svg>
            </button>`;
            element.querySelector("#delete-button").addEventListener("click", () => {
                element.parentElement.remove();
                save();
            });
            element.addEventListener("click", preventDefault);
            element.querySelector("div").addEventListener("click", edit);
        });
        editDiv.querySelectorAll(".Rq5Gcb").forEach((element) => {
            element.contentEditable = true;
            element.style.cursor = "text";
        });
    }
});
function edit() {
    document.getElementById("edit-input").value = this.parentElement.href;
    document.getElementById("edit-url").style.display = "";
    activeElement = this.parentElement;
}
function preventDefault(e) {
    e.preventDefault();
}
document.getElementById("add-cancel").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("add-link").style.display = "none";
});
document.getElementById("add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("add-link").style.display = "none";
    getIcon(document.getElementById("add-url").value).then(icon => {
        var li = document.createElement("li");
        li.className = "j1ei8c";
        li.innerHTML = `<a class="tX9u1b" href="${document.getElementById("add-url").value}">
            <div class="CgwTDb"><span class="MrEfLc" style="background-image: url('${icon}');background-size: 64px 64px;"></span></div>
            <span class="Rq5Gcb" contenteditable="true" style="cursor: text;">${document.getElementById("add-name").value}</span>
            <button id="delete-button">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-trash-alt fa-w-14 fa-2x"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" class=""></path></svg>
            </button>
        </a>`;
        li.querySelector("#delete-button").addEventListener("click", () => {
            li.remove();
            save();
        });
        li.querySelector("a").addEventListener("click", preventDefault);
        li.querySelector("div").addEventListener("click", edit);
        activeElement.querySelector("#add-button").insertAdjacentElement("beforebegin", li);
        save();
    });
});
document.getElementById("edit-cancel").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("edit-url").style.display = "none";
});
document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    activeElement.href = document.getElementById("edit-input").value;
    document.getElementById("edit-url").style.display = "none";
    save();
});
function save() {
    // TODO: remove modify icons
    chrome.storage.sync.set({ links: editDiv.innerHTML });
}
async function getIcon(url) {
    try {
        var responce = await fetch(url);
        var text = await responce.text();
        const parser = new DOMParser();
        var dom = parser.parseFromString(text, "text/html");
        var icons = dom.querySelectorAll("link[rel*='icon']");
        var icon = icons[icons.length - 1];
        if (icon) {
            return new URL(icon.getAttribute("href"), url).href;
        } else {
            return "./img/icon_128.png";
        }
    } catch (e) {
        return "./img/icon_128.png";
    }
}
