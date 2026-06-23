
alert("SCRIPT STARTED");
alert("Script Loaded");
// Dark Mode

const darkBtn =
document.getElementById("darkModeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }else{

        localStorage.setItem("theme","light");

    }

});

// Comments

function addComment() {

    let input =
        document.getElementById("commentInput");

    let comment =
        document.createElement("div");

    comment.className = "comment";

    comment.innerText = input.value;

    document
        .getElementById("commentList")
        .appendChild(comment);

    input.value = "";
}
const loginBtn =
document.getElementById("loginBtn");

const registerBtn =
document.getElementById("registerBtn");

const loginModal =
document.getElementById("loginModal");

const registerModal =
document.getElementById("registerModal");

loginBtn.onclick = () => {
    loginModal.style.display = "block";
};

registerBtn.onclick = () => {
    registerModal.style.display = "block";
};

document
.querySelector(".closeLogin")
.onclick = () => {
    loginModal.style.display = "none";
};

document
.querySelector(".closeRegister")
.onclick = () => {
    registerModal.style.display = "none";
};

window.onclick = (e) => {

    if(e.target == loginModal){
        loginModal.style.display = "none";
    }

    if(e.target == registerModal){
        registerModal.style.display = "none";
    }

};
function searchApps() {

    let value =
        document.getElementById("searchInput")
        .value.toLowerCase();

    let apps =
        document.querySelectorAll(".app-card");

    apps.forEach(app => {

        let text =
            app.innerText.toLowerCase();

        if (text.includes(value)) {
            app.style.display = "block";
        } else {
            app.style.display = "none";
        }

    });
}
function toggleMenu(){

    document
    .getElementById("navbar")
    .classList.toggle("active");

}

let savedApps =
JSON.parse(localStorage.getItem("savedApps"))
|| [];

updateSavedCount();

function saveApp(appName){

    if(!savedApps.includes(appName)){

        savedApps.push(appName);

        localStorage.setItem(
            "savedApps",
            JSON.stringify(savedApps)
        );

        updateSavedCount();
addNotification(
    appName + " added to saved apps"
);
        alert(appName + " saved!");
    }
}

function updateSavedCount(){

    document.getElementById(
        "savedCount"
    ).innerText =
    savedApps.length + " Apps";
}

function filterApps(category){

    let apps =
    document.querySelectorAll(".app-card");

    apps.forEach(app=>{

        if(category==="all"){

            app.style.display="block";

        }

        else if(app.classList.contains(category)){

            app.style.display="block";

        }

        else{

            app.style.display="none";

        }

    });

}

let currentApp = "";
const appModal =
document.getElementById("appModal");

function showApp(title, description){

    currentApp = title;

    document.getElementById(
        "appTitle"
    ).innerText = title;

    document.getElementById(
        "appDescription"
    ).innerText = description;

    loadReviews();

    document.getElementById(
        "appModal"
    ).style.display = "block";
}

document
.getElementById("closeAppModal")
.onclick = function(){

    appModal.style.display =
    "none";
};
let notifications = 0;

function addNotification(message){

    notifications++;

    document.getElementById(
        "notificationCount"
    ).innerText = notifications;

    console.log(message);
}
function registerUser(){

    const name =
    document.getElementById("regName").value;

    const email =
    document.getElementById("regEmail").value;

    const password =
    document.getElementById("regPassword").value;

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration Successful!");

    registerModal.style.display = "none";
}
function loginUser(){

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );

    if(
        user &&
        user.email === email &&
        user.password === password
    ){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        document.getElementById(
            "userDisplay"
        ).innerText =
        "👤 " + user.name;


        alert("Login Successful!");

updateAuthUI();


        loginModal.style.display = "none";

    }else{

        alert("Invalid Email or Password");
    }
}
const savedUser =
JSON.parse(localStorage.getItem("user"));

