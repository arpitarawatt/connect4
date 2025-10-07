let turn = 1; // 1 = Red, 2 = Yellow

// Function to check winner
function check(player) {
    setTimeout(() => {

        // Vertical Check
        for (let i = 1; i <= 7; i++) {
            for (let j = 1; j <= 3; j++) {
                if (
                    document.getElementById(`c${i}r${j}`).style.backgroundColor == player &&
                    document.getElementById(`c${i}r${j + 1}`).style.backgroundColor == player &&
                    document.getElementById(`c${i}r${j + 2}`).style.backgroundColor == player &&
                    document.getElementById(`c${i}r${j + 3}`).style.backgroundColor == player
                ) {
                    alert(`${player} wins`);
                    return;
                }
            }
        }

        // Horizontal Check
        for (let i = 1; i <= 6; i++) {
            for (let j = 1; j <= 4; j++) {
                if (
                    document.getElementById(`c${j}r${i}`).style.backgroundColor == player &&
                    document.getElementById(`c${j + 1}r${i}`).style.backgroundColor == player &&
                    document.getElementById(`c${j + 2}r${i}`).style.backgroundColor == player &&
                    document.getElementById(`c${j + 3}r${i}`).style.backgroundColor == player
                ) {
                    alert(`${player} wins`);
                    return;
                }
            }
        }

        // Diagonal Right-Down Check
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 3; j++) {
                if (
                    document.getElementById(`c${i}r${j}`).style.backgroundColor == player &&
                    document.getElementById(`c${i + 1}r${j + 1}`).style.backgroundColor == player &&
                    document.getElementById(`c${i + 2}r${j + 2}`).style.backgroundColor == player &&
                    document.getElementById(`c${i + 3}r${j + 3}`).style.backgroundColor == player
                ) {
                    alert(`${player} wins`);
                    return;
                }
            }
        }

        // Diagonal Left-Down Check
        for (let i = 1; i <= 4; i++) {
            for (let j = 6; j >= 4; j--) {
                if (
                    document.getElementById(`c${i}r${j}`).style.backgroundColor == player &&
                    document.getElementById(`c${i + 1}r${j - 1}`).style.backgroundColor == player &&
                    document.getElementById(`c${i + 2}r${j - 2}`).style.backgroundColor == player &&
                    document.getElementById(`c${i + 3}r${j - 3}`).style.backgroundColor == player
                ) {
                    alert(`${player} wins`);
                    return;
                }
            }
        }

    }, 100);
}

// Function to check draw
function checkDraw() {
    let allCells = document.querySelectorAll(".column p");

    // Check if every cell has a color (no empty/undefined)
    let isFull = Array.from(allCells).every(cell => cell.style.backgroundColor);

    if (isFull) {
        setTimeout(() => {
            const textElement = document.getElementById("winner-text");
            const winnerPopup = document.getElementById("winner-popup");

            // Draw message on two lines
            textElement.innerText = "-- Game End --\n It's a Draw";

            // Show popup WITHOUT confetti
            winnerPopup.classList.add("active");
        }, 200);
    }
}

document.querySelectorAll(".column").forEach((col) => {
    col.addEventListener("click", () => {
        for (let i = 6; i >= 1; i--) { // start from bottom (r6) and go up
            let cell = document.getElementById(`${col.id}r${i}`);
            if (!cell.style.backgroundColor) { // empty cell
                let color = (turn % 2 != 0) ? "red" : "yellow";
                cell.style.backgroundColor = color;

                turn++;
                check(color);
                checkDraw();

                document.getElementById("whosturn").innerText =
                    (turn % 2 != 0) ? "Red's Turn" : "Yellow's Turn";
                break; // stop after placing one disc
            }
        }
    });
});
