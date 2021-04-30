//login information
const LoginEmail = document.querySelector("#loginUsername");
const LoginPassword = document.querySelector("#loginPassword");
const Login = document.querySelector("#loginButton");

//function to log in user
function Log_In()
{
    //can use squarebracket notation for a form object
    const email = LoginEmail.value;
    const password = LoginPassword.value;

    //if both forms have data inside of them
    if((email != "")&&(password != ""))
    {
        //basic sign-in method
        auth.signInWithEmailAndPassword(email, password).then(cred =>
        {
            //clears information forms
            LoginEmail.value = "";
            LoginPassword.value = "";
            alert("Logged In Successfully");
            window.location.href="home.html"
        }).catch((error) => {
            console.error("Error adding document: ", error);
            alert("Username or Password are incorrect!");
        });
    }else{
        //if one of the forms are empty
        alert("Please fill in all login information!");
    }
}

Login.addEventListener("click", (e) =>
{
    e.preventDefault();
    Log_In();
});
