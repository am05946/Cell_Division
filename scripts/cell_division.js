let Cell_Division = {

    animation1: undefined,
    wanderers: [],
    chasers: [],
    spitters: [],
    powers: [],
    wanderzone: document.getElementById("wander_zone"),
    splitzone: document.getElementById("split_zone"),
    chaserzone: document.getElementById("chaser_zone"),
    startbutton: document.getElementById("start_button"),
    container: document.getElementById("playing_screen"),
    player: undefined,
    usedTime: 0,
    frameTime: 0,


    init: function () {                                                       //----- Player Key Press Detection -----//                      
        this.player = this.createPlayer();     //Create player
        for (let i = 0; i < 3; i++) {
            this.powers.push(this.createPower())
        }
        

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

        this.startbutton.onclick = function (event) {
            this.startGame();
            event.target.style.color = "rgba(40, 0, 0, " + (i/100) + ")";
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

    },

    startGame: function () {
        this.startAnimation();
        console.log("started animation");
        this.powers[1].powerY = 285;
        this.powers[2].powerY = 495;
        this.powers[1].powerX = this.powers[1].powerX - 25;
        this.powers[2].powerX = this.powers[2].powerX - 50
        this.powers[1].mass = 100;
        this.powers[2].mass = 150;
        },

    createPlayer: function () {
        let playerdiv = document.createElement("div");
        playerdiv.className = "player";
        this.container.append(playerdiv);
        let player = {
            playerX: 250,
            playerY: 350,
            inertiaX: 0,
            inertiaY: 0,
            maxSpeed: 5,
            friction: 5,  //DO NOT TURN THIS TO A NEGATIVE VALUE (Or really any value below 1)
            speed: 5,
            mass: 5,
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
            mass: Math.random() * 50,
            wandererX: Math.random() * 250 + 125,
            wandererY: Math.random() * 500 + 125,
            inertiaX: 0,
            inertiaY: 0,
            friction: 1,
            maxSpeed:  Math.random() * 1 + 2,
            energy: 0,
            maxenergy: Math.random() * 250 + 125,
            targetX: Math.random() * 250 + 125,
            targetY: Math.random() * 500 + 125,
            element: wanderdiv,
        }
        return wanderer;
    },

    createChaser: function () {
        let chaserdiv = document.createElement("div");
        chaserdiv.className = "chaser";
        this.container.append(chaserdiv);
        let chaser = {
            mass: Math.random() * 50,
            chaserX: Math.random() * 250 + 125,
            chaserY: Math.random() * 500 + 125,
            inertiaX: 0,
            inertiaY: 0,
            friction: 1,
            maxSpeed:  Math.random() * 1 + 3,
            energy: 0,
            maxenergy: Math.random() * 250 + 100,
            targetX: Math.random() * 250 + 125,
            targetY: Math.random() * 500 + 125,
            element: chaserdiv,
        }
        return chaser;
    },

    createPower: function () {
        let powerdiv = document.createElement("div");
        powerdiv.className = "power";
        this.container.append(powerdiv);
        let power = {
            mass: 50,
            powerX: 1345,
            powerY: 75,
            element: powerdiv,
        }
        return power;
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
        this.chasersMove();
        this.chasersDectect();
        this.addTime();
        this.fade();
        //this.player.mass = this.player.mass + 1;
    },

    fade: function () {
        if (this.usedTime < 3.1) {
            this.startbutton.style.color = "rgba(0, 122, 170, " + (1 - this.usedTime/3) + ")";
            this.startbutton.style.backgroundColor = "rgba(0, 70, 100, " + (1 - this.usedTime/3) + ")";
            this.startbutton.style.borderTopColor = "rgba(0, 95, 136, " + (1 - this.usedTime/3) + ")";
            this.startbutton.style.borderLeftColor = "rgba(0, 95, 136, " + (1 - this.usedTime/3) + ")";
            this.startbutton.style.borderRightColor = "rgba(0, 50, 71, " + (1 - this.usedTime/3) + ")";
            this.startbutton.style.borderBottomColor = "rgba(0, 50, 71, " + (1 - this.usedTime/3) + ")";
        }
        if (this.usedTime < 3.1) {
            this.player.element.style.backgroundColor = "rgba(255, 255, 255, " + (this.usedTime/3) + ")";
            this.player.element.style.border = "3px solid rgba(0, 0, 0, " + (this.usedTime/3) + ")";
            this.wanderzone.style.backgroundColor = "rgba(0,255,0, " + (this.usedTime/10) + ")";
            this.wanderzone.style.border = "3px dashed rgba(0,255,0, " + (this.usedTime/6) + ")";
            this.splitzone.style.backgroundColor = "rgba(255,255,0, " + (this.usedTime/10) + ")";
            this.splitzone.style.border = "3px dashed rgba(255,255,0, " + (this.usedTime/6) + ")";
            this.chaserzone.style.backgroundColor = "rgba(255,0,0, " + (this.usedTime/10) + ")";
            this.chaserzone.style.border = "3px dashed rgba(255,0,0, " + (this.usedTime/6) + ")";
        }
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
        for (let i = 0; i < this.chasers.length; i++) {
            let chaser = this.chasers[i];
            let dx = chaser.chaserX - this.player.playerX;
            let dy = chaser.chaserY - this.player.playerY;
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

    addTime: function () {
        this.frameTime = this.frameTime + 1;
        this.usedTime = this.frameTime/40;
        console.log("Time passed: " + this.usedTime);
        console.log("Real time passed: " + this.frameTime);
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

                if (wanderer.mass > this.player.mass + 2) {
                    wanderer.targetX = this.player.playerX;
                    wanderer.targetY = this.player.playerY;
                    //console.log(wanderer.targetX)
                    //console.log(wanderer.targetY)
                }
            }
        }

    },

    chasersDectect: function () {
        for (let i = 0; i < this.chasers.length; i++) {
            let chaser = this.chasers[i];
            let dx = chaser.chaserX - this.player.playerX;
            let dy = chaser.chaserY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            console.log("selected");

            if (distance < chaser.mass + this.player.mass + 200) {
                console.log("entity detected");

                if (chaser.mass > this.player.mass + 2) {
                    chaser.targetX = this.player.playerX;
                    chaser.targetY = this.player.playerY;
                    //console.log(chaser.targetX)
                    //console.log(chaser.targetY)
                }
            }
        }

    },

    wanderersMove: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            if (wanderer.wandererX < wanderer.targetX) {
                if (wanderer.inertiaX < wanderer.maxSpeed) {
                    wanderer.inertiaX = wanderer.inertiaX + 0.5;
                }
            }
            if (wanderer.wandererX > wanderer.targetX) {
                if (wanderer.inertiaX > -wanderer.maxSpeed) {
                    wanderer.inertiaX = wanderer.inertiaX - 0.5;
                }
            }
            if (wanderer.wandererY < wanderer.targetY) {
                if (wanderer.inertiaY < wanderer.maxSpeed) {
                    wanderer.inertiaY = wanderer.inertiaY + 0.5;
                }
            }
            if (wanderer.wandererY > wanderer.targetY) {
                if (wanderer.inertiaY > -wanderer.maxSpeed) {
                    wanderer.inertiaY = wanderer.inertiaY - 0.5;
                }
            }
            if (wanderer.wandererY - wanderer.targetY < 50 && wanderer.wandererY - wanderer.targetY > -50 && wanderer.wandererX - wanderer.targetX < 50 && wanderer.wandererX - wanderer.targetX > -50) {
                wanderer.energy = wanderer.energy + 1;
            }
            console.log("energy: " + wanderer.energy);

            if (wanderer.energy >= wanderer.maxenergy) {
                wanderer.targetX = Math.random() * (1450 - (wanderer.mass * 2)) + wanderer.mass;                 //HERE Math.random() *
                wanderer.targetY = Math.random() * (660 - (wanderer.mass * 2)) + wanderer.mass;                  //HERE Math.random() * 
                wanderer.energy = 0;
            }
            console.log(wanderer.inertiaY);
            console.log(wanderer.inertiaX);
            console.log(wanderer.targetX)
            console.log(wanderer.wanderX - wanderer.targetX);
        }

    },

    chasersMove: function () {
        for (let i = 0; i < this.chasers.length; i++) {
            let chaser = this.chasers[i];
            if (chaser.chaserX < chaser.targetX) {
                if (chaser.inertiaX < chaser.maxSpeed) {
                    chaser.inertiaX = chaser.inertiaX + 1;
                }
            }
            if (chaser.chaserX > chaser.targetX) {
                if (chaser.inertiaX > -chaser.maxSpeed) {
                    chaser.inertiaX = chaser.inertiaX - 1;
                }
            }
            if (chaser.chaserY < chaser.targetY) {
                if (chaser.inertiaY < chaser.maxSpeed) {
                    chaser.inertiaY = chaser.inertiaY + 1;
                }
            }
            if (chaser.chaserY > chaser.targetY) {
                if (chaser.inertiaY > -chaser.maxSpeed) {
                    chaser.inertiaY = chaser.inertiaY - 1;
                }
            }
            if (chaser.chaserY - chaser.targetY < 50 && chaser.chaserY - chaser.targetY > -50 && chaser.chaserX - chaser.targetX < 50 && chaser.chaserX - chaser.targetX > -50) {
                chaser.energy = chaser.energy + 1;
            }
            console.log("chaser energy: " + chaser.energy);

            if (chaser.energy >= chaser.maxenergy) {
                chaser.targetX = Math.random() * (1450 - (chaser.mass * 2)) + chaser.mass;                 //HERE Math.random() *
                chaser.targetY = Math.random() * (660 - (chaser.mass * 2)) + chaser.mass;                  //HERE Math.random() * 
                chaser.energy = 0;
            }
            console.log(chaser.inertiaY);
            console.log(chaser.inertiaX);
            console.log(chaser.targetX)
            console.log(chaser.wanderX - chaser.targetX);
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

        if (this.player.playerY >= 665 || this.player.playerY <= 0) {     //Bounce on ceiling and floor
            this.player.inertiaY = this.player.inertiaY * -1;
        }
        if (this.player.playerX >= 1465 || this.player.playerX <= 0) {     //Bounce on both walls
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
        for (let i = 0; i < this.chasers.length; i++) {
            this.chasers[i].chaserY = this.chasers[i].chaserY + this.chasers[i].inertiaY;
            this.chasers[i].chaserX = this.chasers[i].chaserX + this.chasers[i].inertiaX;
        }
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
            if (this.wanderers[i].mass < this.player.mass - 2 ) {
                this.wanderers[i].element.style.border = "3px solid rgb(0, 0, 40)";

            } else if (this.wanderers[i].mass > this.player.mass + 2 ) {
                this.wanderers[i].element.style.border = "3px solid rgb(40, 0, 0)";
            } else {
                this.wanderers[i].element.style.border = "3px solid rgb(0, 0, 0)";
            }
        }

        //chasers
        for (let i = 0; i < this.chasers.length; i++) {
            this.chasers[i].element.style.top = this.chasers[i].chaserY + "px";
            this.chasers[i].element.style.left = this.chasers[i].chaserX + "px";
            this.chasers[i].element.style.height = (this.chasers[i].mass + 25) + "px";
            this.chasers[i].element.style.width = (this.chasers[i].mass + 25) + "px";
            if (this.chasers[i].mass < this.player.mass - 2 ) {
                this.chasers[i].element.style.border = "3px solid rgb(0, 0, 40)";

            } else if (this.chasers[i].mass > this.player.mass + 2 ) {
                this.chasers[i].element.style.border = "3px solid rgb(40, 0, 0)";
            } else {
                this.chasers[i].element.style.border = "3px solid rgb(0, 0, 0)";
            }
        }
        //power cells
        for (let i = 0; i < this.powers.length; i++) {
            this.powers[i].element.style.top = this.powers[i].powerY + "px";
            this.powers[i].element.style.left = this.powers[i].powerX + "px";
            this.powers[i].element.style.height = (this.powers[i].mass + 25) + "px";
            this.powers[i].element.style.width = (this.powers[i].mass + 25) + "px";
            if (this.powers[i].mass < this.player.mass - 2 ) {
                this.powers[i].element.style.border = "3px solid rgb(0, 0, 40)";

            } else if (this.powers[i].mass > this.player.mass + 2 ) {
                this.powers[i].element.style.border = "3px solid rgb(40, 0, 0)";
            } else {
                this.powers[i].element.style.border = "3px solid rgb(0, 0, 0)";
            }
        }
    },

}

Cell_Division.init();