// console.log("code.js loaded");
/* Had problem: Live Server opened code.js from a different folder when File -> Open folder. Some miserable bug I guess. */

function submitBrief() {

    /// CLIENT NAME
    let clientNameField = document.querySelector("#client-name-input");
    let clientName = clientNameField.value;
    localStorage.setItem("clientName", clientName);

    /// EMAIL
    let emailField = document.querySelector("#email-input");
    let email = emailField.value;
    localStorage.setItem("email", email);

    /// PROJECT TITLE
    let projectTitleField = document.querySelector("#project-title-input");
    let projectTitle = projectTitleField.value;
    localStorage.setItem("projectTitle", projectTitle);

    /// TYPE OF WORK - RADIO
    let illustrationRadio = document.querySelector("#illustration-radio");
    let modelRadio = document.querySelector("#model-radio");
    let environmentRadio = document.querySelector("#environment-radio");
    let characterRadio = document.querySelector("#character-radio");

    let workType = "";

    if (illustrationRadio.checked) {
        workType = illustrationRadio.value;
    }
    else if (modelRadio.checked) {
        workType = modelRadio.value;
    }
    else if (environmentRadio.checked) {
        workType = environmentRadio.value;
    }
    else if (characterRadio.checked) {
        workType = characterRadio.value;
    }

    localStorage.setItem("workType", workType);

    /// DELIVERABLES - CHECKBOXES
    let sketchesCheck = document.querySelector("#sketches-check");
    let renderCheck = document.querySelector("#render-check");
    let sourceFilesCheck = document.querySelector("#source-files-check");
    let texturedCheck = document.querySelector("#textured-check");

    let deliverables = "";

    if (sketchesCheck.checked) {
        deliverables = deliverables + "Sketches ";
    }

    if (renderCheck.checked) {
        deliverables = deliverables + "Final render ";
    }

    if (sourceFilesCheck.checked) {
        deliverables = deliverables + "Source files ";
    }

    if (texturedCheck.checked) {
        deliverables = deliverables + "Textured version ";
    }

    localStorage.setItem("deliverables", deliverables);

    /// STYLE SELECT
    let styleField = document.querySelector("#style-select");
    let styleChoice = styleField.value;
    localStorage.setItem("styleChoice", styleChoice);

    /// COLOUR
    let colourField = document.querySelector("#colour-input");
    let colour = colourField.value;
    localStorage.setItem("colour", colour);

    /// BUDGET RANGE
    let budgetField = document.querySelector("#budget-range");
    let budgetLevel = "€" + budgetField.value;
    localStorage.setItem("budgetLevel", budgetLevel);

    /// NUMBER OF ASSETS + Preventing < 1 with IF
    let assetNumberField = document.querySelector("#asset-number-input");
    let assetNumber = Number(assetNumberField.value);

    if (assetNumber < 1) {
        assetNumber = 1;
    }

    localStorage.setItem("assetNumber", assetNumber);

    /// The method we used on a lesson -- won't work as we have a separate page for the output (I wasn't sure if it's what's needed from the brief)
    // let fileInput = document.querySelector("#image-file"); //get the file input
    // let file = fileInput.files[0]; // get the first file uplouded (they are added to the arrey = list)
    // let fileURL = URL.createObjectURL(file); // create URL = adress for that file
    // let villainImage = document.querySelector("img"); ///* NO # IN THE NAME HERE
    // villainImage.src = fileURL;

    /// PROJECT DESCRIPTION
    let projectDescriptionField = document.querySelector("#project-description-input");
    let projectDescription = projectDescriptionField.value;
    localStorage.setItem("projectDescription", projectDescription);

    /// DEADLINE - from "Birthday" https://www.w3schools.com/tags/tag_fieldset.asp + Get Date https://www.w3schools.com/js/js_date_methods.asp
    let deadlineField = document.querySelector("#deadline-input");
    let deadline = deadlineField.value;

    let today = new Date();
    let fiveDays = 1000 * 60 * 60 * 24 * 5;
    let minimumDeadline = new Date(today.getTime() + fiveDays);

    let chosenDeadline = new Date(deadline);

    if (chosenDeadline.getTime() < minimumDeadline.getTime()) {

        let year = minimumDeadline.getFullYear();
        let month = minimumDeadline.getMonth() + 1;
        let day = minimumDeadline.getDate();

        if (month < 10) {
            month = "0" + month;
        }

        if (day < 10) {
            day = "0" + day;
        }

        deadline = year + "-" + month + "-" + day;
    }

    localStorage.setItem("deadline", deadline); //Outside "IF" because we want to save deadline in any case, not just when "if"

    /// UPLOUD IMAGE -- technique from THE BOOK https://eloquentjavascript.net/18_http.html

    let fileInput = document.querySelector("#reference-file"); //get the file input

    if (fileInput.files.length > 0) {
        let file = fileInput.files[0]; // get the first file uplouded (they are added to the array = list)
        let referenceName = file.name;
        localStorage.setItem("referenceName", referenceName);

        let reader = new FileReader(); // create a file reader

        reader.addEventListener("load", function () {
            localStorage.setItem("referenceImage", reader.result); // save image data for the next page
            window.location.href = "pages/output.html"; // go to output page after image is ready
        });

        reader.readAsDataURL(file); // read image as data URL
    }
    else {
        localStorage.setItem("referenceName", "");
        localStorage.setItem("referenceImage", "");
        window.location.href = "pages/output.html";
    }

}

