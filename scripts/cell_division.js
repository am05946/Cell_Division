let Cell_Division = {

    animation1: undefined,
    wanderers: [],
    chasers: [],
    spitters: [],
    bloodcells: [],
    container: document.getElementById("playing_screen"),
    player: undefined,

    init: function () {
        //this.wanderers.push(this.createWanderer());
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

    createPlayer: function () {
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

    createWanderer: function () {
        let wanderdiv = document.createElement("div");
        wanderdiv.className = "wanderer";
        this.container.append(wanderdiv);
        let wanderer = {
            mass: Math.random() * 10,
            wandererX: Math.random() * 250 + 125,
            wandererY: Math.random() * 500 + 125,
            inertiaX: 0,
            inertiaY: 0,
            targetX: Math.random() * 250 + 125,
            targetY: Math.random() * 500 + 125,
            element: wanderdiv,
        }
        return wanderer;
    },

    startAnimation: function () {
        this.animation1 = window.setInterval(this.animateGame.bind(Cell_Division), 20);
    },

    animateGame: function () {
        this.moveEntities();
        this.renderEntities();
        this.challengeInertia();
        this.collision();
    },
    Collision: function () {
            if (this.player + this.player.radius * 2 > 590) {
              this.player.x_pos = 590 - this.player.radius * 2
              this.player.x_velocity = this.player.x_velocity * -1
            } else if (this.player.x_pos < 0) {
              this.player.x_pos = 0
              this.player.x_velocity = this.player.x_velocity * -1
            }
            if (this.player.y_pos + this.player.radius * 2 > 590) {
              this.player.y_pos = 590 - this.player.radius * 2
              this.player.y_velocity = this.player.y_velocity * -1
            } else if (this.player.y_pos < 0) {
              this.player.y_pos = 0
              this.player.y_velocity = this.player.y_velocity * -1
            }
          },

    challengeInertia: function () {
        if (this.player.inertiaY > 0) {
            this.player.inertiaY -= 0.05;
        }
        if (this.player.inertiaX > 0) {
            this.player.inertiaX -= 0.05;
        }
        if (this.player.inertiaY < 0) {
            this.player.inertiaY += 0.05;
        }
        if (this.player.inertiaX < 0) {
            this.player.inertiaX += 0.05;

        }
    },

    WanderersDectect: function () {
        for(let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            for(let j = 0; j < this.wanderers.length; j++) {
              let dx = wanderer.wandererX - this.wanderers[j].wandererX;
              let dy = wanderer.wandererY - this.wanderers[j].wandererY;
              let distance = Math.sqrt(dx * dx + dy * dy);
      
              if (distance < wanderer.mass + this.wanderers[j].mass) {
                console.log("entity detected");
      
                if (wanderer.mass > this.wanderers[j].mass) {
                    wanderer.targetX = this.wanderers[j].wandererX;
                    wanderer.targetY = this.wanderers[j].wandererY;
                    this.wanderers[j].inertiaX = this.wanderers[j].inertiaX/2;
                    this.wanderers[j].inertiaY = this.wanderers[j].inertiaY/2;
                }
              }
            }
          }

    },

    moveEntities: function () {
        //player
        this.player.playerY = this.player.playerY + this.player.inertiaY;
        this.player.playerX = this.player.playerX + this.player.inertiaX;
        console.log(this.player.playerX);
        console.log(this.player.playerY);

        //wanderers
        this.wanderers.wandererY = this.wanderers.wandererY + this.wanderers.inertiaY;
        this.wanderers.wandererX = this.wanderers.wandererX + this.wanderers.inertiaX;

        //chasers
    },

    renderEntities: function () {
        //player
        this.player.element.style.top = this.player.playerY + "px";
        this.player.element.style.left = this.player.playerX + "px";
        this.player.element.style.height = (this.player.mass + 25) + "px";
        this.player.element.style.width = (this.player.mass + 25) + "px";

        //wanderers
        for (let i = 0; i < this.wanderers.length; i++) {
            this.wanderers[i].element.style.top = this.wanderers[i].y_pos + "px";
            this.wanderers[i].element.style.left = this.wanderers[i].x_pos + "px";
            this.wanderers[i].element.style.height = (this.wanderers.mass + 25) + "px";
            this.wanderers[i].element.style.width = (this.wanderers.mass + 25) + "px";
          }

        //chasers
    },

}

Cell_Division.init();