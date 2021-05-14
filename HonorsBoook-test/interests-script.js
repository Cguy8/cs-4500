// interests-script.js
// https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja

const buttonContainer = document.getElementById("buttons");
var searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const loadingTag = document.getElementById("load-tag");
var userDoc;
var tags;
var uid;

//Loads database information once the connection to the database is established.
firebase.auth().onAuthStateChanged((user) => {
	uid = user.uid;

	//stores information about the user
	db.collection('users').where('UID', '==', uid).get().then((snapshot) => {
		snapshot.docs.forEach(doc => {
		console.log(doc.data());
		userDoc = doc;
		})
	});

	//stores the complete list of tags on the database
	db.collection('Tags').get().then((snapshot) => {
		snapshot.docs.forEach(tagList => {
		tags = tagList;
		console.log(tags.data());
		})

	//replaces the temporary tag button with actual tags from the database
	loadingTag.remove();
	//To Be Added: only show tags that aren't already on the account
	for (var i = 0; tags.data().tag[i] != null && i <= 15; i++)
	{
		createTagButton(tags.data().tag[i]);
	}
	});
});

//removes all html elements that are children of a specified element
function removeAllChildNodes(parent){
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

//adds a tag to a user's account and updates the database
function updateUserTags(tagText) {
		    var currentTags = userDoc.data().userTags;
		    currentTags.push(tagText);
		    db.collection('users').doc(userDoc.id).set({
			userTags: currentTags
		    }, { merge: true });
		    alert("Added \"" + tagText + "\" to your account.");
}

//creates an html element that can be clicked to add its text contents as a tag to the user's account
function createTagButton(tagText) {
		var b = document.createElement("b");
		var a = document.createElement("a");
		a.textContent = "+ #" + tagText;
		b.appendChild(a);
		b.addEventListener("click", (e) =>
		{
		    e.preventDefault();
		    updateUserTags(e.target.textContent.substring(3));
		});
		buttonContainer.appendChild(b);
}

//defines behavior for clicking the "search" button
//removes all tag buttons from the page, then replaces them with only the tags that match the search
//shows all tags if no text is entered. Prompts the creation of a new tag if no match is found.
searchButton.addEventListener("click", (e) =>
{
    e.preventDefault();
    removeAllChildNodes(buttonContainer);
	
    //compares each tag to the search, creates a button if the tag contains the text in the search bar	
    var foundCounter = 0;
    for (var i = 0; tags.data().tag[i] != null && foundCounter <= 15; i++)
    {
	if (tags.data().tag[i].toLowerCase().includes(searchBar.value.toLowerCase())){
		createTagButton(tags.data().tag[i]);
		foundCounter++;
	}
    }
    //if no match was found, ask the user if the tag should be created. If so, add it to the database, then ask the user if they want to add the tag to their account. Then reload the page, so that it reflects the changes.
    if (foundCounter == 0){
	if (confirm("No tags were found matching your search. Would you like to add \"" + searchBar.value + "\" to the database? \n\(In the future, this will have to be approved by an admin.\)")) {
		var tagUpdate = tags.data().tag;
		tagUpdate.push(searchBar.value);
		console.log(tagUpdate);
		db.collection('Tags').doc('list').set({
			tag: tagUpdate
		}, { merge: true });
		if (confirm("\"" + searchBar.value + "\" has been added to the database. Would you like to add this tag to your account?")) {
			updateUserTags(searchBar.value);
		}
		setTimeout("location.reload();", 5000);
		alert("The page will reload in 5 seconds. If it does not, please refresh the page.");
	}
    }
});
