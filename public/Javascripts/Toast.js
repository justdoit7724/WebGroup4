document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('loggedOut') === 'true') {
        // Dealy showing logged out message by 1s after log out
        setTimeout(() => {
        showToast('Successfully logged out.');
    }, 500);
    }
});

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
  
    toast.textContent = message;
    toast.style.background = '#d1e8ff';
    toast.style.color = 'black';
    toast.style.fontSize = '20px';
    toast.style.padding = '30px';
    toast.style.marginTop = '150px';
    toast.style.borderRadius = '20px';
    toast.style.opacity = 0;
    toast.style.transition = 'opacity 0.3s ease-in-out';
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = 1; // Change to opacity 1 to show the toast
      }, 50);
  
    // Remove the toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => container.removeChild(toast), 300); // Ensure smooth fade-out
    }, 4000);
  }