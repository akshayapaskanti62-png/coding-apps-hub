const isAdmin =
localStorage.getItem("isAdmin");

if(isAdmin !== "true"){

    alert(
        "Access Denied! Admins Only."
    );

    window.location.href =
    "index.html";
}
let apps =
JSON.parse(
localStorage.getItem("customApps")
) || [];

displayApps();

function addApp(){

    const name =
    document.getElementById("appName").value;

    const description =
    document.getElementById("appDescription").value;

const image =
document.getElementById(
    "appImage"
).value;

const rating =
document.getElementById(
    "appRating"
).value;

    const category =
    document.getElementById("appCategory").value;

    const featured =
document.getElementById(
    "appFeatured"
).checked;

const app = {
    name,
    description,
    image,
    rating,
    category,
    featured
};

    apps.push(app);

    localStorage.setItem(
        "customApps",
        JSON.stringify(apps)
    );

    displayApps();
updateStats();

    alert("App Added!");
}

function displayApps(){

    const list =
    document.getElementById(
        "appsList"
    );

    list.innerHTML = "";

apps.forEach((app,index) => {

        const div =
        document.createElement("div");

        div.className = "card";

div.innerHTML = `
    <img
    src="${app.image}"
    alt="${app.name}">

    <h3>${app.name}</h3>

    <p>${app.description}</p>

<p>⭐ ${app.rating}/5</p>

    <p>${app.category}</p>

    ${app.featured
      ? "<p>⭐ Featured App</p>"
      : ""}

    <button onclick="editApp(${index})">
        Edit
    </button>

    <button onclick="deleteApp(${index})">
        Delete
    </button>
`;

        list.appendChild(div);

    });

}
function deleteApp(index){

    if(
        confirm(
            "Delete this app?"
        )
    ){

        apps.splice(index,1);

        localStorage.setItem(
            "customApps",
            JSON.stringify(apps)
        );

displayApps();
updateStats();
    }

}
function editApp(index){

    const app = apps[index];

    const newName =
    prompt(
        "Edit App Name",
        app.name
    );

    const newDescription =
    prompt(
        "Edit Description",
        app.description
    );

    if(newName && newDescription){

        app.name = newName;

        app.description = newDescription;

        localStorage.setItem(
            "customApps",
            JSON.stringify(apps)
        );

        displayApps();
updateStats();
    }
}
updateStats();

function updateStats(){

    document.getElementById(
        "totalApps"
    ).innerText =
    apps.length;

    const user =
    localStorage.getItem("user");

    document.getElementById(
        "totalUsers"
    ).innerText =
    user ? 1 : 0;
}
function adminLogout(){

    localStorage.removeItem(
        "isAdmin"
    );

    alert(
        "Admin Logged Out"
    );

    window.location.href =
    "index.html";
}