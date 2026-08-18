window.addEventListener('DOMContentLoaded', function() {
    
    const input = document.getElementsByClassName('hud-input')[0];
    const actionButton = document.getElementsByClassName('target-action-btn')[0];
    const display = document.getElementById('display');


    // This function creates standard sci-fi styling blocks for our feedback text
    function createMessageBanner(text, textColor, isPulse = false) {
        display.innerHTML = ""; // Clear current view
        
        const messageDiv = document.createElement('div');
        messageDiv.textContent = text;
        messageDiv.style.fontFamily = "'Orbitron', Arial, sans-serif";
        messageDiv.style.fontSize = "1.1rem";
        messageDiv.style.color = textColor;
        messageDiv.style.padding = "15px 30px";
        messageDiv.style.background = "rgba(2, 15, 30, 0.6)";
        messageDiv.style.border = `1px solid ${textColor}40`; // Adds transparency to border color
        messageDiv.style.borderRadius = "6px";
        messageDiv.style.textTransform = "uppercase";
        messageDiv.style.letterSpacing = "1px";
        messageDiv.style.boxShadow = `0 0 15px ${textColor}15`;
        
        // Add a clean pulse effect if it's the loading state
        if (isPulse) {
            messageDiv.style.animation = "loadingPulse 1.5s infinite ease-in-out";
            // Injects inline keyframe animation if not present in your css sheet
            if (!document.getElementById('hud-pulse-style')) {
                const styleNode = document.createElement('style');
                styleNode.id = 'hud-pulse-style';
                styleNode.innerHTML = "@keyframes loadingPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }";
                document.head.appendChild(styleNode);
            }
        }
        
        display.appendChild(messageDiv);
    }

    // Function to render the beautiful data layout grid
    function renderResultsGrid(dataArray) {
        display.innerHTML = ""; 

        const container = document.createElement('div');
        const title = document.createElement('div');
        const tableGrid = document.createElement('div');

        title.textContent = "Found in:";
        title.style.fontFamily = "'Rajdhani', Arial, sans-serif";
        title.style.fontSize = "1.15rem";
        title.style.color = "#00f0ff";
        title.style.textShadow = "0 0 5px rgba(0, 240, 255, 0.5)";
        title.style.marginBottom = "14px";
        title.style.fontWeight = "600";
        title.style.textTransform = "uppercase";

        tableGrid.style.display = "grid";
        tableGrid.style.gridTemplateColumns = "260px 80px"; 
        tableGrid.style.gap = "12px 24px";
        tableGrid.style.backgroundColor = "#0b1520"; 
        tableGrid.style.border = "1px solid #1a2f47"; 
        tableGrid.style.padding = "20px";
        tableGrid.style.borderRadius = "8px";
        tableGrid.style.maxWidth = "400px";
        tableGrid.style.fontFamily = "'Rajdhani', Arial, sans-serif";

        const headerFile = document.createElement('div');
        headerFile.textContent = "File";
        const headerScore = document.createElement('div');
        headerScore.textContent = "Score";

        const headerStyle = (el) => {
            el.style.fontSize = "0.85rem";
            el.style.color = "#617b9b";
            el.style.fontWeight = "bold";
            el.style.textTransform = "uppercase";
            el.style.borderBottom = "1px solid #1a2f47";
            el.style.paddingBottom = "6px";
        };
        headerStyle(headerFile);
        headerStyle(headerScore);

        tableGrid.appendChild(headerFile);
        tableGrid.appendChild(headerScore);

        dataArray.forEach(function(item) {
            const cellFile = document.createElement('div');
            cellFile.textContent = item.file;
            cellFile.style.fontSize = "1.05rem";
            cellFile.style.color = "#ffffff";

            const cellScore = document.createElement('div');
            cellScore.textContent = item.score.toFixed(4); // Showing 4 digits helps see smaller TF-IDF details
            cellScore.style.fontSize = "1.05rem";
            cellScore.style.color = "#00f0ff"; 
            cellScore.style.fontWeight = "600";
            cellScore.style.fontFamily = "'Orbitron', monospace";

            tableGrid.appendChild(cellFile);
            tableGrid.appendChild(cellScore);
        });

        container.appendChild(title);
        container.appendChild(tableGrid);
        display.appendChild(container);
    }

    // MAIN CONTROLLER FUNCTION
    // This connects directly to your Flask server!
    function executeSearch() {
        const query = input.value.trim();

        // If the box is completely empty, clear the display panels
        if (query === "") {
            display.innerHTML = "";
            return;
        }

        // SCENARIO 1: Show "Searching..." immediately
        createMessageBanner("Searching system directories...", "#00f0ff", true);

        // Build URL structure passing the query along
        const url = `http://127.0.0.1:5000/get-data?query=${encodeURIComponent(query)}`;

        // Request real data from your running Python script engine
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network node fault encountered");
                }
                return response.json();
            })
            .then(data => {
                // Convert Flask's mapping object {"dsa.txt": 0.52} into structural lists:
                // [{file: "dsa.txt", score: 0.52}]
                const structuredResults = Object.entries(data).map(([fileName, fileScore]) => {
                    return {
                        file: fileName,
                        score: fileScore
                    };
                });

                if (structuredResults.length > 0) {
                    // SCENARIO 2: Items found matching query criteria
                    renderResultsGrid(structuredResults);
                } else {
                    // SCENARIO 3: Zero matching documents located
                    createMessageBanner("No matching results located.", "#ffb700");
                }
            })
            .catch(err => {
                console.error("Transmission Error:", err);
                createMessageBanner(err.message, "#ff3333");
            });
    }

    // Event Listener assignments mapping to our controller
    if (input) {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                executeSearch();
            }
        });
    }

    if (actionButton) {
        actionButton.addEventListener('click', function() {
            executeSearch();
        });
    }
});
