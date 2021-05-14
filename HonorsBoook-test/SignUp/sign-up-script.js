// sign-up-script.js
// https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja
// https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&ab_channel=TheNetNinja            

//sign-up informaiton
const signUpUsername = document.querySelector("#signupUsername");
const signUpEmailInput = document.querySelector("#signupEmail");
const signUpPasswordInput = document.querySelector("#signupPassword");
const signUpPasswordInput2 = document.querySelector("#signupReEnterPassword");
const signUpButton = document.querySelector("#enter");

//function to sign up the user
function Sign_Up()
{
    //can use squarebracket notation for a form object
    const userName = signUpUsername.value;
    const email = signUpEmailInput.value;
    const password = signUpPasswordInput.value;
    const passwordConfirm = signUpPasswordInput2.value;
    if(password == passwordConfirm)
    {
        //if both feilds have informatoin inside of them, and the password is of proper length:
        if((email != "")&&(password != "")&&(password.length >= 6))
        {
            //uses basic firebase auth sign-up method.
            auth.createUserWithEmailAndPassword(email, password).then(cred =>
            {
                userID = cred.user.uid;
                //creates user document in the database
                Create_User(userID, userName, email);
            });
        }
        else if(password.length < 6) //if password is not of proper length
        {
            alert("Password must more than 6 characters!");
        }else{
            //if either form is not filled in
            alert("Please fill in all login information!");
        }
    }else{
        alert("Passwords do not match.");
    }   
}

//creates a new user in the user database and populates it with important information
function Create_User(uID, useNam, email)
{
    let today = new Date();
    let date = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
    let tags = ["human"];
    db.collection("users").add(
    {
        UID: uID,
        username: useNam,
        email: email,
        dateJoined: date,
        admin: false,
        userTags: tags,
        firstTime: true,
        major: "Not Yet Set",
        year: "Not Yet Set",
        pronouns: "Prefer not to say"
        
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        //clear input feilds from Sign_Up;
        signUpEmailInput.value = "";
        signUpPasswordInput.value = "";
        signUpPasswordInput2.value = "";
        window.location.href = "../home.html";
        alert("Signed up Succesffuly");
        
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

//attaches our sign-up button to our sign up function
//Using default event (E) allows us to use the preventDefault method, which doens't make the page refresh every time somthing happens
signUpButton.addEventListener("click", (e) =>
{
    e.preventDefault();
    Sign_Up();
});