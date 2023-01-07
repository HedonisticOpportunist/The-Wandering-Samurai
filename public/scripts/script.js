/**
* Validates the settings form 
**/
function validateSettingsForm() 
{
	let title = document.forms["settings"]["title"].value;
	
	if (title == "") 
	{
		alert("The title field must be filled out.");
		return false;
	}
	
	let subtitle = document.forms["settings"]["subtitle"].value;
	
	if (subtitle == "")
	{
		alert("The subtitle field must be filled out.");
		return false;
	}
	
	let author = document.forms["settings"]["author"].value;
	
	if (author == "")
	{
		alert("The author field must be filled out.");
		return false;
	}
}

function validateCommentsForm() 
{
	let commentField = document.forms["comments"]["comment"].value;
	
	if (commentField == "") 
	{
		alert("The comment field must be filled out.");
		return false;
	}
	
	let commentAuthor = document.forms["comments"]["author"].value;
	
	if (commentAuthor == "") 
	{
		alert("The author field must be filled out.");
		return false;
	}
	
	let datePublished = document.forms["comments"]["date_published"].value;
	
	if (datePublished == "")
	{
		alert("The date published field must be filled out.");
	}
}