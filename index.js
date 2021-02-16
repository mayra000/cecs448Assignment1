// Sleep function
function sleep(time) {
  return new Promise(resolve => {
    // Resolve promise after given time passes
    setTimeout(resolve, time);
  });
}

// Sets progress bar value to mimic file upload
async function loadBar() {
	for (var i = 0; i <= 100; i++) {
      // Sleep for 25 milliseconds during each iteration to make user wait
      await sleep(10);
      // Update progress bar value
  		document.getElementById('progress-bar').value = i;
	}
}

// Function that handles file selection
async function handleFileLoad() {
  // Make progress bar appear after file change is detected
  document.getElementById('progress-bar').style.display = 'inline';
  // Get image to display
  var file = document.getElementById('file-input').files;
  var fileReader = new FileReader();
  // Start loading the progress bar
  await loadBar();
  // After progress bar loads display image
  fileReader.onload = function(e) {
    document.getElementById('selected-photo').setAttribute('src', e.target.result);
  };
  fileReader.readAsDataURL(file[0]);
  // After file is loaded hide progress bar
  document.getElementById('progress-bar').style.display = 'none';
}

// Handle form submission
function handleFormSubmit(form) {
  var loader = document.createElement('div');
  var submitField = document.getElementById('submit-field');
  loader.className = 'loader';

  document.getElementById('submit-btn').style.display = 'none';

  submitField.appendChild(loader);
  // Give time for animation to display
  setTimeout(function() {
    // Submit form after 3 seconds 
    form.submit();
  }, 2000);
  return false;
}

// When file is selected for input field call handleFileLoad
$('#file-input').change(handleFileLoad);
