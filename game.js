var canvas, context; 
var player1, ball; 
var timer, interval = 1000/60;
var score = 0;

canvas = document.getElementById("canvas")
context = canvas.getContext("2d")


player1 = new GameObject(canvas.width/2,750,30,200,"#b700ff")

ball = new GameObject(canvas.width/2,canvas.height/2,5,10,"#0004ff");
ball.radius = 25;
ball.vx = 0;
ball.vy = 0;

timer = setInterval(animate, interval);


function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);


    player1.drawRect();
    ball.drawCircle();
    ball.move();

    


////// OBJECT MOVEMENT //////

    // Player Movement
    if(a)
    {
        player1.x -= 5;
    }

    if(d)
    {
        player1.x += 5;
    }

  
    if (player1.x < player1.width / 2) {
        player1.x = player1.width / 2;
    }

    if (player1.x > canvas.width - player1.width / 2) {
        player1.x = canvas.width - player1.width / 2;
    }
    

////// COLLISION //////

// Collision With Canvas

    // Right Side
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.vx *= -1;
        ball.vy *= 0;
    }

    // Left Side
    if (ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.vx *= -1;
        ball.vy *= 0;
    }

    // Top Side
    if (ball.y + ball.radius > canvas.height) {
        ball.vy *= -1;
    }

    // Bottom Side
    if (ball.y - ball.radius < 0) {
        ball.vy *= -1;
    }


// Collision With Paddles 

    // PADDLE 1
    if(ball.x - ball.radius < player1.x + player1.width / 2)
    {
        // When ball is colliding with paddle
        if(ball.y > player1.y - player1.height/2 &&
            ball.y < player1.y + player1.height/2)
        {
            // If ball hits TOP
            if(ball.y < player1.y - player1.height/6)
            {
                ball.vx = 5;   // positive speed
                ball.vy = -5;  // negative speed
            }

            // If ball hits MIDDLE
            else if(ball.y < player1.y - player1.height/3)
            {
                ball.vx = 5;   // positive speed
                ball.vy = 0;  // negative speed
            }

            // If ball hits BOTTOM
            else
            {
                ball.vx = 5;   // positive speed
                ball.vy = 5;  // negative speed
            }
        }
    }
}