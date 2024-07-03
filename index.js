const apiUrl = "https://reqres.in/api/users?page=1&&per_page=15";

fetch(apiUrl)
.then(
    (response) => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    }
).then(
    (userData) => {
        console.log(userData.data);
        const siteMainContent = document.getElementById("site-main-content");
        
        userData.data.map(({first_name, last_name, avatar}) => {
            siteMainContent.appendChild(appendUser(first_name, last_name, avatar));
        })
    }
)

function appendUser(fName, lName, avatar){
    const user = document.createElement("div");
    user.setAttribute("class", "user");

    const userAvatarDiv = document.createElement("div");
    userAvatarDiv.setAttribute("class", "userAvatar")
    const userImage = document.createElement("img");
    userImage.setAttribute("src", avatar);
    userAvatarDiv.appendChild(userImage);

    const userFirstName = document.createElement("div");
    userImage.setAttribute("class", "firstName");
    userFirstName.textContent = fName;

    const userLastName = document.createElement("div");
    userImage.setAttribute("class", "lastName");
    userLastName.textContent = lName;

    user.appendChild(userAvatarDiv);
    user.appendChild(userFirstName);
    user.appendChild(userLastName);

    return user;
}

