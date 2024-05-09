class resources {
    constructor(){
        //para baixar
        this.toLoad = {
            background: "/images/background.jpg"
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

export const resources = new resources();