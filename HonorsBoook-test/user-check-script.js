//listen for auth status changes, returns user if user is considered "logged in"
auth.onAuthStateChanged(user =>
{
    if(user)
    {
        //user is logged in

    }else{
        //user is logged out
        console.log("There is no user logged in");
        window.location.href = window.location.origin + "/index.html";
    }
});