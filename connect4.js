let gameOver = false;
let turn = 1; // 1 = Red, 2 = Yellow

// Function to check winner
function check(player) {

    function highlightAndWin(ids) {

        gameOver=true;
        // highlight 4 discs 
        ids.forEach(id => {
            document.getElementById(id).classList.add("winning-disc");
        });

        // Wait a moment so user can SEE the highlight
        setTimeout(() => {
            alert(`${player} wins`);
        }, 2000);
    }

    // Vertical Check
    for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 3; j++) {
            let ids = [`c${i}r${j}`, `c${i}r${j+1}`, `c${i}r${j+2}`, `c${i}r${j+3}`];

            if (ids.every(id => document.getElementById(id).style.backgroundColor == player)) {
                highlightAndWin(ids);
                return true;
            }
        }
    }

    // Horizontal Check
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 4; j++) {
            let ids = [`c${j}r${i}`, `c${j+1}r${i}`, `c${j+2}r${i}`, `c${j+3}r${i}`];

            if (ids.every(id => document.getElementById(id).style.backgroundColor == player)) {
                highlightAndWin(ids);
                return true;
            }
        }
    }

    // Diagonal Right-Down
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 3; j++) {
            let ids = [
                `c${i}r${j}`,
                `c${i+1}r${j+1}`,
                `c${i+2}r${j+2}`,
                `c${i+3}r${j+3}`
            ];

            if (ids.every(id => document.getElementById(id).style.backgroundColor == player)) {
                highlightAndWin(ids);
                return true;
            }
        }
    }

    // Diagonal Left-Down
    for (let i = 1; i <= 4; i++) {
        for (let j = 6; j >= 4; j--) {
            let ids = [
                `c${i}r${j}`,
                `c${i+1}r${j-1}`,
                `c${i+2}r${j-2}`,
                `c${i+3}r${j-3}`
            ];

            if (ids.every(id => document.getElementById(id).style.backgroundColor == player)) {
                highlightAndWin(ids);
                return true;
            }
        }
    }

    return false;
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

// document.querySelectorAll(".column").forEach((col) => {
//     col.addEventListener("click", () => {
//         for (let i = 6; i >= 1; i--) { // start from bottom (r6) and go up
//             let cell = document.getElementById(`${col.id}r${i}`);
//             if (!cell.style.backgroundColor) { // empty cell
//                 let color = (turn % 2 != 0) ? "red" : "yellow";
//                 cell.style.backgroundColor = color;

//                 turn++;
//                 check(color);
//                 checkDraw();

//                 document.getElementById("whosturn").innerText =
//                     (turn % 2 != 0) ? "Red's Turn" : "Yellow's Turn";
//                 break; // stop after placing one disc
//             }
//         }
//     });
// });

document.querySelectorAll(".column").forEach((col) => {
    col.addEventListener("click", () => {

        if(gameOver) return;
        
        for (let i = 6; i >= 1; i--) {
            let cell = document.getElementById(`${col.id}r${i}`);
            if (!cell.style.backgroundColor) {

                let color = (turn % 2 !== 0) ? "red" : "yellow";

                // Apply falling animation
                cell.style.backgroundColor = color;
                cell.classList.add("fall");
                setTimeout(() => cell.classList.remove("fall"), 500);

                // Delay winner check until ball fully lands
                setTimeout(() => {
                    check(color);
                }, 200);

                // Draw check timing also slightly delayed
                setTimeout(() => {
                    checkDraw();
                }, 500);

                turn++;

                if (turn % 2 != 0) {
                    document.getElementById("whosturn").innerText = "Red's Turn";

                    document.getElementById("red-ball").classList.add("active-turn");
                    document.getElementById("yellow-ball").classList.remove("active-turn");

                } else {
                    document.getElementById("whosturn").innerText = "Yellow's Turn";

                    document.getElementById("yellow-ball").classList.add("active-turn");
                    document.getElementById("red-ball").classList.remove("active-turn");
                }

                break;
            }
        }
    });
});

document.getElementById("red-ball").classList.add("active-turn");


//  for confetti
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiPieces = [];

    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: 7 + Math.random() * 7,
            color: `hsl(${Math.random() * 360}, 90%, 60%)`,
            speedX: (Math.random() - 0.5) * 2,
            speedY: 2 + Math.random() * 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((p) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;

            // Wrap around bottom
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }

            // Draw confetti rectangle
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Stop after 4 seconds
    setTimeout(() => {
        canvas.style.display = "none";
    }, 4000);
}


