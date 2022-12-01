function readUsers(con_auth) {
    //let url = "https://dorx-test-1.onrender.com/users";
    let url = "http://localhost:3000/users"
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    if(con_auth){
        xhr.setRequestHeader('x-auth', "PASS123");
    }
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log("Usuarios:");
            console.table(JSON.parse(xhr.response));
            alert("Usuarios leídos!");
        }
    };
}

