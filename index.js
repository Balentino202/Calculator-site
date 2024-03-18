document.addEventListener('DOMContentLoaded', function() {
    let display = document.querySelector('.display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    // Function to update display
    function updateDisplay(value) {
        display.textContent = value;
    }

    // Function to clear display and reset inputs
    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    }

    // Function to perform calculation
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }
        updateDisplay(result.toString());
        currentInput = result.toString();
        operator = '';
        previousInput = '';
    }

    // Event listeners for number and decimal buttons
    document.querySelectorAll('.number, .decimal').forEach(button => {
        button.addEventListener('click', function() {
            if (button.textContent === '.' && currentInput.includes('.')) {
                return; // Avoid adding multiple decimal points
            }
            currentInput += button.textContent;
            updateDisplay(currentInput);
        });
    });

    // Event listener for operator buttons
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', function() {
            if (currentInput !== '') {
                if (previousInput !== '') {
                    calculate();
                }
                operator = button.textContent;
                previousInput = currentInput;
                currentInput = '';
            }
        });
    });

    // Event listener for equals button
    document.querySelector('.equals').addEventListener('click', function() {
        if (currentInput !== '') {
            calculate();
        }
    });

    // Event listener for clear button
    document.querySelector('.clear').addEventListener('click', function() {
        clearDisplay();
    });

    // Function to show video and hide image
    function showVideo() {
        bgVideo.style.display = 'block';
        bgImage.style.display = 'none';
        // Play video
        bgVideo.play();
    }

    // Function to show image and hide video
    function showImage() {
        bgImage.style.display = 'block';
        bgVideo.style.display = 'none';
        // Stop video
        bgVideo.pause();
    }

    // Initially show the video
    showVideo();

    // Set interval to alternate between video and image
    setInterval(function() {
        // Hide video and show image after 10 seconds
        showImage();
        // After 5 seconds, show video again
        setTimeout(function() {
            showVideo();
        }, 5000);
    }, 10000);
});
