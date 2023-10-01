const stage = document.getElementById("stage");
const num_balls = document.getElementById("num_balls");
const txt_qtde = document.getElementById("txt_qtde");
const btn_add = document.getElementById("btn_add");
const btn_remove = document.getElementById("btn_remove");

let widthStage = stage.offsetWidth;
let heightStage = stage.offsetHeight;
let balls = [];
let numBall = 0;

class Ball {
    constructor(arrayBalls, stage) {
        this.tam = Math.floor(Math.random() * 10) + 10;
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
        this.px = Math.floor(Math.random() * (widthStage - this.tam));
        this.py = Math.floor(Math.random() * (heightStage - this.tam));
        this.velx = Math.floor(Math.random() * 2) + 0.5;
        this.vely = Math.floor(Math.random() * 2) + 0.5;
        this.dirx = Math.random() * 10 > 5 ? 1 : -1;
        this.diry = Math.random() * 10 > 5 ? 1 : -1;
        this.stage = stage;
        this.arrayBalls = arrayBalls;
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000);
        this.draw();
        this.controlInterval = setInterval(this.control, 10);
        this.eu = document.getElementById(this.id);
        numBall++;
        num_balls.innerHTML = numBall;
    }
    minhaPos = () => {
        return this.arrayBalls.indexOf(this);
    }
    remove = () => {
        clearInterval(this.controlInterval);
        balls = balls.filter((b) => {
            if (b.id != this.id) {
                return b;
            }
        });
        this.eu.remove();
        numBall--;
        num_balls.innerHTML = numBall;
    }
    draw = () => {
        const div = document.createElement("div");
        div.setAttribute("id", this.id);
        div.setAttribute("class", "ball");
        div.setAttribute("style", `left: ${this.px}px; top: ${this.py}px; width: ${this.tam}px; height: ${this.tam}px; background-color: rgb(${this.r},${this.g},${this.b})`);
        this.stage.appendChild(div);
    }

    collisionBorder = () => {
        if (this.px + this.tam >= widthStage) {
            this.dirx = -1;
        } else if (this.px <= 0) {
            this.dirx = 1;
        }
        if (this.py + this.tam >= heightStage) {
            this.diry = -1;
        } else if (this.py <= 0) {
            this.diry = 1;
        }
    }
    control = () => {
        this.collisionBorder();
        this.px += this.velx * this.dirx;
        this.py += this.vely * this.diry;
        this.eu.setAttribute("style", `left: ${this.px}px; top: ${this.py}px; width: ${this.tam}px; height: ${this.tam}px; background-color: rgb(${this.r},${this.g},${this.b})`);
        if ((this.px > widthStage) || (this.py > heightStage)) {
            this.remove();
        }
    }
}

window.addEventListener("resize", (evt) => {
    heightStage = stage.offsetWidth;
    widthStage = stage.offsetHeight;
});
btn_add.addEventListener("click", (evt) => {
    const qtde = txt_qtde.value;
    for (let i = 0; i < qtde; i++) {
        balls.push(new Ball(balls, stage));
    }
});
btn_remove.addEventListener("click", (evt) => {
    balls.map((b) => {
        b.remove();
    });
});
