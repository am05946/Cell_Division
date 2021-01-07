let Cell_Division = {

    animation1: undefined,
    wanderers: [],
    chasers: [],
    spitters: [],
    bloodcells: [],
    container: document.getElementById("playing_screen"),
    player: undefined,

    init: function () {                                                       //----- Player Key Press Detection -----//                      
        this.player = this.createPlayer();     //Create player
        //for (i = 0; i > 3; i++) {
        this.wanderers.push(this.createWanderer());     //Create test wanderer
        //}
        window.onkeydown = function (event) {
            if (event.keyCode == 87) {     //W  (Move up)
                this.player.up = true;
                console.log("W was pressed");
            }
            if (event.keyCode == 65) {    //A  (Move left)
                this.player.left = true;
            }
            if (event.keyCode == 83) {    //S  (Move down)
                this.player.down = true;
            }
            if (event.keyCode == 68) {    //D  (Move right)
                this.player.right = true;
            }
            //console.log(this.inertiaX);
            //console.log(this.inertiaY);
            console.log("Test");
        }.bind(Cell_Division);

        window.onkeyup = function (event) {
            if (event.keyCode == 87) {    //!W  (Stop moving Move up)
                this.player.up = false;
                console.log("W was released");
            }
            if (event.keyCode == 65) {    //!A  (Stop moving Move left)
                this.player.left = false;
            }
            if (event.keyCode == 83) {    //!S  (Stop moving Move down)
                this.player.down = false;
            }
            if (event.keyCode == 68) {    //!D  (Stop moving right)
                this.player.right = false;
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
            playerX: 250,
            playerY: 500,
            inertiaX: 0,
            inertiaY: 0,
            maxSpeed: 5,
            friction: 5,
            speed: 5,
            mass: 0,
            right: false,
            down: false,
            left: false,
            up: false,
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
            friction: 1,
            maxSpeed: 5,
            energy: 0,
            maxenergy: Math.random() * 250 + 125,
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
        this.playerMovement();
        this.wanderersDectect();
        this.wanderersMove();
    },

    collision: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            let dx = wanderer.wandererX - this.player.playerX;
            let dy = wanderer.wandererY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < wanderer.mass + this.player.mass + 25) {
                console.log("entity collided with");
            }
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

    wanderersDectect: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            let dx = wanderer.wandererX - this.player.playerX;
            let dy = wanderer.wandererY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            console.log("selected");

            if (distance < wanderer.mass + this.player.mass + 100) {
                console.log("entity detected");

                if (wanderer.mass > this.player.mass) {
                    wanderer.targetX = this.player.playerX;
                    wanderer.targetY = this.player.playerY;
                    //console.log(wanderer.targetX)
                    //console.log(wanderer.targetY)
                }
            }
        }

    },

    wanderersMove: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            if (wanderer.wandererX < wanderer.targetX) {
                if (wanderer.inertiaX < 3) {
                    wanderer.inertiaX = wanderer.inertiaX + 0.5;
                }
            }
            if (wanderer.wandererX > wanderer.targetX) {
                if (wanderer.inertiaX > -3) {
                    wanderer.inertiaX = wanderer.inertiaX - 0.5;
                }
            }
            if (wanderer.wandererY < wanderer.targetY) {
                if (wanderer.inertiaY < 3) {
                    wanderer.inertiaY = wanderer.inertiaY + 0.5;
                }
            }
            if (wanderer.wandererY > wanderer.targetY) {
                if (wanderer.inertiaY > -3) {
                    wanderer.inertiaY = wanderer.inertiaY - 0.5;
                }
            }
            if (wanderer.wanderY - wanderer.TargetY < 50 && wanderer.wanderY - wanderer.TargetY > -50 && wanderer.wanderX - wanderer.TargetX < 50 && wanderer.wanderX - wanderer.TargetX > -50) {
                wanderer.energy = wanderer.energy + 1;
            }
            console.log("energy: " + wanderer.energy);

            if (wanderer.energy >= wanderer.maxenergy) {
                wanderer.targetX = Math.random() * 250 + 125;
                wanderer.targetY = Math.random() * 250 + 125;
                wanderer.energy = 0;
            }
            console.log(wanderer.inertiaY);
            console.log(wanderer.inertiaX);
            console.log(wanderer.wanderX - wanderer.targetX);
        }

    },

    playerMovement: function () {                                     //----- Player Movement -----//

        //The D key
        if (this.player.right == true) {    //Is D held down?
            if (this.player.inertiaX <= this.player.maxSpeed) {    //Speed up if the inertia isn't already at Max
                this.player.inertiaX = this.player.inertiaX + (this.player.speed / this.player.friction);     //Add the inertia to the players speed divided by the players friction
            }
        }
        if (this.player.right == false) {    //If the player isn't holding down D
            while (this.player.inertiaX > 0) {    //Repeat while player inertia is greater than 0 and player is inactive
                this.player.inertiaX = this.player.inertiaX - (this.player.speed / this.player.friction);    //Slowely take away from the inertia when inactive
                if (this.player.inertiaX < 0.01) {    //If the players inertia gets close enough to 0, just set it to 0
                    this.player.inertiaX = 0;
                }
            }
        }

        //The A key
        if (this.player.left == true) {    //Is A held down?
            if (this.player.inertiaX >= -this.player.maxSpeed) {    //Speed up if the inertia isn't already at Max
                this.player.inertiaX = this.player.inertiaX - (this.player.speed / this.player.friction);     //Add the inertia to the players speed divided by the players friction
            }
        }
        if (this.player.left == false) {    //If the player isn't holding down A
            while (this.player.inertiaX < 0) {    //Repeat while player inertia is greater than 0 and player is inactive
                this.player.inertiaX = this.player.inertiaX + (this.player.speed / this.player.friction);    //Slowely take away from the inertia when inactive
                if (this.player.inertiaX > -0.01) {    //If the players inertia gets close enough to 0, just set it to 0
                    this.player.inertiaX = 0;
                }
            }
        }

        //The W key
        if (this.player.up == true) {    //Is W held down?
            console.log("Forward March!");
            if (this.player.inertiaY <= this.player.maxSpeed) {    //Speed up if the inertia isn't already at Max
                console.log("step on the gas");
                this.player.inertiaY = this.player.inertiaY + (this.player.speed / this.player.friction);     //Add the inertia to the players speed divided by the players friction
            }
        }
        if (this.player.up == false) {    //If the player isn't holding down W
            while (this.player.inertiaY > 0) {    //Repeat while player inertia is greater than 0 and player is inactive
                this.player.inertiaY = this.player.inertiaY - (this.player.speed / this.player.friction);    //Slowely take away from the inertia when inactive
                if (this.player.inertiaY < 0.01) {    //If the players inertia gets close enough to 0, just set it to 0
                    this.player.inertiaY = 0;
                }
            }
        }

        //The S key
        if (this.player.down == true) {    //Is S held down?
            if (this.player.inertiaY >= -this.player.maxSpeed) {    //Speed up if the inertia isn't already at Max
                this.player.inertiaY = this.player.inertiaY - (this.player.speed / this.player.friction);     //Add the inertia to the players speed divided by the players friction
            }
        }
        if (this.player.down == false) {    //If the player isn't holding down S
            while (this.player.inertiaY < 0) {    //Repeat while player inertia is greater than 0 and player is inactive
                this.player.inertiaY = this.player.inertiaY + (this.player.speed / this.player.friction);    //Slowely take away from the inertia when inactive
                if (this.player.inertiaY > -0.01) {    //If the players inertia gets close enough to 0, just set it to 0
                    this.player.inertiaY = 0;
                }
            }
        }

        if (this.player.playerY >= 770 || this.player.playerY <= 0) {     //Bounce on ceiling and floor
            this.player.inertiaY = this.player.inertiaY * -1;
        }
        if (this.player.playerX >= 1770 || this.player.playerX <= 0) {     //Bounce on both walls
            this.player.inertiaX = this.player.inertiaX * -1;
        }
    },

    moveEntities: function () {
        //player
        this.player.playerY = this.player.playerY - this.player.inertiaY;
        this.player.playerX = this.player.playerX + this.player.inertiaX;
        console.log(this.player.playerX);
        console.log(this.player.playerY);

        //wanderers
        for (let i = 0; i < this.wanderers.length; i++) {
            this.wanderers[i].wandererY = this.wanderers[i].wandererY + this.wanderers[i].inertiaY;
            this.wanderers[i].wandererX = this.wanderers[i].wandererX + this.wanderers[i].inertiaX;
        }

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
            this.wanderers[i].element.style.top = this.wanderers[i].wandererY + "px";
            this.wanderers[i].element.style.left = this.wanderers[i].wandererX + "px";
            this.wanderers[i].element.style.height = (this.wanderers[i].mass + 25) + "px";
            this.wanderers[i].element.style.width = (this.wanderers[i].mass + 25) + "px";
        }

        //chasers
    },

}

Cell_Division.init();