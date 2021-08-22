const signIn = () =>{

var useremail = document.getElementById('useremail1').value
var userpassword = document.getElementById('userpassword1').value

firebase.auth().signInWithEmailAndPassword(useremail, userpassword)
        .then((userCredential) => {
          var user = userCredential.user;

          // Adding current user in local Storage to utilize user info in UI
          localStorage.setItem('Current_user_ID' ,user.uid)
          localStorage.setItem('Current_user_name' ,user.uid)

          var currentUserId = localStorage.getItem('Current_user_ID')

            console.log(currentUserId)

            // Search ID within Resturant collection
            firebase.database().ref().child('restaurant').orderByChild('uid').equalTo(currentUserId).once('value')
            .then((snap) => {
                var data = snap.toJSON();

                if (data == null) {
                    // Search ID within Users collection
                    firebase.database().ref().child('user').orderByChild('uid').equalTo(currentUserId).once('value')
                    .then((snap) => {
                        var data = snap.toJSON();
                         // This is a User so we take it to Ordering page.
                         window.location='user.html'            
                    });
                }
                else{
                    // This is a Resturant owner so we take it to the dashboard
                    window.location='resturant.html' 
                }
            });
    })
}