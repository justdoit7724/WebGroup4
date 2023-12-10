// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('deleteBookForm')

    form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Getting the User's input value from the form
    var title = document.getElementById('deleteBookTitle').value;

    // AJAX call to delete the book
    fetch('/book/' + encodeURIComponent(title), {
        method: 'DELETE'
    })
    .then(response => {
        // Redirect to home page on successful deletion
        if (response.ok) {
            window.location.href = '/edit';
        } else{
            return response.json();
        }   
    })
    .then(data => {
        console.log('Success:', data.message); // Handle success 
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error
    })
})
});
