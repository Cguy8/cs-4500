// home-script.js
// https://www.youtube.com/watch?v=4d-gIPGzmK4&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&ab_channel=TheNetNinja         

const radar = document.getElementById("on-your-radar");
const loader = document.getElementById("profile-container");
var userDoc;
var uid;

firebase.auth().onAuthStateChanged((user) => {
	uid = user.uid;

	db.collection('users').where('UID', '==', uid).get().then((snapshot) => {
		snapshot.docs.forEach(doc => {
		console.log(doc.data());
		userDoc = doc.id;
		})
	});

	db.collection('users').where('UID', '!=', uid).get().then((snapshot) => {
		snapshot.docs.forEach(doc => {
		console.log(doc.data());
		var div = document.createElement("div");
		var imgNode = document.createElement("img");
		imgNode.src = "images/profile-thumb.jpg";
		//When we get to the point of custom profile images, replace the line above.
		//Most likely something like "imgNode.src = doc.data().profileImage;"
		var para = document.createElement("p");
		var node = document.createTextNode("Name: " + doc.data().username);
		div.appendChild(imgNode);
		para.appendChild(node);

		radar.appendChild(div);
		radar.appendChild(para);

		para = document.createElement("p");
		node = document.createTextNode("Tags:");
		para.appendChild(node);
		for (var i = 0; doc.data().userTags[i] != null; i++)
		{
			var tagNode = document.createTextNode(" " + doc.data().userTags[i] + ",");
			para.appendChild(tagNode);
		}

		radar.appendChild(para);
		})
	loader.remove();
	});
});