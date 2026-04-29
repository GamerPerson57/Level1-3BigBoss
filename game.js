var canvas, context; 
var player1, ball; 
var timer, interval = 1000/60;
var score = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

// Player settings
let playerWidth = 40;
let playerHeight = 250;

// Create paddle
player1 = new GameObject(canvas.width/2 - playerWidth/2,canvas.height - 50,playerWidth,playerHeight,"#b700ff");
player1.speed = 3;

// Create ball
ball = new GameObject(canvas.width/2,canvas.height/2,20, 20, "#0004ff");
ball.radius = 40;
ball.vx = 5;
ball.vy = 0;
ball.force = 1.5;

timer = setInterval(animate, interval);

function drawLine() 
{
    context.beginPath();
    context.moveTo(player1.x, player1.y - player1.height / 2);
    context.lineTo(ball.x, ball.y);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
}


function drawText() {
    context.font = "16px Arial";
    context.fillStyle = "black";
    context.fillText("Score: " + score, 80, 25);
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    player1.drawRect();
    ball.drawCircle();

    drawLine();
    drawText();


    ////// PLAYER MOVEMENT //////

    // Acceleration
    if (a) 
    {
        player1.vx -= player1.speed; 
    }

    if (d) 
    {
        player1.vx += player1.speed;
    }

    // Friction
    player1.vx *= 0.85;   // lower = more friction

    // Move paddle
    player1.x += player1.vx;



    ////// BOUNDARIES //////

    // Left boundary
    if (player1.x - player1.width / 2 < 0) 
    {
        player1.x = player1.width / 2;
    }

    // Right boundary
    if (player1.x + player1.width / 2 > canvas.width) 
    {
        player1.x = canvas.width - player1.width / 2;
    }

       

    ////// BALL PHYSICS //////

    ball.vy += 1;        // gravity
    ball.vx *= 0.98;     // friction

    ball.x += ball.vx;
    ball.y += ball.vy;

    ////// CANVAS COLLISION //////

    // Left
    if (ball.x - ball.radius <= 0) 
    {
        ball.x = ball.radius;
        ball.vx *= -1;
    }

    // Right
    if (ball.x + ball.radius >= canvas.width) 
    {
        ball.x = canvas.width - ball.radius;
        ball.vx *= -1;
    }

    // Top
    if (ball.y - ball.radius <= 0) 
    {
        ball.y = ball.radius;
        ball.vy *= -1;
    }

    // Bottom (reset)
    if (ball.y + ball.radius >= canvas.height) 
    {
        ball.y = canvas.height - ball.radius;
        ball.vy = -ball.vy * 0.67;

        if (Math.abs(ball.vy) < 2) ball.vy = -2;

        score = 0;
    }

    ////// PADDLE COLLISION //////

    if (
        ball.y + ball.radius >= player1.top() &&
        ball.y - ball.radius <= player1.bottom() &&
        ball.x + ball.radius >= player1.left() &&
        ball.x - ball.radius <= player1.right() &&
        ball.vy > 0
    ) 
    {
        // Distance from left edge of paddle
        let hitX = ball.x - player1.left();
        let w = player1.width;

        // Compute zones
        let zone = hitX / w;  // 0.0 → 1.0

        // Default straight up
        ball.vx = 0;
        ball.vy = -35;

        // Outer Left 1/6
        if (zone < 1/6) {
            ball.vx = -ball.force * 5;
        }
        // Inner Left 1/6
        else if (zone < 2/6) {
            ball.vx = -ball.force;
        }
        // Center 1/3 (2/6 → 4/6)
        else if (zone < 4/6) {
            ball.vx = 0;
        }
        // Inner Right 1/6
        else if (zone < 5/6) {
            ball.vx = ball.force;
        }
        // Outer Right 1/6
        else {
            ball.vx = ball.force * 5;
        }

        // Move ball above paddle
        ball.y = player1.top() - ball.radius;

        score++;
    }

}
