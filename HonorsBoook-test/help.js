const helpButton = document.querySelector("#help");

function Help()
{
    alert("You won't be getting help.");
}

helpButton.addEventListener("click", (e) =>
{
    e.preventDefault();
    Help();
});