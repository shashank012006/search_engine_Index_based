const input = document.getElementsByClassName('hud-input')[0];
const actionButton = document.getElementsByClassName('target-action-btn')[0];

const display = document.getElementById('display');


actionButton.addEventListener('click', function() {
    const dataToPrint = input.value;
    display.textContent = dataToPrint;
});

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const dataToPrint = input.value;
        display.textContent = "searching this in local folder " + dataToPrint;
    }
});
