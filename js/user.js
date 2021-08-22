const usersignup = ()=>{
    const email = document.getElementById('useremail').value
    const password = document.getElementById('userpassword').value
    const username = document.getElementById('username').value
    const userphone = document.getElementById('userphone').value
    const usercountry = document.getElementById('usercountry').value
    const usercity = document.getElementById('usercity').value
    console.log("email",email)
    console.log("password",password)
if(email == "" || password == ""){
    alert("Plese Enter Data ")
}
else{

   firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log("User Registered :",user)
   
    var obj = {
        username : username,
        userphone : userphone,
        useremail : email,
        usercountry : usercountry,
        usercity : usercity,
        password : password,
        uid : user.uid,

    }

 firebase.database().ref('user').child(user.uid).set(obj)
    .then((data)=>{
        // Route User to a new page 
        //window.location='login.html'
        console.log("User's additional details Added!");
        window.location = 'loginform.html'
    })
})
.catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // Display Error if there is a problem with SignUp
    console.log("Error Code: ", errorCode)
    console.log("Error Message: ", errorMessage)
}).catch((err)=>{
  console.log(err)

})}}
