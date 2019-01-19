// importing named exports we use brackets
import { createPostTile, createPostTileBase64, uploadImage } from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';

let li_btn_login = document.getElementById('li-btn-login');
let li_btn_signUp = document.getElementById('li-btn-signUp');
let li_username = document.getElementById('li-username');
let li_btn_logout = document.getElementById('li-btn-logout');

if (localStorage.getItem('token')) {
    ShowLogOutButton();
}
else {
    ShowLogInButton();
}

function ShowLogOutButton() {
    var token = localStorage.getItem('token');
    UserGetContent(token);
    showUserName(token);
    li_btn_login.style.display = "none";
    li_btn_signUp.style.display = "none";
    li_username.style.display = "";
    li_btn_logout.style.display = "";
}

function ShowLogInButton(){
    li_btn_login.style.display = "";
    li_btn_signUp.style.display = "";
    li_username.style.display = "none";
    li_btn_logout.style.display = "none";
}



const api  = new API();

// // we can use this single api request multiple times
// const feed = api.getFeed();

// feed
// .then(posts => {
//     console.log(posts);
//     posts.reduce((parent, post) => {
//         parent.appendChild(createPostTile(post));
//         return parent;
//     }, document.getElementById('large-feed'))
// });

// Potential example to upload an image
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', uploadImage);

document.getElementById('login').addEventListener('click', userlogin);
document.getElementById('log_out').addEventListener('click', userlogout);
document.getElementById('signupbutton').addEventListener('click', SignUp);


// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}






function userlogin(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let user = {
        "username": username,
        "password": password
    };

    var url = 'http://127.0.0.1:5000/auth/login';

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(user), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => {
        if (res.status == 403) {
            alert('Invalid Username/Password');
            return null;
        }
        else if (res.status == 400){
            alert('Missing Username/Password');
            return null;
        }
        else {
            modal.style.display = "none";
            return res.json();
        }
    })
    .then(resp => {
        var token = resp.token;
        localStorage.setItem('token', token);
        UserGetContent(token);
        ShowLogOutButton();
    })
}


function UserGetContent(token){
    var url = 'http://127.0.0.1:5000/user/feed';

    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
    .then((res) => res.json())
    .then((json) => {
        // json contains parsed JSON
        console.log(json);

        json.posts.reduce((parent, post) => {
            parent.appendChild(createPostTileBase64(post));
            return parent;
            console.log(post);
        }, document.getElementById('large-feed'))

    });



}

function showUserName(token){
    var url = 'http://127.0.0.1:5000/user/';
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        // json contains parsed JSON
        // console.log(json);
        var span_username = document.getElementById("span-username");
        span_username.innerText = data.username;
    });

}

function userlogout(){
    // Execute navigator.id.logout(); when the user clicks "Sign Out"
    localStorage.clear();
    document.getElementById('large-feed').innerHTML = "";
    ShowLogInButton();
}



function SignUp(){
    var url = 'http://127.0.0.1:5000/auth/signup';
    let username = document.getElementById('usernamesignup').value;
    let password = document.getElementById('passwordsignup').value;
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;

    let user = {
        "username": username,
        "password": password,
        "email":email,
        "name":name
    };


    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(user), // data can be `string` or {object}!
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => {
        if (res.status == 409) {
            alert('Username Taken');
            return null;
        }
        else if (res.status == 400){
            alert('Missing Username/Password');
            return null;
        }
        else {
            modal.style.display = "none";
            return res.json();
        }
    })
    .then(resp => {
        var token = resp.token;
        localStorage.setItem('token', token);
        UserGetContent(token);
        ShowLogOutButton();
        modal2.style.display = "none";

    })

}


