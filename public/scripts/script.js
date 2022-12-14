function setCurrentUser(user) {
  let logger=JSON.parse(user);
  if(logger.emailid){
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = "note.html";
  }
  else{
    setError(user);
  }
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function setError(er){
  let error=JSON.parse(er);
  let err = document.querySelector('error');
  err.innerHTML = `
        Error: (${error.message})
    `
}
class User
{

    constructor(firstname, lastname, email, password)
    {
        this.fname=firstname;
        this.lname=lastname;
        this.emailid=email;
        this.pwd=password;        
    }


    getFN(){
        return this.fname;
    
    }
    getLN(){
        return this.lname;
    }
    getemail(){
        return this.email;

    }
    getPassword()
    {
        return this.pwd;
    }

    setFN(firstname){
        this.fname=firstname;
    }
    setLN(lastname){
        this.lname=lastname;
    }
    setemail(email){
        this.email=email;

    }
    setPassword(Password){
        this.pwd=Password;
    }

}
class Note
{

    constructor(notes)
    {
        this.notes=notes;        
    }
    getNotes()
    {
        return this.notes;
    }
    setNotes(notes){
        this.notes=notes;
    }
}
let create= document.getElementById("login-form");
if(create) create.addEventListener('submit',login)

function login(e){
    let em1=document.getElementById("uname").value;
    let pwd=document.getElementById("password").value;

    let luser=new User();
    luser.setemail(`${em1}`);
    luser.setPassword(`${pwd}`);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if(em1.trim()==""||pwd.trim()==""){
      setError("{\"message\":\"Please enter all the Fields\"}");
      return;
    }
    var raw = JSON.stringify({
        "emailid": em1,
        "pwd": pwd
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/users/login", requestOptions)
        .then(response => response.text())
        .then(result => setCurrentUser(result))
        .catch(error => setError(error));
    console.log(luser.getemail());
    console.log(luser.getPassword());
}

let Reg=document.getElementById("regsiter-form");
if(Reg) Reg.addEventListener('submit',userRegister)

function userRegister(r){
    let FU1= document.getElementById("fname").value;
    let Lr=document.getElementById("lname").value;
    let eml1=document.getElementById("uname").value;
    let pwd=document.getElementById("password").value;
    
    let regi= new User();
    regi.setFN(`${FU1}`);
    regi.setLN(`${Lr}`);
    regi.setemail(`${eml1}`);
    regi.setPassword(`${pwd}`);
    var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if(FU1.trim()==""||Lr.trim()==""||eml1.trim()==""||pwd.trim()==""){
    setError("{\"message\":\"Please enter all the Fields\"}");
    return;
  }
  var raw = JSON.stringify({
    "firstname": FU1,
    "lastname": Lr,
    "emailid": eml1,
    "pwd":pwd
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/users/register", requestOptions)
    .then(response => response.text())
    .then(result => setCurrentUser(result))
    .catch(error => setError(error));

    console.log(regi.getFN());
    console.log(regi.getLN());
    console.log(regi.getemail());
    console.log(regi.getPassword());
    
}

let UserN= document.getElementById("note-form");
if(UserN) UserN.addEventListener('submit',takeNote)

function takeNote(b){
  let user=JSON.parse(getCurrentUser());
  let Notepage= document.getElementById("note").value;
  if (Notepage.trim()=="") return;
  let note= new Note(Notepage);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "emailid": user.emailid,
    "notes": Notepage.trim()
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/notes/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  window.location.href = "note.html";
}