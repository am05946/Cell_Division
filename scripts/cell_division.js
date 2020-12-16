let Cell_Division = {

    animation1: undefined,
    wanderers: [],
    chasers: [],
    spitters: [],
    container: document.getElementById("playing_screen"),
    player: undefined,

    init: function () {
        this.player = this.createPlayer();
        window.onkeydown = function (event) {
            if (event.keyCode == 87) { //W
                if (this.player.inertiaY > -5) {
                    this.player.inertiaY -= 1;
                }
            }
            if (event.keyCode == 65) { //A
                if (this.player.inertiaX > -5) {
                    this.player.inertiaX -= 1;
                }

            }
            if (event.keyCode == 83) { //S
                if (this.player.inertiaY < 5) {
                    this.player.inertiaY += 1;
                }

            }
            if (event.keyCode == 68) { //D
                console.log(event.keyCode);
                if (this.player.inertiaX < 5) {
                    this.player.inertiaX += 1;
                    console.log("D");
                    console.log(this.player.inertiaX);
                }

            }
            //console.log(this.inertiaX);
            //console.log(this.inertiaY);
            console.log("Test");
        }.bind(Cell_Division);

        this.startAnimation();
        console.log("started animation");

        
    },

    createPlayer: function() {
        let playerdiv = document.createElement("div");
        playerdiv.className = "player";
        this.container.append(playerdiv);
        let player = {
          mass: 0,
          playerX: 250,
          playerY: 500,
          inertiaX: 0,
          inertiaY: 0,
          element: playerdiv,
        }
        return player;
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
    this.player.playerY = this.player.playerY + this.player.inertiaY;
    this.player.playerX = this.player.playerX + this.player.inertiaX;
    console.log(this.player.playerX);
    console.log(this.player.playerY);
    },

    renderPlayer: function () {
        this.player.element.style.top = this.player.playerY + "px";
        this.player.element.style.left = this.player.playerX + "px";
        this.player.element.style.height = (this.player.mass + 15) + "px";
        this.player.element.style.width = (this.player.mass + 15) + "px";
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