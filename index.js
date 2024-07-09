const API_URL = 'https://dummyapi.io/data/v1/user/';
const API_ID = '667a4d799e133752142431fd';

const siteMainContent = document.getElementById('site-main-content');
const form = `
        <form onsubmit="event.preventDefault();">
           <label for="fName">First Name</label>
           <input id="fName" name="fName" type="text" placeholder = "Enter First Name" required>
           <label for="lName">Last Name</label>
           <input id="lName" name="lName" type="text" placeholder = "Enter Last Name" required>
            <label for="avatar">Avatar</label>
            <input id="avatar" type="url" name="avatar" placeholder = "Enter your Image" required>
            <div class="user-action"> 
              <input type="submit" value="Submit" id="submit">
              <button id="cancel">Cancel</button>
            </div>
        </form> `;

//getUserList
// function getUser(){
//   axios.get(`${API_URL}?limit=15`, {
//     headers: {
//       'app-id': API_ID,
//     },
//   }).then((res) => {
//       const data = res.data.data;
//       siteMainContent.innerHTML = "";
//       data.map(({ firstName, lastName, picture, id }) => {
//         const user = appendUser(firstName, lastName, picture, id);
//         siteMainContent.insertAdjacentHTML('beforeend', user);
//       })
     
//   })
// }

//updateuser
function updateUser(fName, lName, avtar, userId) {
  const url = API_URL + userId;
  axios
      .put(
      `${url}`,
      {
          firstName: fName,
          lastName: lName,
          picture: avtar,
      },
      {
          headers: {
          'app-id': API_ID,
          },
      }
      )
      .then(() => {
       getUser();
      })
      .catch((err) => console.log(err));
}

//handle-click
function handleUserClick(data) {
  const rootForm = document.getElementById('root-form');
  document.getElementById('root-user-content').style.minWidth = '60%';
  rootForm.innerHTML = form;
  rootForm.insertAdjacentHTML('afterbegin', "<h2>Update User</h2>");

  document.getElementById('cancel').addEventListener('click', 
    () => {
      document.getElementById('root-form').innerHTML = '';
      document.getElementById('root-user-content').style.minWidth = '100%';
    }
  )

  document.getElementById('fName').value = data.firstName;
  document.getElementById('lName').value = data.lastName;
  document.getElementById('avatar').value = data.picture;
  
  document
  .querySelector('input[type="submit"]')
  .addEventListener('click', () => {
      const fName = document.getElementById('fName').value;
      const lName = document.getElementById('lName').value;
      const avtar = document.getElementById('avatar').value;
      console.log(fName, lName, avtar);
      validate(fName, lName, avtar);
      updateUser(fName, lName, avtar, data.id);

  })
}

//user-append
function appendUser(fName, lName, avatar, id) {
  const user = `<div class="user">
            <div class="userAvatar"><img src=${avatar}></div>
            <div class="firstName">${fName}</div>
            <div class="lastName">${lName}</div>
            <button class='delete'><i class="fa fa-trash-o"  user-id = ${id}></i></button>
                 </div>`;
  return user;
}

//validate
function validate(fName, lName, avtar) {
  if (!fName.match(/^[A-Za-z]+$/) || !lName.match(/^[A-Za-z]+$/)) {
    alert('Please input alphabet characters only');
  }
   if (
     avtar.substr(avtar.length - 4) === '.jpg' ||
     avtar.substr(avtar.length - 4) === '.png'
   ) {
   } else {
     alert('Please enter valid url');
  }
  return true;
}

//add-user
function addUser() {
  const rootForm = document.getElementById('root-form');
  
  document.getElementById('root-user-content').style.minWidth = '60%';
  rootForm.innerHTML = form;
  rootForm.insertAdjacentHTML('afterbegin', "<h2>Add User</h2>");
 
  document.getElementById('cancel').addEventListener('click', 
    () => {
      document.getElementById('root-form').innerHTML = '';
      document.getElementById('root-user-content').style.minWidth = '100%';
    }
  )

  document
  .querySelector('input[type="submit"]')
      .addEventListener('click', () => { 
          const fName = document.getElementById('fName').value;
          const lName = document.getElementById('lName').value;
          const avtar = document.getElementById('avatar').value;
          validate(fName, lName, avtar);
              axios
                .post(
                  `${API_URL}create`,
                  {
                    "firstName": fName,
                    "lastName": lName,
                    "email": 'some.one12345@example.com',
                    "picture": avtar
                  },
                  {
                    headers: {
                      'app-id': API_ID,
                    },
                  }
                )
                .then(() => {
                  getUser();
                 })

                .catch((err) => console.log(err));
      })
  

}

//deleteuser
function deleteUser(hear) {
  hear.stopImmediatePropagation();
  const ele = hear.target;
  const user = ele.getAttribute("user-id");
  axios.delete(`${API_URL}${user}`, {
    headers: {
      'app-id': API_ID,
    },
  })
  .then(() => {getUser()});
}

function getUser(){
axios
  .get(`${API_URL}?limit=15`, {
    headers: {
      'app-id': API_ID,
    },
  })
  .then((response) => {
      const data = response.data.data;
      console.log(data)
     
      siteMainContent.innerHTML = "";
      //this is not needed handle with catch block
      if (response.status != 200) {
        throw new Error('Network response was not ok');
      }

      data.map(({ firstName, lastName, picture, id }) => {
        const user = appendUser(firstName, lastName, picture, id);
        siteMainContent.insertAdjacentHTML('beforeend', user);
      });

      const userSelection = document.getElementsByClassName('user');

      for (let i = 0; i < userSelection.length; i++) {
        userSelection[i].addEventListener('click', () => {
          handleUserClick(data[i]);
        });
      }
      
    document.getElementById("add-user").addEventListener('click', addUser);
    const del = document.querySelectorAll('.delete');
    del.forEach((ele => {
      console.log(ele)
      ele.addEventListener('click', (e) => {
          deleteUser(e);
          console.log("click")
        })
    }))
    
  });
}

getUser();

















