let nav = document.querySelector('nav');
let note = document.querySelector('notes');
if(getCurrentUser()) {
    let user=JSON.parse(getCurrentUser());
    nav.innerHTML = `
      <ul>
        <li><a id="logout-btn">Logout(${user.firstname} ${user.lastname})</a></li>
      </ul>
    `
    getNotes();
} else {
window.location.href = "login.html";
}
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)


// getting current user function
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
function removeCurrentUser() {
    localStorage.removeItem('user');
    window.location.href = "login.html";
}

function getNotes() {
    var myHeaders = new Headers();
    let user=JSON.parse(getCurrentUser());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "emailid": user.emailid
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    var notes;
    fetch("http://localhost:3000/notes/byUser", requestOptions)
    .then(response => response.text())
    .then(result => {
        notes=JSON.parse(result);
        var i=1;
        var del;
        for (const key in notes) {
            if (Object.hasOwnProperty.call(notes, key)) {
                let strin=JSON.stringify(notes[key]);
                sessionStorage.setItem(notes[key]["noteID"],strin);
                note.innerHTML=note.innerHTML+`
                <br>
                  Note ${i}: ${notes[key]["notes"]}&emsp;&emsp;
                  <button width=15  align=center height=15 onclick=editnote(${notes[key]["noteID"]})>Edit</button>&emsp;
                  <button width=15 id=delete${notes[key]["noteID"]} align=center height=15 onclick=removenote(${notes[key]["noteID"]})>Delete</button>
                <br>
              `
                i=i+1;
                del = document.getElementById("close"+notes[key]['noteID']);
                if(del){
                    del.addEventListener('click', removenote);
                    del.id=notes[key]["noteID"];
                }                 
            }
        }
        //return notes;
    })
    .catch(error => console.log('error', error));
}
function removenote(noteID){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "noteID": noteID
    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/notes/delete", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    window.location.href = "note.html";
}
function editnote(noteID){
    let note=JSON.parse(sessionStorage.getItem(noteID));
    let elem=note;//JSON.parse(note);
    let notes=elem.notes;
    let label = document.getElementById('addlabel');
    label.innerHTML="Edit Note";
    let editor = document.getElementById('note');
    editor.setAttribute("value",notes);
    let submit = document.getElementById('submit');
    submit.setAttribute("value","Update");
    submit.setAttribute("onclick",`updatenote(${note})`);
    submit.onclick=function() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "noteID": note.noteID,
        "notes": editor.value
        });
    
        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("http://localhost:3000/notes/edit", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        window.location.href = "note.html";}
        let UserN= document.getElementById("note-form");
        if(UserN) {
            UserN.addEventListener('submit',submit.onclick);
            UserN.removeEventListener('submit',takeNote);
        }
}