let keystrokeTimes = [];
let pauses = [];
let keyHoldTimes = [];
let keyDistances = [];
let mouseMovements = [];
let keyPressCount = 0;
let lastKeyTime = null;
let lastMouseTime = null;
let lastMouseX = null;
let lastMouseY = null;
let copyPasteCount = 0;

// Function to calculate distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Track keystroke times
document.addEventListener('keydown', (event) => {
    const currentTime = Date.now();

    if (lastKeyTime) {
        const timeDiff = currentTime - lastKeyTime;
        keystrokeTimes.push(timeDiff);
        if (timeDiff > 200) { // Example pause duration
            pauses.push(timeDiff);
        }
    }

    lastKeyTime = currentTime;
    keyPressCount++;
});

// Track key hold times
document.addEventListener('keyup', () => {
    const currentTime = Date.now();
    const holdTime = currentTime - lastKeyTime;
    keyHoldTimes.push(holdTime);
});

// Track mouse movements
document.addEventListener('mousemove', (event) => {
    const currentTime = Date.now();

    if (lastMouseTime) {
        const timeDiff = currentTime - lastMouseTime;
        const distance = calculateDistance(event.clientX, event.clientY, lastMouseX, lastMouseY);
        mouseMovements.push({
            time: timeDiff,
            distance: distance
        });
    }

    lastMouseTime = currentTime;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});

// Track copy-paste actions
document.addEventListener('paste', () => {
    copyPasteCount++;
});

function calculateFeaturesAndSave() {
    const avgKeystrokeTime = keystrokeTimes.reduce((a, b) => a + b, 0) / keystrokeTimes.length || 0;
    const stdKeystrokeTime = Math.sqrt(keystrokeTimes.map(x => Math.pow(x - avgKeystrokeTime, 2)).reduce((a, b) => a + b, 0) / keystrokeTimes.length) || 0;

    const avgPauseTime = pauses.reduce((a, b) => a + b, 0) / pauses.length || 0;
    const stdPauseTime = Math.sqrt(pauses.map(x => Math.pow(x - avgPauseTime, 2)).reduce((a, b) => a + b, 0) / pauses.length) || 0;

    const avgKeyHoldTime = keyHoldTimes.reduce((a, b) => a + b, 0) / keyHoldTimes.length || 0;
    const stdKeyHoldTime = Math.sqrt(keyHoldTimes.map(x => Math.pow(x - avgKeyHoldTime, 2)).reduce((a, b) => a + b, 0) / keyHoldTimes.length) || 0;

    const avgKeyDistance = keyDistances.reduce((a, b) => a + b, 0) / keyDistances.length || 0;
    const stdKeyDistance = Math.sqrt(keyDistances.map(x => Math.pow(x - avgKeyDistance, 2)).reduce((a, b) => a + b, 0) / keyDistances.length) || 0;

    // Calculate typing speed (characters per minute)
    const typingSpeed = (keyPressCount / ((Date.now() - lastKeyTime) / 60000)).toFixed(2);

    // Calculate rhythm consistency (standard deviation of keystroke times)
    const rhythmConsistency = stdKeystrokeTime;

    // Assuming we have logic to calculate error_rate and correction_rate
    const errorRate = 0; // Implement error tracking logic as needed
    const correctionRate = 0; // Implement correction tracking logic as needed

    // Calculate mouse speed
    const mouseSpeed = mouseMovements.reduce((total, move) => total + (move.distance / move.time), 0) / mouseMovements.length || 0;

    // Prepare data for CSV (Horizontal format)
    const csvData = [
        'avg_keystroke_time',
        'std_keystroke_time',
        'avg_pause_time',
        'std_pause_time',
        'avg_key_hold_time',
        'std_key_hold_time',
        'typing_speed',
        'rhythm_consistency',
        'avg_key_distance',
        'std_key_distance',
        'error_rate',
        'correction_rate',
        'copy_paste_frequency',
        'mouse_speed',
        avgKeystrokeTime,
        stdKeystrokeTime,
        avgPauseTime,
        stdPauseTime,
        avgKeyHoldTime,
        stdKeyHoldTime,
        typingSpeed,
        rhythmConsistency,
        avgKeyDistance,
        stdKeyDistance,
        errorRate,
        correctionRate,
        copyPasteCount,
        mouseSpeed
    ];

    // Convert to CSV format
    let csvContent = "data:text/csv;charset=utf-8," + csvData.join(",") + "\r\n";

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "features.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the file
    document.body.removeChild(link); // Clean up
}

// Add event listener for form submission
document.getElementById("yourFormId").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    calculateFeaturesAndSave(); // Call the function to calculate features and save them
});
