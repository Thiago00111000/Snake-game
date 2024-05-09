//import './style.css';
//import {resources} from "resource.js";

class resources {
    constructor(){
        //para baixar
        this.toLoad = {
            background: "./Images/background.jpg",
        };
        //lista de assets
        this.images = {};
        Object.keys(this.images).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onLoad = () => {
                this.images[key].isLoaded = true
            }
        });
    }
}

//------//

canvas = document.getElementById('grid');
const ctx = canvas.getContext("2d");

const draw = () => {
    const background = resources.images.background;
        if (background.isLoaded){
        ctx.drawImage(background.image, 0, 0)
        }
}

setInterval(()  => {
    draw();
}, 300);