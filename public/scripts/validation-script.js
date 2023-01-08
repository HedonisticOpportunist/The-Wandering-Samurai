/// VALIDATION SCRIPT ///

/**
* Validates the settings form 
**/
function validateSettingsForm() 
{
	let title = document.forms["settings"]["title"].value;
	validateField(title, "title");
	
	let subtitle = document.forms["settings"]["subtitle"].value;
	validateField(subtitle, "subtitle");
	
	let author = document.forms["settings"]["author"].value;
	validateField(author, "author");
}

/**
* Validates the comments form 
**/
function validateCommentsForm() 
{
	let commentField = document.forms["comments"]["comment"].value;
	validateField(commentField, "comments");
	
	let commentAuthor = document.forms["comments"]["author"].value;
	validateField(commentAuthor, "author");
	
	let datePublished = document.forms["comments"]["date_published"].value;
	validateDate(datePublished);
}

/**
* Validates the drafts form
**/
function validateDraftForm()
{
	validateArticleForm("drafts");
}

/**
* Validates the articles form
**/
function validateEditArticleForm()
{
	validateArticleForm("edit-article");
}

/**
* Validates the create articles form
**/
function validateCreateArticleForm()
{
	validateArticleForm("create-article");
}

// HELPER FUNCTIONS //

/**
* Validates any forms related to articles
**/
function validateArticleForm(formName)
{
	let title = document.forms[formName]["title"].value;
	validateField(title, "title");
	
	let subtitle = document.forms[formName]["subtitle"].value;
	validateField(subtitle, "subtitle");
	
	let text = document.forms[formName]["text"].value;
	validateField(text, "text");
	
	let datePublished = document.forms[formName]["date_published"].value;
	validateDate(datePublished);
	
	let dateModified = document.forms[formName]["date_modified"].value;
	validateDate(dateModified);
	
	let numberOfLikes = document.forms[formName]["number_of_likes"].value;
	validateField(numberOfLikes, "number of likes");
}


/**
* Validates a field
* Returns false if it is an empty string 
**/
function validateField(field, fieldName)
{
	checkFailed = true;
	
	if (field == "")
	{
		event.preventDefault();
		alert(`The ${fieldName} field must be filled out.`);
		checkFailed = false;
	}
	
	return checkFailed;
}

/**
* Validates a date in terms of it being an empty string 
* It also checks whether the date string is a valid date 
* Returns false if the string cannot be parsed or the field is an empty string
**/
function validateDate(dateStr)
{
	dateValidated = true;
	
	let isValidDate = Date.parse(dateStr);
	
	if (isNaN(isValidDate) || dateStr == "") 
	{
		event.preventDefault();
		alert("Not a valid date and / or the date field is empty.");
		dateValidated = false;
	}
	
	return dateValidated; 
}