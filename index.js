// Sleep function
function sleep(time) {
  return new Promise(resolve => {
    // Resolve promise after given time passes
    setTimeout(resolve, time);
  });
}

// Function that handles file selection
async function handleFileLoad() {
  // Make progress bar appear after file change is detected
  document.getElementById('progress-bar').style.display = 'inline';
  // Get image to display
  var file = document.getElementById('file-input').files;
  var fileReader = new FileReader();
  // After progress bar loads display image
  fileReader.onload = async function(e) {
    for (var i = 0; i <= 100; i++){
      await sleep(10);
  		document.getElementById('progress-bar').value = i;
      console.log(document.getElementById('progress-bar').value);
    }
    document.getElementById('selected-photo').setAttribute('src', e.target.result);
    // After file is loaded hide progress bar
    document.getElementById('progress-bar').style.display = 'none';
  };
  fileReader.readAsDataURL(file[0]);
}

// Handle form submission
function handleFormSubmit(form) {
  var loader = document.createElement('div');
  var submitField = document.getElementById('submit-field');
  loader.className = 'spin-load';

  document.getElementById('submit-btn').style.display = 'none';

  submitField.appendChild(loader);
  // Give time for animation to display
  setTimeout(function() {
    // Submit form after 3 seconds 
    form.submit();
  }, 2000);
  return false;
}

// Validate form fields
function validateInputFields() {
  // Get all of the fields in the form
  var inputFields = document.getElementById('main-form').elements;
  // Iterate over them
  for (var i = 0; i < inputFields.length; i++) {
    var field = inputFields[i];
    // Check if the input type is text
    if (field.type == 'text') {
      // If so, then make sure it's not empty
      if (field.value == '') {
        // If it is immediately return false for the whole form
        return false;
      }
    } 
  }
  // If the code makes it to here then none of the text fields are empty
  return true;
}

// Shake the form submit button
function errorShake() {
  // Use jquery effect
  $('#submit-field').effect('shake', {times: 2}, 800);
}

// When file is selected for input field call handleFileLoad
$('#file-input').change(handleFileLoad);

var submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function() {
  var isFormValid = validateInputFields();
  if (!isFormValid) {
    errorShake();
  }
})