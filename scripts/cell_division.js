let Cell_Division = {

    animation1: undefined,
    wanderers: [],
    chasers: [],
    spitters: [],
    playerY: 500,
    playerX: 250,
    inertiaX: 0,
    inertiaY: 0,
    mass: 0,

    init: function () {
        let player = document.createElement("div")
        var circle1 = { radius: 20, x: 5, y: 5 };
        this.startAnimation();
        console.log("started animation");

        window.onkeydown = function (event) {
            if (event.keyCode == 77) { //W
                if (inertiaY > -5) {
                    inertiaY -= 1;
                }
            }
            if (event.keyCode == 97) { //A
                if (inertiaX > -5) {
                    inertiaX -= 1;
                }

            }
            if (event.keyCode == 115) { //S
                if (inertiaY < 5) {
                    inertiaY += 1;
                }

            }
            if (event.keyCode == 100) { //D
                if (inertiaX < 5) {
                    inertiaX += 1;
                }

            }
            console.log(this.inertiaX);
            console.log(this.inertiaY);
            console.log("Hello");
        }
    },

    startAnimation: function () {
        this.animation1 = window.setInterval(this.animateGame.bind(Cell_Division), 20);
    },

    animateGame: function () {
        this.moveWanderers();
        this.renderWanderers();
        this.movePlayer();
        this.renderPlayer();
    },

    renderWanderers: function () {

    },

    movePlayer: function () {
    this.playerY += this.inertiaY;
    this.playerX += this.inertiaX;
    console.log(this.inertiaX);
    console.log(this.inertiaY);
    },

    renderPlayer: function () {
        this.player.element.style.top = this.playerX + "px";
        this.player.element.style.left = this.playerY + "px";
        this.player.element.style.height = (this.mass + 5) + "px";
    },

    moveWanderers: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            if (this.wanderers[i].x_pos + (this.wanderers[i].radius * 2) > 590) {
                this.circles[i].x_pos = 590 - this.circles[i].radius * 2;
                this.circles[i].x_velocity = this.circles[i].x_velocity * -1;
            } else if (this.circles[i].x_pos < 0) {
            }
        }
    },

}

Cell_Division.init();