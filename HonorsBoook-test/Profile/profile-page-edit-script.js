// profile-page-edit-script.js
// https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja         

//profile informaiton
const profileName = document.querySelector("#name");
const majorInput = document.querySelector("#majorInput");
const yearInput = document.querySelector("#yearInput");
const pronounInput = document.querySelector("#pronoundsInput");
const tagList = document.querySelector("#tags");
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

		profileName.textContent = doc.data().username;
		if(doc.data().major)
			majorInput.value = doc.data().major;
		if(doc.data().year)
			yearInput.value = doc.data().year;
		if(doc.data().pronouns)
			pronounInput.value = doc.data().pronouns

		tagList.textContent = "Tags: "
		if(doc.data().userTags)
		{
			let listOfTags = new Array;
			listOfTags = doc.data().userTags;
			for(let i = 0; i < listOfTags.length; i++)
			{
				let temp = document.createElement("a");
				temp.className = "tag";
				temp.setAttribute("tagID", listOfTags[i]);
				temp.textContent = "- " + listOfTags[i];
				tagList.appendChild(temp);
			}
		}
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
			major: majorInput.value,
			year: yearInput.value,
			pronouns: pronounInput.value,
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