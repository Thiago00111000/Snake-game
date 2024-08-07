//cria tela e assets
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const audio1 = new Audio('assets/pickupCoin.wav');
const audio2 = new Audio('assets/hitHurt.wav');
const audio3 = new Audio('assets/blipSelect.wav');

//pontuação e menu
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen")
const button = document.querySelector(".button-play");

const scoring = () => {
    score.innerText = parseInt(score.innerText) + 10
}

//cobra
const size = 30;
let snake = [
    {x: 120, y: 300},
    {x: 150, y: 300}
]

let direction,loopId

const drawSnake = () => {
    ctx.fillStyle = "lightgrey"
    snake.forEach((position, index)=>{
        if(index == snake.length - 1 ){
            ctx.fillStyle = "white"
        }
        ctx.fillRect(position.x,position.y, size, size)
    })
}

const moveSnake = () => {
    if(!direction) return
    const head = snake[snake.length - 1]

    snake.shift()
    
    if (direction == "right"){
        snake.push({x: head.x + size , y: head.y})
    }
    if (direction == "left"){
        snake.push({x: head.x - size , y: head.y})
    }if (direction == "up"){
        snake.push({x: head.x , y: head.y - size})
    }if (direction == "down"){
        snake.push({x: head.x , y: head.y + size})
    }
}


//comida
const randomNumber = (min, max) =>{
    return Math.round(Math.random() *  (max - min) + min)
}

const randomPosition = () =>{
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)
    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

const drawFood = () =>{
    const {x, y, color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.fillStyle = color
    ctx.fillRect (x, y, size, size )
    ctx.shadowBlur = 0 
}

//regras do jogo
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30){
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
    
}

const eat = () =>{
    const head = snake[snake.length - 1]
    
    if (head.x == food.x && head.y == food.y){
        scoring()
        snake.push(head)
        audio1.play()

        let x = randomPosition()
        let y = randomPosition()
        
        while(snake.find((position)=> position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

const collision = () =>{
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2
    
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
    
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })
    
    if(wallCollision || selfCollision){
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined
    audio2.play()
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
    loop() = false
}

const loop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    eat()
    collision()
    
    loopId = setTimeout(() => {
        loop()         
    }, 250);
}

loop()

//controles
document.addEventListener("keydown", ({key}) => {
    if(key == "w" && direction  !=  "down"){
        direction = "up"
    }
    if(key == "s" && direction  !=  "up"){
        direction = "down"
    }
    if(key == "a" && direction  !=  "right"){
        direction = "left"
    }
    if(key == "d" && direction  !=  "left"){
        direction = "right"
    }
})

button.addEventListener("click", () => {
    audio3.play()
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    snake = [
    {x: 120, y: 300},
    {x: 150, y: 300}
    ]
    direction = undefined
    loop() = true
})

//canvas.style.filter = "grayscale(100%)"