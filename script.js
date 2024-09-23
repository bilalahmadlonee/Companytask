let reminderTimeouts = [];


document.getElementById('setReminder').addEventListener('click', function() {
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;

    
    if (!time) {
        alert("Please select a valid time!");
        return;
    }

    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    let reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

   
    if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime - now;

    
    if (timeUntilReminder <= 0) {
        alert("Please select a future time for the reminder!");
        return;
    }


    clearReminders();

   
    const notification = document.getElementById('notification');
    notification.innerHTML = `Reminder set for ${activity} on ${day} at ${time}.`;

    // Add a timeout to trigger the sound at the right time
    const timeoutId = setTimeout(() => {
        playSound(); 

   
});


function playSound() {
    const audio = new Audio('sample-3s.mp3');
    audio.play().catch(error => {
        console.log('Error playing audio:', error); 
    });
}

// Function to clear previous reminders
function clearReminders() {
    reminderTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    reminderTimeouts = [];
}