/// BUDGET RANGE LIVE VALUE
var slider = document.querySelector("#budget-range");
var output = document.querySelector("#budget-range-value");

if (slider) {
    output.innerHTML = "€" + slider.value; // Display default slider value

    slider.oninput = function () {
        output.innerHTML = "€" + this.value; // Update current slider value while dragging
    }
}

/// DEADLINE MINIMUM IN FORM
let deadlineField = document.querySelector("#deadline-input");

if (deadlineField) {
    let today = new Date();
    let fiveDays = 1000 * 60 * 60 * 24 * 5;
    let minimumDeadline = new Date(today.getTime() + fiveDays);

    let year = minimumDeadline.getFullYear();
    let month = minimumDeadline.getMonth() + 1;
    let day = minimumDeadline.getDate();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    deadlineField.min = year + "-" + month + "-" + day;
}


///* OUTPUT
function loadBrief() {

    /// CLIENT NAME
    let clientNameOutput = document.querySelector("#client-name-output");
    clientNameOutput.innerHTML = localStorage.getItem("clientName");

    /// EMAIL
    let emailOutput = document.querySelector("#email-output");
    emailOutput.innerHTML = localStorage.getItem("email");

    /// PROJECT TITLE
    let projectTitleOutput = document.querySelector("#project-title-output");
    projectTitleOutput.innerHTML = localStorage.getItem("projectTitle");

    /// TYPE OF WORK
    let workTypeOutput = document.querySelector("#work-type-output");
    workTypeOutput.innerHTML = localStorage.getItem("workType");

    /// DELIVERABLES
    let deliverablesOutput = document.querySelector("#deliverables-output");
    deliverablesOutput.innerHTML = localStorage.getItem("deliverables");

    /// STYLE
    let styleOutput = document.querySelector("#style-output");
    styleOutput.innerHTML = localStorage.getItem("styleChoice");

    /// COLOUR
    let colourOutputBox = document.querySelector("#colour-output-box");
    colourOutputBox.style.background = localStorage.getItem("colour");

    /// BUDGET
    let budgetOutput = document.querySelector("#budget-output");
    budgetOutput.innerHTML = localStorage.getItem("budgetLevel");

    /// NUMBER OF ASSETS + Preventing negative numbers with IF
    let assetNumberOutput = document.querySelector("#asset-number-output");
    assetNumberOutput.innerHTML = localStorage.getItem("assetNumber");

    /// REFERENCE IMAGE
    let referenceOutputImage = document.querySelector("#reference-output-image");
    referenceOutputImage.src = localStorage.getItem("referenceImage");


    /// PROJECT DESCRIPTION
    let projectDescriptionOutput = document.querySelector("#project-description-output");
    projectDescriptionOutput.innerHTML = localStorage.getItem("projectDescription");

    /// DEADLINE from https://www.w3schools.com/js/js_date_methods.asp and https://www.w3schools.com/js/js_dates.asp
    let deadlineOutput = document.querySelector("#deadline-output");
    let deadline = localStorage.getItem("deadline");

    let savedDeadline = new Date(deadline);

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = savedDeadline.getDate();
    let month = months[savedDeadline.getMonth()];
    let year = savedDeadline.getFullYear();

    deadlineOutput.innerHTML = "by " + day + " " + month + " " + year; //" " -- for space after
}

let clientNameOutput = document.querySelector("#client-name-output");

if (clientNameOutput) { // If Output then loadBrief
    loadBrief();
}

/// I HAD A PROBLEM HERE & tried to solve it by going to the next page ONLY if requirements are met, "required" fields in my case

let form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (event) {
        //listens for the form being submitted
        //this happens when the user clicks a submit button or presses Enter
        //event is information about that submit action

        if (form.checkValidity()) {
            //“Are all required fields valid?”, it checks built-in HTML validation such as:required min email type if used etc

            event.preventDefault();
            //normally the form would automatically go to the action="..." page, this line pauses that so your JS can control what happens
            submitBrief();
            // runs my function
        }
        else {
            form.reportValidity();
            //tells the browser to show its normal warning messages
            event.preventDefault();
        }
    });
}

function limitDescription() {
    /// NO MORE THAN 1000 SYMBOLS

    let projectDescriptionField = document.querySelector("#project-description-input");

    if (projectDescriptionField.value.length > 1000) {
        projectDescriptionField.value = projectDescriptionField.value.slice(0, 1000);
    }
}