if(
    localStorage.getItem("loggedIn")
    === "true"
    &&
    savedUser
){

    document.getElementById(
        "userDisplay"
    ).innerText =
    "👤 " + savedUser.name;
}
function logoutUser(){

    localStorage.removeItem(
        "loggedIn"
    );

    document.getElementById(
        "userDisplay"
    ).innerText = "";

    loginBtn.style.display =
    "inline-block";

    registerBtn.style.display =
    "inline-block";

    alert("Logged Out");
}
function updateAuthUI(){

    const user =
    JSON.parse(localStorage.getItem("user"));

    if(
        localStorage.getItem("loggedIn")
        === "true"
        &&
        user
    ){

        loginBtn.style.display =
        "none";

        registerBtn.style.display =
        "none";

    }
}

updateAuthUI();
loadCustomApps();

function loadCustomApps(){

    const apps =
    JSON.parse(
        localStorage.getItem(
            "customApps"
        )
    ) || [];

    const container =
    document.getElementById(
        "customAppsContainer"
    );

    if(!container) return;

    container.innerHTML = "";

    apps.forEach((app,index) => {

        const div =
        document.createElement("div");

        div.className =
        "card app-card " +
        app.category;

        div.onclick = function(){

    showApp(
        app.name,
        app.description
    );

};
div.innerHTML = `
    <img
    src="${app.image}"
    alt="${app.name}">

    <h3>${app.name}</h3>

    <p>${app.description}</p>

    <p>⭐ ${app.rating}/5</p>

    <p>${app.category}</p>
`;

        container.appendChild(div);

    });

}
loadFeaturedApps();

function loadFeaturedApps(){

    const apps =
    JSON.parse(
        localStorage.getItem(
            "customApps"
        )
    ) || [];

    const container =
    document.getElementById(
        "featuredAppsContainer"
    );

    if(!container) return;

    container.innerHTML = "";

    apps.forEach(app => {

        if(app.featured){

            const div =
            document.createElement("div");

            div.className =
            "card";

div.innerHTML = `
    <img
    src="${app.image}"
    alt="${app.name}">

    <h3>${app.name}</h3>

    <p>${app.description}</p>

    <p>⭐ ${app.rating}/5</p>

    <p>⭐ Featured</p>
`;

            container.appendChild(div);

        }

    });

}
function addReview(){

    const text =
    document.getElementById(
        "reviewInput"
    ).value;

    if(!text) return;

    const reviews =
    JSON.parse(
        localStorage.getItem(
            currentApp + "_reviews"
        )
    ) || [];

    reviews.push(text);

    localStorage.setItem(
        currentApp + "_reviews",
        JSON.stringify(reviews)
    );

    document.getElementById(
        "reviewInput"
    ).value = "";

    loadReviews();
}

function loadReviews(){

    const reviews =
    JSON.parse(
        localStorage.getItem(
            currentApp + "_reviews"
        )
    ) || [];

    const list =
    document.getElementById(
        "reviewsList"
    );

    list.innerHTML = "";

    reviews.forEach(review=>{

        const div =
        document.createElement("div");

div.className = "comment";

div.style.color = "black";
div.style.background = "#f5f5f5";
div.style.padding = "10px";
div.style.margin = "5px 0";
div.style.borderRadius = "8px";

        div.innerText =
        review;

        list.appendChild(div);

    });
}
function toggleReviews(){

    const reviews =
    document.getElementById(
        "reviewsList"
    );

    if(reviews.style.display === "none"){

        reviews.style.display = "block";

    }else{

        reviews.style.display = "none";

    }

}
function adminLogin(){

    const password =
    prompt("Enter Admin Password");

    if(password === "admin123"){

        localStorage.setItem(
            "isAdmin",
            "true"
        );

        window.location.href =
        "admin.html";

    }else{

        alert("Wrong Password");

    }

}
fetch("http://localhost:5000/api/apps")
.then(response => response.json())
.then(data => {

    console.log("Apps from backend:");

    console.log(data);

})
.catch(error => {

    console.error(error);

});
alert("Before Fetch");

fetch("http://localhost:5000/api/apps")
.then(response => response.json())
.then(data => {

    alert(
        "Connected! Found " +
        data.length +
        " apps"
    );

})
.catch(error => {

    alert(
        "Connection Failed"
    );

    console.log(error);

});