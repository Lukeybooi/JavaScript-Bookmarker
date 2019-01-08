const BOOKNAME = 'bookmark';
let box = document.getElementById('alertBox');

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    let siteName = document.getElementById('siteName').value;
    let siteURL = document.getElementById('siteURL').value;

    var bookmark = {
        name: siteName,
        url: siteURL
    }

    if (validate(siteName) && validate(siteURL)) {
        if (validURL(siteURL)) {
            if (validExist(siteName, siteURL)) {
                if (getLocalStorage() == null) {
                    let bookray = [];
                    bookray.push(bookmark);
                    setLocalStorage(bookray);
                } else {
                    let bookray = getLocalStorage();
                    bookray.push(bookmark);
                    setLocalStorage(bookray);
                }
                removeAlert();
                display();
            } else {
                box.classList.add('d-block');
                box.innerHTML = "Record Exist Already";
            }
        } else {
            box.classList.add('d-block');
            box.innerHTML = "Invalid URL";
        }
    } else {
        box.classList.add('d-block');
        box.innerHTML = "Field is empty";
    }

    e.preventDefault();
}

function display() {
    let bookray = getLocalStorage();
    let result = document.getElementById('bookmarkResults');
    result.innerHTML = '';

    for (var i = 0; i < bookray.length; i++) {
        result.innerHTML +=
            `<div class="jumbotron container">
            <h3 class="lead">${bookray[i].name}</h3>
            <a href="${bookray[i].url}" target="_blank" class="btn btn-light">Visit</a>
            <button class="btn btn-danger" onclick="deleteSite('${bookray[i].url}')">Delete</button>
        </div>`;
    }
}

function deleteSite(url) {
    let bookray = getLocalStorage();

    for (var i = 0; i < bookray.length; i++) {
        if (url == bookray[i].url) {
            bookray.splice(i, 1);
            break;
        }
    }
    setLocalStorage(bookray);
    removeAlert();
    display();
}

function setLocalStorage(bookray) {
    localStorage.setItem(BOOKNAME, JSON.stringify(bookray));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem(BOOKNAME));
}

function validate(value) {
    if (value != null && value != "") {
        return true;
    }
    return false;
}

function validURL(url) {
    var regEx = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i);
    return regEx.test(url);
}

function validExist(name, url) {
    let bookray = getLocalStorage();

    if (bookray != null) {
        for (var i = 0; i < bookray.length; i++) {
            if (name == bookray[i].name || url == bookray[i].url) {
                return false;
            }
        }
    }
    return true;
}

function removeAlert() {
    box.classList.remove('d-block');
}