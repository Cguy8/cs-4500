const logout = document.querySelector("#signout");

//function will use firebase auth to log the user out
function Log_Out()
{
    auth.signOut();
}

//attaches logout function to logout button on page
logout.addEventListener("click", (e) =>
{
    Log_Out();
    location.reload();
});