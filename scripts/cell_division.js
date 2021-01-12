let Cell_Division = {

    animation1: undefined,
    player: undefined,
    wanderers: [],
    chasers: [],
    spitters: [],
    powers: [],
    wanderzone: document.getElementById("wander_zone"),
    splitzone: document.getElementById("split_zone"),
    chaserzone: document.getElementById("chaser_zone"),
    startbutton: document.getElementById("start_button"),
    container: document.getElementById("playing_screen"),
    tutorialText: document.getElementById("tutorial"),
    usedTime: 0,
    frameTime: 0,
    gamestart: false,


    init: function () {                                                       //----- Player Key Press Detection -----//                      
        this.player = this.createPlayer();     //Create player
        for (let i = 0; i < 3; i++) {
            this.powers.push(this.createPower())
        }


        window.onkeydown = function (event) {
            if (event.keyCode == 87) {     //W  (Move up)
                this.player.up = true;
                //console.log("W was pressed");
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
            //console.log("Test");
        }.bind(Cell_Division);

        this.startbutton.onclick = function (event) {
            if (this.gamestart == false) {
                this.startGame();
                this.gamestart = true;
            }
        }.bind(Cell_Division);

        window.onkeyup = function (event) {
            if (event.keyCode == 87) {    //!W  (Stop moving Move up)
                this.player.up = false;
                //console.log("W was released");
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
            //console.log("Test");
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
            friction: 7,  //DO NOT TURN THIS TO A NEGATIVE VALUE (Or really any value below 1)
            speed: 0.4,
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
            mass: Math.random() * 35,
            wandererX: this.powers[0].powerX,
            wandererY: this.powers[0].powerY,
            inertiaX: 0,
            inertiaY: 0,
            friction: 1,
            maxSpeed: Math.random() * 2 + 1,
            energy: 0,
            eaten: false,
            maxenergy: Math.random() * 250 + 125,
            targetX: Math.random() * 1300,
            targetY: Math.random() * 660,
            element: wanderdiv,
        }
        return wanderer;
    },

    createChaser: function () {
        let chaserdiv = document.createElement("div");
        chaserdiv.className = "chaser";
        this.container.append(chaserdiv);
        let chaser = {
            mass: Math.random() * 85,
            chaserX: this.powers[1].powerX,
            chaserY: this.powers[1].powerY,
            inertiaX: 0,
            inertiaY: 0,
            friction: 1,
            maxSpeed: Math.random() * 2.5 + 1,
            energy: 0,
            eaten: false,
            maxenergy: Math.random() * 250 + 25,
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
        this.wanderersDetect();
        this.wanderersMove();
        this.chasersMove();
        this.chasersDetect();
        this.addTime();
        this.fade();
        this.spawners();
        //this.player.mass = this.player.mass + 0.5;
    },

    spawners: function () {
        if (this.usedTime > 111) {
            if (this.player.mass < 75) {
                let random = Math.ceil(Math.random() * 3);
                if (this.usedTime % 10 == 0 && random <= 2) {
                    this.wanderers.push(this.createWanderer());
                } else if (this.usedTime % 10 == 0 && random == 3) {
                    this.chasers.push(this.createChaser());
                }
            }
        }
    },

    fade: function () {
        if (this.usedTime < 3.1) {
            this.startbutton.style.color = "rgba(0, 122, 170, " + (1 - this.usedTime / 3) + ")";
            this.startbutton.style.backgroundColor = "rgba(0, 70, 100, " + (1 - this.usedTime / 3) + ")";
            this.startbutton.style.borderTopColor = "rgba(0, 95, 136, " + (1 - this.usedTime / 3) + ")";
            this.startbutton.style.borderLeftColor = "rgba(0, 95, 136, " + (1 - this.usedTime / 3) + ")";
            this.startbutton.style.borderRightColor = "rgba(0, 50, 71, " + (1 - this.usedTime / 3) + ")";
            this.startbutton.style.borderBottomColor = "rgba(0, 50, 71, " + (1 - this.usedTime / 3) + ")";
            this.player.element.style.backgroundColor = "rgba(255, 255, 255, " + (this.usedTime / 3) + ")";
            this.player.element.style.border = "3px solid rgba(0, 0, 0, " + (this.usedTime / 3) + ")";
            this.wanderzone.style.backgroundColor = "rgba(0,255,0, " + (this.usedTime / 10) + ")";
            this.wanderzone.style.border = "3px dashed rgba(0,255,0, " + (this.usedTime / 6) + ")";
            this.splitzone.style.backgroundColor = "rgba(255,255,0, " + (this.usedTime / 10) + ")";
            this.splitzone.style.border = "3px dashed rgba(255,255,0, " + (this.usedTime / 6) + ")";
            this.chaserzone.style.backgroundColor = "rgba(255,0,0, " + (this.usedTime / 10) + ")";
            this.chaserzone.style.border = "3px dashed rgba(255,0,0, " + (this.usedTime / 6) + ")";
            for (i = 0; i < this.powers.length; i++) {
                this.powers[i].element.style.backgroundColor = "rgba(6, 15, 20, " + (this.usedTime / 3) + ")";
                this.powers[i].element.style.border = "3px solid rgba(40, 0, 0, " + (this.usedTime / 3) + ")";
            }

        }
        if (this.usedTime > 3 && this.usedTime < 6.1) {                                               //Starting Tutorial// (Remember to make a skip button if we have time.)
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 3) / 3) + ")";
        }
        if (this.usedTime > 9 && this.usedTime < 12.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 9) / 3) + ")";
        }
        if (this.usedTime > 12 && this.usedTime < 15.1) {
            document.getElementById("tutorial").innerHTML = "<h2>You are a white blood cell</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 12) / 3) + ")";
        }
        if (this.usedTime > 18 && this.usedTime < 21.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 18) / 3) + ")";
        }
        if (this.usedTime > 21 && this.usedTime < 24.1) {
            document.getElementById("tutorial").innerHTML = "<h2>and your job is to eliminate viruses.</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 21) / 3) + ")";
        }
        if (this.usedTime > 27 && this.usedTime < 30.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 27) / 3) + ")";
        }
        if (this.usedTime > 30 && this.usedTime < 33.1) {
            document.getElementById("tutorial").innerHTML = "<h2>Here comes one now.</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 30) / 3) + ")";
        }
        if (this.usedTime == 33) {
            this.wanderers.push(this.createWanderer());
            this.wanderers[0].mass = 4;
        }
        if (this.usedTime > 36 && this.usedTime < 39.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 36) / 3) + ")";
        }
        if (this.usedTime > 39 && this.usedTime < 42.1) {
            document.getElementById("tutorial").innerHTML = "<h2>This virus has a black outline as it is around your size.</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 39) / 3) + ")";
        }
        if (this.usedTime > 42 && this.usedTime < 45.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 42) / 3) + ")";
        }
        if (this.usedTime > 45 && this.usedTime < 48.1) {
            document.getElementById("tutorial").innerHTML = "<h2>Viruses bigger than you will have a <red>red</red> outline</h2> <h2>while viruses smaller than you will have a <blue>blue</blue> outline</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 45) / 3) + ")";
        }
        if (this.usedTime > 51 && this.usedTime < 54.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 51) / 3) + ")";
        }
        if (this.usedTime > 54 && this.usedTime < 57.1) {
            document.getElementById("tutorial").innerHTML = "<h2>You can consume viruses with a <blue>blue</blue> outline</h2> <h2>and viruses with a <red>red</red> outline can consume you</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 54) / 3) + ")";
        }
        if (this.usedTime > 60 && this.usedTime < 63.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 60) / 3) + ")";
        }
        if (this.usedTime > 63 && this.usedTime < 66.1) {
            document.getElementById("tutorial").innerHTML = "<h2>Try to consume this <blue>blue</blue> one here</h2> <h2>(and avoid the big <red>red</red> one)</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 63) / 3) + ")";
        }
        if (this.usedTime > 69 && this.usedTime < 72.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 69) / 3) + ")";
        }
        if (this.usedTime == 64) {
            this.wanderers.push(this.createWanderer());
            this.wanderers[1].mass = 2;
        }
        if (this.usedTime == 67) {
            this.wanderers.push(this.createWanderer());
            this.wanderers[2].mass = 10;
        }
        if (this.usedTime > 72 && this.usedTime < 75.1) {
            document.getElementById("tutorial").innerHTML = "<h2>Once you've done that, you'll notice you have become bigger</h2> <h2>You are now big enough to eat the one that was black before</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 72) / 3) + ")";
        }
        if (this.usedTime > 78 && this.usedTime < 81.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 78) / 3) + ")";
        }
        if (this.usedTime > 81 && this.usedTime < 84.1) {
            document.getElementById("tutorial").innerHTML = "<h2>Your goal here is quite simple.</h2> <h2>Become big enough to destroy the three cells on the right.</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 81) / 3) + ")";
        }
        if (this.usedTime > 87 && this.usedTime < 90.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 87) / 3) + ")";
        }
        if (this.usedTime > 90 && this.usedTime < 93.1) {
            document.getElementById("tutorial").innerHTML = "<h2>Good Luck</h2>";
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - 90) / 3) + ")";
        }
        if (this.usedTime > 96 && this.usedTime < 99.1) {
            this.tutorialText.style.color = "rgba(0, 0, 0, " + (1 - (this.usedTime - 87) / 3) + ")";
        }
        if (this.usedTime == 100) {
            document.getElementById("tutorial").innerHTML = "<h1>Now Go!</h1>";
            this.tutorialText.style.color = "rgba(0, 0, 0, 1)";
        }
        if (this.usedTime == 103) {
            this.tutorialText.style.color = "rgba(0, 0, 0, 0)";
        }
    },

    collision: function () {

        //WANDERERS
        for (let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            let dx = wanderer.wandererX - this.player.playerX;
            let dy = wanderer.wandererY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < wanderer.mass + this.player.mass + 25) {
                console.log("entity collided with");
                if (wanderer.mass < this.player.mass - 2 && wanderer.eaten == false) {
                    if (this.player.mass <= 8) {
                        this.player.mass = this.player.mass + wanderer.mass
                    }
                    if (this.player.mass > 8) {
                        this.player.mass = this.player.mass + (wanderer.mass * 2) / this.player.mass
                    }
                    //this.container.children[i].remove();
                    wanderer.eaten = true;

                } else if (this.wanderers[i].mass > this.player.mass + 2) {
                    this.wanderers[i].element.style.border = "3px solid rgb(255, 0, 0)";  //PLAYER DEATH
                }
            }
        }

        //CHASERS
        for (let i = 0; i < this.chasers.length; i++) {
            let chaser = this.chasers[i];
            let dx = chaser.chaserX - this.player.playerX;
            let dy = chaser.chaserY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < chaser.mass + this.player.mass + 25) {
                console.log("entity collided with");
                if (chaser.mass < this.player.mass - 2 && chaser.eaten == false) {
                    this.player.mass = this.player.mass + (chaser.mass * 2) / this.player.mass
                    //this.container.children[i].remove();
                    chaser.eaten = true;

                } else if (this.chasers[i].mass > this.player.mass + 2) {
                    this.chasers[i].element.style.border = "3px solid rgb(255, 0, 0)";  //PLAYER DEATH
                }
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
        this.usedTime = this.frameTime / 40;
        console.log("Used Time: " + this.usedTime);
        console.log("Frame Time: " + this.frameTime);
    },

    wanderersDetect: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            let dx = wanderer.wandererX - this.player.playerX;
            let dy = wanderer.wandererY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            //console.log("selected");

            if (distance < wanderer.mass + this.player.mass + 100) {
                //console.log("entity detected");

                if (wanderer.mass > this.player.mass + 2) {
                    wanderer.targetX = this.player.playerX;
                    wanderer.targetY = this.player.playerY;
                    //console.log(wanderer.targetX)
                    //console.log(wanderer.targetY)
                }
            }
        }

    },

    chasersDetect: function () {
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
            //console.log(this.wanderer.inertiaY);
            //console.log(this.wanderer.inertiaX);
            //console.log(this.wanderer.targetX)
            //console.log(this.wanderer.wanderX - wanderer.targetX);
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

        //The A key
        if (this.player.left == true) {    //Is W held down?
            if (this.player.inertiaX > -this.player.maxSpeed) {
                this.player.inertiaX = this.player.inertiaX - this.player.speed
            } else if (this.player.inertiaX <= -this.player.maxSpeed) {
                this.player.inertiaX = -this.player.maxSpeed
            }
        } else if (this.player.inertiaX < 0) {
            this.player.inertiaX = this.player.inertiaX + this.player.speed
            if (this.player.inertiaX > -1 && this.player.right == false) {
                this.player.inertiaX = 0;
            }
        }
        //console.log("Xinertia: " + this.player.inertiaX);

        //The D key
        if (this.player.right == true) {    //Is W held down?
            if (this.player.inertiaX < this.player.maxSpeed) {
                this.player.inertiaX = this.player.inertiaX + this.player.speed
            } else if (this.player.inertiaX >= this.player.maxSpeed) {
                this.player.inertiaX = this.player.maxSpeed
            }
        } else if (this.player.inertiaX > 0) {
            this.player.inertiaX = this.player.inertiaX - this.player.speed
            if (this.player.inertiaX < 1 && this.player.left == false) {
                this.player.inertiaX = 0;
            }
        }

        //The W key
        if (this.player.up == true) {    //Is W held down?
            if (this.player.inertiaY > -this.player.maxSpeed) {
                this.player.inertiaY = this.player.inertiaY - this.player.speed
            } else if (this.player.inertiaY <= -this.player.maxSpeed) {
                this.player.inertiaY = -this.player.maxSpeed
            }
        } else if (this.player.inertiaY < 0) {
            this.player.inertiaY = this.player.inertiaY + this.player.speed
            if (this.player.inertiaY > -1 && this.player.down == false) {
                this.player.inertiaY = 0;
            }
        }
        //console.log("Yinertia: " + this.player.inertiaY);

        //The S key
        if (this.player.down == true) {    //Is W held down?
            if (this.player.inertiaY < this.player.maxSpeed) {
                this.player.inertiaY = this.player.inertiaY + this.player.speed
            } else if (this.player.inertiaY >= this.player.maxSpeed) {
                this.player.inertiaY = this.player.maxSpeed
            }
        } else if (this.player.inertiaY > 0) {
            this.player.inertiaY = this.player.inertiaY - this.player.speed
            if (this.player.inertiaY < 1 && this.player.up == false) {
                this.player.inertiaY = 0;
            }
        }

        if (this.player.playerY >= 670 - this.player.mass && this.player.inertiaY > 0) {     //Bounce on ceiling and floor
            this.player.inertiaY = this.player.inertiaY * -1;
        }
        if (this.player.playerX >= 1470 - this.player.mass && this.player.inertiaX > 0) {     //Bounce on both walls
            this.player.inertiaX = this.player.inertiaX * -1;
        }
        if (this.player.playerY <= 0 && this.player.inertiaY < 0) {     //Bounce on ceiling and floor
            this.player.inertiaY = this.player.inertiaY * -1;
        }
        if (this.player.playerX <= 0 && this.player.inertiaX < 0) {     //Bounce on both walls
            this.player.inertiaX = this.player.inertiaX * -1;
        }

    },

    moveEntities: function () {
        //player
        this.player.playerY = this.player.playerY + this.player.inertiaY;
        this.player.playerX = this.player.playerX + this.player.inertiaX;
        //console.log(this.player.playerX);
        //console.log(this.player.playerY);

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
        this.player.element.style.top = this.player.playerY - (this.player.mass/2) + "px";
        this.player.element.style.left = this.player.playerX - (this.player.mass/2) + "px";
        this.player.element.style.height = (this.player.mass + 25) + "px";
        this.player.element.style.width = (this.player.mass + 25) + "px";
        this.player.element.style.zIndex = this.player.mass;

        //wanderers
        for (let i = 0; i < this.wanderers.length; i++) {
            this.wanderers[i].element.style.top = this.wanderers[i].wandererY - (this.wanderers[i].mass/2) + "px";
            this.wanderers[i].element.style.left = this.wanderers[i].wandererX - (this.wanderers[i].mass/2) + "px";
            this.wanderers[i].element.style.height = (this.wanderers[i].mass + 25) + "px";
            this.wanderers[i].element.style.width = (this.wanderers[i].mass + 25) + "px";
            this.wanderers[i].element.style.zIndex = this.wanderers[i].mass;
            if (this.wanderers[i].mass < this.player.mass - 2 && this.wanderers[i].eaten == false) {
                this.wanderers[i].element.style.border = "3px solid rgba(0, 0, 40, 1)";
                this.wanderers[i].element.style.backgroundColor = "rgba(0, 83, 14, 1);";
            } else if (this.wanderers[i].mass > this.player.mass + 2 && this.wanderers[i].eaten == false) {
                console.log("here");
                this.wanderers[i].element.style.border = "3px solid rgba(40, 0, 0, 1)";
                this.wanderers[i].element.style.backgroundColor = "rgba(0, 83, 14, 1);";
                console.log("but not here");
            } else if (this.wanderers[i].mass < this.player.mass + 2 && this.wanderers[i].mass > this.player.mass - 2 && this.wanderers[i].eaten == false) {
                this.wanderers[i].element.style.border = "3px solid rgba(0, 0, 0, 1)";
                this.wanderers[i].element.style.backgroundColor = "3px solid rgba(0, 83, 14, 1);";  //WHAT IS GOING ON HERE??!??!? Why does the color not change?
                console.log(this.wanderers[i].element.style.backgroundColor);        //why is the border special?????
                console.log(this.wanderers[i].element.style.border); //this makes a good 0 sense.
            } else {
                this.wanderers[i].element.style.border = "rgba(0, 0, 0, 0)";
                this.wanderers[i].element.style.backgroundColor = "rgba(0, 83, 14, 0.2)";
                this.wanderers[i].element.style.zIndex = 0;
            }
        }

        //chasers
        for (let i = 0; i < this.chasers.length; i++) {
            this.chasers[i].element.style.top = this.chasers[i].chaserY - (this.chasers[i].mass/2) + "px";
            this.chasers[i].element.style.left = this.chasers[i].chaserX - (this.chasers[i].mass/2) + "px";
            this.chasers[i].element.style.height = (this.chasers[i].mass + 25) + "px";
            this.chasers[i].element.style.width = (this.chasers[i].mass + 25) + "px";
            this.chasers[i].element.style.zIndex = this.chasers[i].mass;
            if (this.chasers[i].mass < this.player.mass - 2 && this.chasers[i].eaten == false) {
                this.chasers[i].element.style.border = "3px solid rgb(0, 0, 40)";

            } else if (this.chasers[i].mass > this.player.mass + 2 && this.chasers[i].eaten == false) {
                this.chasers[i].element.style.border = "3px solid rgb(40, 0, 0)";
            } else if (this.chasers[i].mass < this.player.mass + 2 && this.chasers[i].mass > this.player.mass - 2 && this.chasers[i].eaten == false) {
                this.chasers[i].element.style.border = "3px solid rgb(0, 0, 0)";
            } else {
                this.chasers[i].element.style.border = "rgba(0, 0, 0, 0)";
                this.chasers[i].element.style.backgroundColor = "rgba(83, 0, 0, 0.2)";
                this.chasers[i].element.style.zIndex = 0;
            }
        }
        //power cells
        for (let i = 0; i < this.powers.length; i++) {
            this.powers[i].element.style.top = this.powers[i].powerY - (this.powers[i].mass/2) + "px";
            this.powers[i].element.style.left = this.powers[i].powerX - (this.powers[i].mass/2) + "px";
            this.powers[i].element.style.height = (this.powers[i].mass + 25) + "px";
            this.powers[i].element.style.width = (this.powers[i].mass + 25) + "px";
            this.powers[i].element.style.zIndex = this.powers[i].mass;
            if (this.powers[i].mass < this.player.mass - 2) {
                this.powers[i].element.style.border = "3px solid rgb(0, 0, 40)";

            } else if (this.powers[i].mass > this.player.mass + 2) {
                this.powers[i].element.style.border = "3px solid rgb(40, 0, 0)";
            } else {
                this.powers[i].element.style.border = "3px solid rgb(0, 0, 0)";
            }
        }
    },

}

Cell_Division.init();