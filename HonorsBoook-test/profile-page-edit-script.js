// profile-page-edit-script.js
// https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja         

//profile informaiton
const bio = document.querySelector("#bio");
//Insert any other text fields that can be edited here
var userDoc;
var uid;

firebase.auth().onAuthStateChanged((user) => {
	uid = user.uid;

	db.collection('users').where('UID', '==', uid).get().then((snapshot) => {
		snapshot.docs.forEach(doc => {
		console.log(doc.data());
		userDoc = doc.id;
		bio.value = doc.data().bio;
		//alert("Doc id is " + userDoc);
		})
	});
});

function Update_Bio()
{
	const newBio = bio.value;
	//Insert any other profile options that can be edited here

        if (newBio != "")
	{

		db.collection('users').doc(userDoc).set({
			bio: newBio
			//Insert any other values to save here
		}, { merge: true });

        alert("Profile has been updated.");
	//window.location.href = "profilePageIndex.html";	//Enabling this seems to prevent the db from updating.
	}
}

//attaches our submit button to our update profile function
//Using default event (E) allows us to use the preventDefault method, which doens't make the page refresh every time somthing happens
submitButton.addEventListener("click", (e) =>
{
    e.preventDefault();
    Update_Bio();
});