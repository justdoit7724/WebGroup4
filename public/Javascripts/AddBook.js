// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('addBookForm');
    
    form.addEventListener('submit', function(event){
        event.preventDefault();// Prevent the default form submission
    
        //Using formData to retrieve data from the form fields
        const formData = new FormData(form);
        const data = {
            // Get the User's input value 
            title: formData.get('title'),
            author: formData.get('author'),
            date: formData.get('date'),
            category: formData.get('category')
        };

        // Send a fetch request to the server
        fetch('/book',{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json' // Informing the server that client is sending Json data 
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            // redirecting user to home page after successful book addition into database
            if(response.ok){
                window.location.href = '/edit';
            } 
            
            // If the response is not successful, throw an error
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Success:', data); // Handle success
        })
        .catch(error => {
            console.error('Error: ', error);// Handle error
        })
    })
})
