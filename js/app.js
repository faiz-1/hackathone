const signup = ()=>{
    const email = document.getElementById('restaurantemail').value
    const password = document.getElementById('restaurantpassword').value
    const restaurant = document.getElementById('restaurantname').value
    const country = document.getElementById('restaurantcountry').value
    const city =  document.getElementById('restaurantcity').value
    console.log("restaurantemail",email)
    console.log("restaurantpassword",password)
if(email == "" || password == ""){
    alert("Plese Enter Data ")
}
else{

   firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log("User Registered :",user);

    var obj = {
      username : restaurant,
      email : email,
      country : country,
      city : city,
      password : password,
      uid : user.uid,
    }

    firebase.database().ref('restaurant').child(user.uid).set(obj)
    .then((data)=>{
        // Route User to a new page 
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
