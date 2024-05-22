//import './style.css';

//------//

const canvas = document.getElementById('grid');
const ctx = canvas.getContext("2d");

const size = 30;
const snake = [
    {x: 300, y: 300},
    {x: 330, y: 300},
    {x: 360, y: 300},
    {x: 390, y: 300},
    {x: 420, y: 300}
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

const loop = () => {
    clearInterval(loopId)
    ctx.clearRect(0,0,600,600)
    moveSnake()
    drawSnake()
    
    loopId = setTimeout(() => {
        loop()         
    }, 300);
}

loop()

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
//cronometro