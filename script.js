let reminderTimeouts = [];

// Function to set the reminder
document.getElementById('setReminder').addEventListener('click', function() {
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;

    // Check if time is selected
    if (!time) {
        alert("Please select a valid time!");
        return;
    }

    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    let reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // Check if the selected time is in the past for today, then set for tomorrow
    if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime - now;

    // Ensure the selected time is in the future
    if (timeUntilReminder <= 0) {
        alert("Please select a future time for the reminder!");
        return;
    }

    // Clear any previous reminders
    clearReminders();

    // Display the reminder confirmation message
    const notification = document.getElementById('notification');
    notification.innerHTML = `Reminder set for ${activity} on ${day} at ${time}.`;

    // Add a timeout to trigger the sound at the right time
    const timeoutId = setTimeout(() => {
        playChime(); // Play the sound directly without notification
    }, timeUntilReminder);

    // Store the timeout ID for managing active reminders
    reminderTimeouts.push(timeoutId);
});

// Function to play a sound without a notification
function playChime() {
    const audio = new Audio('sample-3s.mp3');
    audio.play().catch(error => {
        console.log('Error playing audio:', error);  // Catch errors related to autoplay restrictions
    });
}

// Function to clear previous reminders
function clearReminders() {
    reminderTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    reminderTimeouts = [];
}
