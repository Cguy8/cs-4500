//profile informaiton
const profileName = document.querySelector("#name");
const major = document.querySelector("#major");
const year = document.querySelector("#year");
const pronouns = document.querySelector("#pronouns")
const bio = document.querySelector(".biography");
const tagList = document.querySelector("#tags");

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
			major.textContent = doc.data().major;
		if(doc.data().year)
			year.textContent = doc.data().year;
		if(doc.data().pronouns)
			pronouns.textContent = doc.data().pronouns
		if(doc.data().userTags)
		{
			let listOfTags = new Array;
			listOfTags = doc.data().userTags;
			for(let i = 0; i < listOfTags.length; i++)
			{
				if(i === 0)
				{
					tagList.textContent = "Interests: #" + listOfTags[i]
				}else{
					tagList.textContent = tagList.textContent + ", #" + listOfTags[i];
				}
			}
		}
		bio.textContent = doc.data().bio;
		//alert("Doc id is " + userDoc);
		})
	});
});