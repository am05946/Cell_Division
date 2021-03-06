let Cell_Division = {

    animation1: undefined,
    player: undefined,
    wanderers: [],
    chasers: [],
    bouncers: [],
    powers: [],
    wanderzone: document.getElementById("wander_zone"),
    bouncerzone: document.getElementById("bouncer_zone"),
    chaserzone: document.getElementById("chaser_zone"),
    startbutton: document.getElementById("start_button"),
    skipbutton: document.getElementById("skip_button"),
    container: document.getElementById("playing_screen"),
    tutorialText: document.getElementById("tutorial"),
    deathscreen: document.getElementById("death_view"),
    winscreen: document.getElementById("win_screen"),
    titleText: document.getElementById("title_text"),
    usedTime: 0,
    frameTime: 0,
    score: 0,
    finalTime: 0,
    //highscore: 0,
    wandererSpawn: 0,
    chaserSpawn: 1,
    maxChaserSize: 60,
    maxBouncerSize: 110,
    gamestart: false,
    skip: false,
    smallerVirus: false,

    init: function () {                                                       //----- Player Key Press Detection -----//  
        this.deathscreen.style.backgroundColor = "rgba(155, 0, 0, 0)";
        this.skipbutton.style.color = "rgba(0, 183, 255, 0)";
        this.skipbutton.style.backgroundColor = "rgba(0, 122, 170, 0)";
        this.skipbutton.style.borderTopColor = "rgba(0, 151, 211, 0)";
        this.skipbutton.style.borderLeftColor = "rgba(0, 151, 211, 0)";
        this.skipbutton.style.borderRightColor = "rgba(0, 100, 139, 0)";
        this.skipbutton.style.borderBottomColor = "rgba(0, 100, 139, 0)";

        this.player = this.createPlayer();     //Create player
        for (let i = 0; i < 3; i++) {
            this.powers.push(this.createPower())
        }
        document.getElementById("score_box").innerHTML = "<h3> Score: " + this.score + "</h3>";     //<h3> Highscore: " + this.highscore + "</h3>

        window.onkeydown = function (event) {
            //if (this.player.dead == false) {
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
            //}
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

        this.skipbutton.onclick = function (event) {
            if (this.usedTime < 30 && this.skip == false && (this.usedTime > 3.1)) {
                this.skip = true;
                this.wanderers.push(this.createWanderer());
                this.frameTime = 3600;
                this.player.mass = 11.7;
                this.score = 6;
                this.deathscreen.style.height = window.innerHeight + "px";
                this.deathscreen.style.width = window.innerWidth + "px";
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
        this.powers[1].powerY = 335;
        this.powers[2].powerY = 575;
        this.powers[1].powerX = this.powers[1].powerX;
        this.powers[2].powerX = this.powers[2].powerX;
        this.powers[1].mass = 100;
        this.powers[2].mass = 150;
    },

    createPlayer: function () {
        let playerdiv = document.createElement("div");
        playerdiv.className = "player";
        this.container.appendChild(playerdiv);
        let player = {
            playerX: 250,
            playerY: 350,
            inertiaX: 0,
            inertiaY: 0,
            maxSpeed: 5,
            friction: 7,  //DO NOT TURN THIS TO A NEGATIVE VALUE (Or really any value below 1)
            speed: 0.4,
            deathTimer: 100,
            mass: 5,
            dead: false,
            right: false,
            down: false,
            left: false,
            up: false,
            element: playerdiv,
        }
        console.log("Player Cell spawned");
        return player;
    },

    createWanderer: function () {
        let wanderdiv = document.createElement("div");
        wanderdiv.className = "wanderer";
        this.container.append(wanderdiv);
        let wanderer = {
            mass: Math.ceil(Math.random() * 45),
            wandererX: this.powers[this.wandererSpawn].powerX,
            wandererY: this.powers[this.wandererSpawn].powerY,
            inertiaX: -1,
            inertiaY: -1,
            friction: 1,
            maxSpeed: Math.random() * 1.5 + 1.5,
            energy: 0,
            eaten: false,
            maxEnergy: Math.random() * 250 + 125,
            targetX: Math.random() * 1300,
            targetY: Math.random() * 660,
            element: wanderdiv,
        }
        console.log("Wanderer Cell spawned----------------------------------");
        return wanderer;
    },

    createBouncer: function () {
        let bouncerdiv = document.createElement("div");
        bouncerdiv.className = "bouncer";
        this.container.append(bouncerdiv);
        let bouncer = {
            mass: Math.ceil(Math.random() * (this.maxBouncerSize - 50) + 50),
            bouncerX: this.powers[2].powerX,
            bouncerY: this.powers[2].powerY,
            inertiaX: Math.random() * 3 + 3,
            inertiaY: Math.random() * 3 + 3,
            friction: 1,
            eaten: false,
            element: bouncerdiv,
        }
        console.log("Bouncer Cell spawned----------------------------------");
        return bouncer;
    },

    createChaser: function () {
        let chaserdiv = document.createElement("div");
        chaserdiv.className = "chaser";
        this.container.append(chaserdiv);
        let chaser = {
            mass: Math.ceil(Math.random() * this.maxChaserSize),
            chaserX: this.powers[this.chaserSpawn].powerX,
            chaserY: this.powers[this.chaserSpawn].powerY,
            inertiaX: 0,
            inertiaY: 0,
            friction: 1,
            maxSpeed: Math.random() * 1 + 2,
            energy: 0,
            eaten: false,
            maxEnergy: Math.random() * 250 + 25,
            targetX: Math.random() * 250 + 125,
            targetY: Math.random() * 500 + 125,
            element: chaserdiv,
        }
        console.log("Chaser Cell spawned----------------------------------");
        return chaser;
    },

    createPower: function () {
        let powerdiv = document.createElement("div");
        powerdiv.className = "power";
        this.container.append(powerdiv);
        let power = {
            mass: 50,
            powerX: 1365,
            powerY: 75,
            inertiaY: -6,
            inertiaX: -1,
            energy: 0,
            eaten: false,
            speed: 6,
            maxEnergy: 50,
            element: powerdiv,
        }
        console.log("Power Cell spawned----------------------------------");
        return power;
    },

    startAnimation: function () {
        this.animation1 = window.setInterval(this.animateGame.bind(Cell_Division), 20);
    },

    animateGame: function () {
        console.log(this.smallerVirus)
        this.renderEntities();
        //this.challengeInertia();
        this.addTime();
        if (this.powers[2].eaten == false) {
            this.moveEntities();
            this.collision();
            this.playerMovement();
            this.wanderersDetect();
            this.wanderersMove();
            this.chasersMove();
            this.chasersDetect();
            this.bouncersMove();
            this.playerHealth();
            this.fade();
            this.spawners();
            this.firstPowerMove();
            this.secondPowerMove();
            this.thirdPowerMove();
            this.finalTime = this.usedTime;
        }
        console.log(this.usedTime);
        if (this.powers[2].eaten == true && this.maxChaserSize == 95) {
            this.finalTime = this.usedTime;
            this.maxChaserSize = 100;

        }
        this.death();
        //console.log("Current Mass: " + this.player.mass);
        //console.log("Dead?: " + this.player.dead);
        if (this.powers[2].eaten == true) {
            this.win();
        }
        //this.player.mass = this.player.mass + 0.05;                           //<---------- USE WHEN TESTING LATE GAME
        if (this.player.deathTimer < 0) {
            this.death();
        }
    },

    win: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            this.wanderers[i].element.style.backgroundColor = "rgb(0,0,0,0)"
            this.wanderers[i].element.style.border = "rgb(0,0,0,0)"
        }
        for (let i = 0; i < this.chasers.length; i++) {
            this.chasers[i].element.style.backgroundColor = "rgb(0,0,0,0)"
            this.chasers[i].element.style.border = "rgb(0,0,0,0)"
        }
        for (let i = 0; i < this.bouncers.length; i++) {
            this.bouncers[i].element.style.backgroundColor = "rgb(0,0,0,0)"
            this.bouncers[i].element.style.border = "rgb(0,0,0,0)"
        }
        this.player.element.style.backgroundColor = "rgba(0, 0, 0, 0)";
        this.player.element.style.border = "3px solid rgba(0, 0, 0, 0)";
        this.wanderzone.style.backgroundColor = "rgba(0,0,0, 0)";
        this.wanderzone.style.border = "3px dashed rgba(0,0,0, 0)";
        this.bouncerzone.style.backgroundColor = "rgba(0,0,0, 0)";
        this.bouncerzone.style.border = "3px dashed rgba(0,0,0, 0)";
        this.chaserzone.style.backgroundColor = "rgba(0,0,0, 0)";
        this.chaserzone.style.border = "3px dashed rgba(0,0,0, 0)";
        this.deathscreen.style.backgroundColor = "rgba(0,0,0, 1)";
        this.player.dead = true;
        console.log("Final Time: " + this.finalTime)
        if (this.usedTime - this.finalTime < 6 && this.usedTime - this.finalTime > 3) {
            this.winscreen.style.color = "rgba(255, 255, 255, " + ((this.usedTime - this.finalTime - 3) / 3) + ")";
        }
        if (this.usedTime - this.finalTime < 12 && this.usedTime - this.finalTime > 9) {
            this.winscreen.style.color = "rgba(255, 255, 255, " + (1 - (this.usedTime - this.finalTime - 9) / 3) + ")";
        }
        if (this.usedTime - this.finalTime < 15 && this.usedTime - this.finalTime > 12) {
            this.winscreen.style.color = "rgba(255, 255, 255, " + ((this.usedTime - this.finalTime - 12) / 3) + ")";
            document.getElementById("win_screen").innerHTML = "<h4>You have defeated the last of the main virus cells</h4>";
        }
        if (this.usedTime - this.finalTime < 21 && this.usedTime - this.finalTime > 18) {
            this.winscreen.style.color = "rgba(255, 255, 255, " + (1 - (this.usedTime - this.finalTime - 18) / 3) + ")";
        }
        if (this.usedTime - this.finalTime < 24 && this.usedTime - this.finalTime > 21) {
            this.winscreen.style.color = "rgba(255, 255, 255, " + ((this.usedTime - this.finalTime - 21) / 3) + ")";
            document.getElementById("win_screen").innerHTML = "<h4>Without their leaders, the viruses died off</h4><h4>and the host was cured</h4>";
        }
        if (this.usedTime - this.finalTime < 30 && this.usedTime - this.finalTime > 27) {
            this.winscreen.style.color = "rgba(255, 255, 255, " + (1 - (this.usedTime - this.finalTime - 27) / 3) + ")";
        }
        if (this.usedTime - this.finalTime > 30) {
            this.winscreen.style.color = "rgba(255, 255, 255, " + ((this.usedTime - this.finalTime - 30) / 3) + ")";
            document.getElementById("win_screen").innerHTML = "<h4>You have finally won.</h4><h4>Your final score was: " + this.score + "</h4>";
        }
    },

    spawners: function () {

        if (this.usedTime > 109 && this.usedTime % 10 == 0 && this.smallerVirus == false) {
            if (this.player.mass < 50) {
                let random = Math.ceil(Math.random() * 3);
                if (random <= 2) {
                    this.wanderers.push(this.createWanderer());
                } else if (random == 3) {
                    this.chasers.push(this.createChaser());
                }

            }
            if (this.player.mass >= 50 && this.player.mass < 100) {
                this.maxChaserSize = 95;
                let random = Math.ceil(Math.random() * 3);
                if (random <= 2) {
                    this.chasers.push(this.createChaser());
                } else if (random == 3) {
                    this.bouncers.push(this.createBouncer());
                }
            }
            if (this.player.mass >= 100 && this.player.mass < 135) {
                this.maxBouncerSize = 145;
                this.bouncers.push(this.createBouncer());
            }
        }
        if (this.usedTime > 109 && this.usedTime % 5 == 0) {
            if (this.player.mass >= 130 && this.player.mass < 175) {
                this.chaserSpawn = 2;
                this.wandererSpawn = 2;
                this.maxChaserSize = 140;
                let random = Math.ceil(Math.random() * 4);
                if (random == 1) {
                    this.wanderers.push(this.createWanderer());
                } else if (random == 2) {
                    this.chasers.push(this.createChaser());
                } else if (random >= 3) {
                    this.bouncers.push(this.createBouncer());
                }
            }
        }
        if (this.usedTime % 10 == 0) {
            this.smallerVirus = false;
        }
    },

    death: function () {
        if (this.player.dead == true) {
            let currentTime = this.player.deathTimer;
            document.getElementById("tutorial").innerHTML = "<h2>You have died.</h2><h2>Your final score was " + this.score + "</h2>"
            this.tutorialText.style.color = "rgba(0, 0, 0, " + ((this.usedTime - this.player.deathTimer) / 3) + ")";
            if (this.usedTime > currentTime + 5) {
                this.deathscreen.style.top = 0 + "px";
                this.deathscreen.style.left = 0 + "px";
                this.deathscreen.style.height = window.innerHeight + "px";
                this.deathscreen.style.width = window.innerWidth + "px";
                this.player.element.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                this.player.element.style.border = "rgba(0, 0, 0, 0)";
                this.deathscreen.style.backgroundColor = "rgba(155, 0, 0, 0.5)";
                let playerObj = document.getElementById("player");
                playerObj.remove;    //I (------) have tried to get this to work for several hours for the past few days, and yet, I cannot figure out how to
                //delete a div. Unfortunately because of this, I will not be able to make a restart button, and those little viruses in the back will have
                //to remain. Thankfully, there is that old motto, and those un-removable viruses in the back have just become a feature.
                //Oh yea, and the only reason I'm using this still is cause it doesn't give me an error message, though I do think I got pretty close with:
                //let playerdivVar = document.getElementById("tutorial");
                //playerdivVar.removeChild("player");
            }
        }

    },

    fade: function () {
        if (this.usedTime < 3.1) {
            this.titleText.style.color = "rgba(0, 0, 0, " + (1 - this.usedTime / 3) + ")";
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
            this.bouncerzone.style.backgroundColor = "rgba(255,255,0, " + (this.usedTime / 10) + ")";
            this.bouncerzone.style.border = "3px dashed rgba(255,255,0, " + (this.usedTime / 6) + ")";
            this.chaserzone.style.backgroundColor = "rgba(255,0,0, " + (this.usedTime / 10) + ")";
            this.chaserzone.style.border = "3px dashed rgba(255,0,0, " + (this.usedTime / 6) + ")";
            this.skipbutton.style.color = "rgba(0, 183, 255, " + (this.usedTime / 3) + ")";
            this.skipbutton.style.backgroundColor = "rgba(0, 122, 170, " + (this.usedTime / 3) + ")";
            this.skipbutton.style.borderTopColor = "rgba(0, 151, 211, " + (this.usedTime / 3) + ")";
            this.skipbutton.style.borderLeftColor = "rgba(0, 151, 211, " + (this.usedTime / 3) + ")";
            this.skipbutton.style.borderRightColor = "rgba(0, 100, 139, " + (this.usedTime / 3) + ")";
            this.skipbutton.style.borderBottomColor = "rgba(0, 100, 139, " + (this.usedTime / 3) + ")";
            for (i = 0; i < this.powers.length; i++) {
                this.powers[0].element.style.backgroundColor = "rgba(6, 25, 20, " + (this.usedTime / 3) + ")";
                this.powers[1].element.style.backgroundColor = "rgba(26, 15, 20, " + (this.usedTime / 3) + ")";
                this.powers[2].element.style.backgroundColor = "rgba(26, 25, 20, " + (this.usedTime / 3) + ")";
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
            if (this.skip == false) {
                this.skipbutton.style.color = "rgba(0, 122, 170, " + (1 - (this.usedTime - 30) / 3) + ")";
                this.skipbutton.style.backgroundColor = "rgba(0, 70, 100, " + (1 - (this.usedTime - 30) / 3) + ")";
                this.skipbutton.style.borderTopColor = "rgba(0, 95, 136, " + (1 - (this.usedTime - 30) / 3) + ")";
                this.skipbutton.style.borderLeftColor = "rgba(0, 95, 136, " + (1 - (this.usedTime - 30) / 3) + ")";
                this.skipbutton.style.borderRightColor = "rgba(0, 50, 71, " + (1 - (this.usedTime - 30) / 3) + ")";
                this.skipbutton.style.borderBottomColor = "rgba(0, 50, 71, " + (1 - (this.usedTime - 30) / 3) + ")";
                this.deathscreen.style.height = window.innerHeight + "px";
                this.deathscreen.style.width = window.innerWidth + "px";
            }
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
            if (this.skip == true) {
                this.skipbutton.style.color = "rgba(0, 122, 170, " + (1 - (this.usedTime - 90) / 3) + ")";
                this.skipbutton.style.backgroundColor = "rgba(0, 70, 100, " + (1 - (this.usedTime - 90) / 3) + ")";
                this.skipbutton.style.borderTopColor = "rgba(0, 95, 136, " + (1 - (this.usedTime - 90) / 3) + ")";
                this.skipbutton.style.borderLeftColor = "rgba(0, 95, 136, " + (1 - (this.usedTime - 90) / 3) + ")";
                this.skipbutton.style.borderRightColor = "rgba(0, 50, 71, " + (1 - (this.usedTime - 90) / 3) + ")";
                this.skipbutton.style.borderBottomColor = "rgba(0, 50, 71, " + (1 - (this.usedTime - 90) / 3) + ")";
                this.wanderers[0].mass = 10;
            }
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

    collision: function () {     //Though the code for collision was heavily modified by us, we got the base collision algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

        //WANDERERS
        for (let i = 0; i < this.wanderers.length; i++) {
            let wanderer = this.wanderers[i];
            let dx = wanderer.wandererX - this.player.playerX;
            let dy = wanderer.wandererY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < wanderer.mass / 2 + this.player.mass / 2 + 25) {
                //console.log("entity collided with");
                if (wanderer.mass < this.player.mass - 2 && wanderer.eaten == false && this.player.dead == false) {
                    if (this.player.mass <= 8) {
                        this.player.mass = this.player.mass + wanderer.mass
                    }
                    if (this.player.mass > 8) {
                        this.player.mass = this.player.mass + (wanderer.mass * 2) / this.player.mass + 0.5
                    }
                    //this.container.children[i].remove();
                    wanderer.eaten = true;
                    this.smallerVirus = false;
                    this.score = Math.ceil(this.score + wanderer.mass);
                    this.player.deathTimer = this.player.deathTimer + 5
                } else if (this.wanderers[i].mass > this.player.mass + 2 && this.player.dead == false) {
                    wanderer.element.style.border = "3px solid rgb(120, 0, 0)";  //PLAYER DEATH
                    this.player.inertiaX = this.player.inertiaX / 1.13;
                    this.player.inertiaY = this.player.inertiaY / 1.13;
                    if (this.player.deathTimer > -1) {
                        this.player.deathTimer = this.player.deathTimer - 0.4;
                    }
                }
            }
        }

        //BOUNCERS
        for (let i = 0; i < this.bouncers.length; i++) {
            let bouncer = this.bouncers[i];
            let dx = bouncer.bouncerX - this.player.playerX;
            let dy = bouncer.bouncerY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bouncer.mass / 2 + this.player.mass / 2 + 25) {
                //console.log("entity collided with");
                if (bouncer.mass < this.player.mass - 2 && bouncer.eaten == false && this.player.dead == false) {
                        this.player.mass = this.player.mass + (bouncer.mass * 2) / this.player.mass + 0.5
                    //this.container.children[i].remove();
                    bouncer.eaten = true;
                    this.score = Math.ceil(this.score + bouncer.mass);
                    this.player.deathTimer = this.player.deathTimer + 15
                    this.smallerVirus = false;

                } else if (this.bouncers[i].mass > this.player.mass + 2 && this.player.dead == false) {
                    bouncer.element.style.border = "3px solid rgb(120, 0, 0)";  //PLAYER DEATH
                    this.player.inertiaX = this.player.inertiaX / 1.2;
                    this.player.inertiaY = this.player.inertiaY / 1.2;
                    if (this.player.deathTimer > -1) {
                        this.player.deathTimer = this.player.deathTimer - 0.4;
                    }
                }
            }
        }

        //POWERS
        if (this.usedTime > 105) {
            for (let i = 0; i < this.powers.length; i++) {
                let power = this.powers[i];
                let dx = power.powerX - this.player.playerX;
                let dy = power.powerY - this.player.playerY;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < power.mass / 2 + this.player.mass / 2 + 25) {
                    //console.log("entity collided with");
                    if (power.mass < this.player.mass - 2 && power.eaten == false && this.player.dead == false) {
                        power.eaten = true;
                        this.score = Math.ceil(this.score + (power.mass * 2));
                        this.player.deathTimer = this.player.deathTimer + 50
                        this.smallerVirus = false;
                        this.player.mass = this.player.mass + 10;

                    } else if (this.powers[i].mass > this.player.mass + 2 && this.player.dead == false) {
                        power.element.style.border = "3px solid rgb(120, 0, 0)";  //PLAYER DEATH
                        this.player.inertiaX = this.player.inertiaX / 1.2;
                        this.player.inertiaY = this.player.inertiaY / 1.2;
                        if (this.player.deathTimer > -1) {
                            this.player.deathTimer = this.player.deathTimer - 0.4;
                        }
                    }
                }
            }
        }

        //CHASERS
        for (let i = 0; i < this.chasers.length; i++) {
            let chaser = this.chasers[i];
            let dx = chaser.chaserX - this.player.playerX;
            let dy = chaser.chaserY - this.player.playerY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < chaser.mass / 2 + this.player.mass / 2 + 25) {
                //console.log("entity collided with");
                if (chaser.mass < this.player.mass - 2 && chaser.eaten == false && this.player.dead == false) {
                    this.player.mass = this.player.mass + (chaser.mass * 2) / this.player.mass + 0.5
                    //this.container.children[i].remove();
                    chaser.eaten = true;
                    this.smallerVirus = false;
                    this.score = Math.ceil(this.score + chaser.mass + 1);
                    this.player.deathTimer = this.player.deathTimer + 10

                } else if (this.chasers[i].mass > this.player.mass + 2 && this.player.dead == false) {
                    chaser.element.style.border = "3px solid rgb(120, 0, 0)";
                    this.player.inertiaX = this.player.inertiaX / 1.1;
                    this.player.inertiaY = this.player.inertiaY / 1.1;     //PLAYER DEATH
                    if (this.player.deathTimer > -1) {
                        this.player.deathTimer = this.player.deathTimer - 0.2;
                    }

                }
            }
        }
        //I (------) would've put the code that made the cells bounce on the walls here, but for some reason they didn't...
        //work unless they were inside their movement code. My guess is that it has to do with the amount of calculations at...
        //the same time that went on inside the collision function at the time offset it for some reason.
    },

    addTime: function () {
        this.frameTime = this.frameTime + 1;
        this.usedTime = this.frameTime / 40;

        //console.log("Used Time: " + this.usedTime);
        //console.log("Frame Time: " + this.frameTime);
    },

    playerHealth: function () {
        //console.log("Health: " + this.player.deathTimer);
        this.deathscreen.style.backgroundColor = "rgba(155, 0, 0, " + (0.5 - (this.player.deathTimer / 200)) + ")";
        if (this.usedTime % 1 == 0 && this.player.deathTimer > 0 && this.player.deathTimer < 100) {
            this.player.deathTimer = this.player.deathTimer + 1;             //Regeneration of player health
        }
        if (this.player.deathTimer > 100) {
            this.player.deathTimer = 100;
        }
        if (this.player.deathTimer < 0 && this.player.dead == false) {
            this.player.dead = true;
            this.player.deathTimer = this.usedTime;
        }

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

                if (wanderer.mass > this.player.mass + 2 && this.player.dead == false) {
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
            //console.log("selected");

            if (distance < chaser.mass + this.player.mass + 200) {
                //console.log("entity detected");

                if (chaser.mass > this.player.mass + 2 && this.player.dead == false) {
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
            //console.log("energy: " + wanderer.energy);

            if (wanderer.energy >= wanderer.maxEnergy) {
                wanderer.targetX = Math.random() * (1450 - (wanderer.mass * 2)) + wanderer.mass;                 //HERE Math.random() *
                wanderer.targetY = Math.random() * (660 - (wanderer.mass * 2)) + wanderer.mass;                  //HERE Math.random() * 
                wanderer.energy = 0;
            }

            //Wanderers bouncing on the walls
            if (wanderer.wandererY >= 670 - wanderer.mass / 2 && wanderer.inertiaY > 0) {     //Bounce on ceiling and floor
                wanderer.inertiaY = wanderer.inertiaY * -1;
            }
            if (wanderer.wandererX >= 1470 - wanderer.mass / 2 && wanderer.inertiaX > 0) {     //Bounce on both walls
                wanderer.inertiaX = wanderer.inertiaX * -1;
            }
            if (wanderer.wandererY <= 0 + wanderer.mass / 2 && wanderer.inertiaY < 0) {     //Bounce on ceiling and floor
                wanderer.inertiaY = wanderer.inertiaY * -1;
            }
            if (wanderer.wandererX <= 0 + wanderer.mass / 2 && wanderer.inertiaX < 0) {     //Bounce on both walls
                wanderer.inertiaX = wanderer.inertiaX * -1;
            }
        }

    },

    bouncersMove: function () {
        for (let i = 0; i < this.bouncers.length; i++) {
            let bouncer = this.bouncers[i];
            //bouncers bouncing on the walls
            if (bouncer.bouncerY >= 670 - bouncer.mass / 2 && bouncer.inertiaY > 0) {     //Bounce on ceiling and floor
                bouncer.inertiaY = bouncer.inertiaY * -1;
            }
            if (bouncer.bouncerX >= 1470 - bouncer.mass / 2 && bouncer.inertiaX > 0) {     //Bounce on both walls
                bouncer.inertiaX = bouncer.inertiaX * -1;
            }
            if (bouncer.bouncerY <= 0 + bouncer.mass / 2 && bouncer.inertiaY < 0) {     //Bounce on ceiling and floor
                bouncer.inertiaY = bouncer.inertiaY * -1;
            }
            if (bouncer.bouncerX <= 0 + bouncer.mass / 2 && bouncer.inertiaX < 0) {     //Bounce on both walls
                bouncer.inertiaX = bouncer.inertiaX * -1;
            }
            //console.log("Bouncer Mass: " + bouncer.mass);
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
            //console.log("chaser energy: " + chaser.energy);

            if (chaser.energy >= chaser.maxEnergy) {
                chaser.targetX = Math.random() * (1450 - (chaser.mass * 2)) + chaser.mass;                 //HERE Math.random() *
                chaser.targetY = Math.random() * (660 - (chaser.mass * 2)) + chaser.mass;                  //HERE Math.random() * 
                chaser.energy = 0;
            }
            //Chasers bouncing on the walls
            if (chaser.chaserY >= 670 - chaser.mass / 2 && chaser.inertiaY > 0) {     //Bounce on ceiling and floor
                chaser.inertiaY = chaser.inertiaY * -1;
            }
            if (chaser.chaserX >= 1470 - chaser.mass / 2 && chaser.inertiaX > 0) {     //Bounce on both walls
                chaser.inertiaX = chaser.inertiaX * -1;
            }
            if (chaser.chaserY <= 0 + chaser.mass / 2 && chaser.inertiaY < 0) {     //Bounce on ceiling and floor
                chaser.inertiaY = chaser.inertiaY * -1;
            }
            if (chaser.chaserX <= 0 + chaser.mass / 2 && chaser.inertiaX < 0) {     //Bounce on both walls
                chaser.inertiaX = chaser.inertiaX * -1;
            }
        }

    },

    //Wanderer Boss
    firstPowerMove: function () {
        let powerWanderer = this.powers[0];
        if (this.player.mass >= 35) {
            if (powerWanderer.energy < powerWanderer.maxEnergy) {
                powerWanderer.powerX = powerWanderer.powerX + powerWanderer.inertiaX;
                powerWanderer.powerY = powerWanderer.powerY + powerWanderer.inertiaY;
                powerWanderer.energy = powerWanderer.energy + 1;
            } else {
                powerWanderer.maxEnergy = (Math.random() * 200) + 100;
                powerWanderer.energy = 0;
                powerWanderer.inertiaX = Math.random() * 6 - 3;
                powerWanderer.inertiaY = Math.random() * 6 - 3;
                if (powerWanderer.inertiaX < 0) {
                    powerWanderer.inertiaX = powerWanderer.inertiaX - 3;
                } else {
                    powerWanderer.inertiaX = powerWanderer.inertiaX + 3;
                }
                if (powerWanderer.inertiaY < 0) {
                    powerWanderer.inertiaY = powerWanderer.inertiaY - 3;
                } else {
                    powerWanderer.inertiaY = powerWanderer.inertiaY + 3;
                }
            }
        } else {
            if (powerWanderer.powerX > 1268 + powerWanderer.mass / 2) {
                powerWanderer.powerX = powerWanderer.powerX + Math.random() * 2 - 1;
                powerWanderer.powerY = powerWanderer.powerY + Math.random() * 2 - 1;
            } else {
                powerWanderer.powerX = powerWanderer.powerX + 2;
                powerWanderer.powerY = powerWanderer.powerY + Math.random() * 2 - 1;
            }
            if (powerWanderer.powerY < 255 - powerWanderer.mass / 2) {
                powerWanderer.powerX = powerWanderer.powerX + Math.random() * 2 - 1;
                powerWanderer.powerY = powerWanderer.powerY + Math.random() * 2 - 1;
            } else {
                powerWanderer.powerX = powerWanderer.powerX + Math.random() * 2 - 1;
                powerWanderer.powerY = powerWanderer.powerY - 2;
            }
            if (powerWanderer.powerX < 1470 - powerWanderer.mass / 2) {
                powerWanderer.powerX = powerWanderer.powerX + Math.random() * 2 - 1;
                powerWanderer.powerY = powerWanderer.powerY + Math.random() * 2 - 1;
            } else {
                powerWanderer.powerX = powerWanderer.powerX - 2;
                powerWanderer.powerY = powerWanderer.powerY + Math.random() * 2 - 1;
            }
            if (powerWanderer.powerY > 0 + powerWanderer.mass / 2) {
                powerWanderer.powerX = powerWanderer.powerX + Math.random() * 2 - 1;
                powerWanderer.powerY = powerWanderer.powerY + Math.random() * 2 - 1;
            } else {
                powerWanderer.powerX = powerWanderer.powerX + Math.random() * 2 - 1;
                powerWanderer.powerY = powerWanderer.powerY + 2;
            }
        }

        //bouncing on walls
        if (powerWanderer.powerY >= 670 - powerWanderer.mass / 2 && powerWanderer.inertiaY > 0) {     //Bounce on ceiling and floor
            powerWanderer.inertiaY = powerWanderer.inertiaY * -1;
        }
        if (powerWanderer.powerX >= 1470 - powerWanderer.mass / 2 && powerWanderer.inertiaX > 0) {     //Bounce on both walls
            powerWanderer.inertiaX = powerWanderer.inertiaX * -1;
        }
        if (powerWanderer.powerY <= 0 + powerWanderer.mass / 2 && powerWanderer.inertiaY < 0) {     //Bounce on ceiling and floor
            powerWanderer.inertiaY = powerWanderer.inertiaY * -1;
        }
        if (powerWanderer.powerX <= 0 + powerWanderer.mass / 2 && powerWanderer.inertiaX < 0) {     //Bounce on both walls
            powerWanderer.inertiaX = powerWanderer.inertiaX * -1;
        }
    },

    //Chaser Boss
    secondPowerMove: function () {
        let powerChaser = this.powers[1];
        if (this.player.mass >= 85) {
            if (this.usedTime % 5 == 0) {
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////BOSS FOLLOWING AI////////////////////////////////
                //Quick note:
                //I know that this code here below this text may not look like a lot, but I spent at least 5 hours just thinking and working on it, creating a mathematical function for it
                //Out of the entire project, this is probably the peice of code (besides maybe the inertia for the player movement) that I am most proud of. The only outside tool I used
                //to create this specific peice of code was the point slope equation from math class, which isn't really something I have to credit. Other than that, I sat here and tested
                //both parts of every quadrant, tweaking it and checking it as I went. Though this took me way longer than it should've, I'm still pround of it. For those who haven't tried
                //to get an entity to follow you on a specific line with a non-changing speed, I can tell you that it was increadibly difficult, and you should just use something like 
                //the code below to get it. Anyways, it is now around 3:00am, and I'm tired. Good night.

                let slope = (powerChaser.powerY - this.player.playerY) / (powerChaser.powerX - this.player.playerX);    //the slope
                console.log("slope: " + slope);

                //Checks the quadrant the player is in relative to the PowerChaser
                if (this.player.playerY < powerChaser.powerY && this.player.playerX < powerChaser.powerX) {           //quadrant 3
                    if (slope >= 1) {
                        powerChaser.inertiaX = -powerChaser.speed * (slope / (slope * slope));
                        powerChaser.inertiaY = -powerChaser.speed;
                    } else if (slope < 1 && slope > 0) {
                        powerChaser.inertiaX = -powerChaser.speed;
                        powerChaser.inertiaY = -powerChaser.speed * slope;
                    }
                } else if (this.player.playerY >= powerChaser.powerY && this.player.playerX < powerChaser.powerX) {    //quadrant 2
                    if (slope <= -1) {
                        powerChaser.inertiaX = powerChaser.speed * (slope / (slope * slope));
                        powerChaser.inertiaY = powerChaser.speed;
                    } else if (slope > -1 && slope < 0) {
                        powerChaser.inertiaX = -powerChaser.speed;
                        powerChaser.inertiaY = -powerChaser.speed * slope;
                    }
                } else if (this.player.playerY >= powerChaser.powerY && this.player.playerX >= powerChaser.powerX) {    //quadrant 1
                    if (slope >= 1) {
                        powerChaser.inertiaX = powerChaser.speed * (slope / (slope * slope));
                        powerChaser.inertiaY = powerChaser.speed;
                    } else if (slope < 1 && slope > 0) {
                        powerChaser.inertiaX = powerChaser.speed;
                        powerChaser.inertiaY = powerChaser.speed * slope;
                    }
                } else if (this.player.playerY < powerChaser.powerY && this.player.playerX >= powerChaser.powerX) {    //quadrant 4
                    if (slope <= -1) {
                        powerChaser.inertiaX = -powerChaser.speed * (slope / (slope * slope));
                        powerChaser.inertiaY = -powerChaser.speed;
                    } else if (slope > -1 && slope < 0) {
                        powerChaser.inertiaX = powerChaser.speed;
                        powerChaser.inertiaY = powerChaser.speed * slope;
                    }
                }////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            } else {
                console.log(powerChaser.inertiaX);
                console.log(powerChaser.inertiaY);
                powerChaser.powerX = powerChaser.powerX + powerChaser.inertiaX;
                powerChaser.powerY = powerChaser.powerY + powerChaser.inertiaY;
            }
        } else {
            if (powerChaser.powerX > 1268 + powerChaser.mass / 2) {
                powerChaser.powerX = powerChaser.powerX + Math.random() * 2 - 1;
                powerChaser.powerY = powerChaser.powerY + Math.random() * 2 - 1;
            } else {
                powerChaser.powerX = powerChaser.powerX + 2;
                powerChaser.powerY = powerChaser.powerY + Math.random() * 2 - 1;
            }
            if (powerChaser.powerY < 437 - powerChaser.mass / 2 + 12.5) {
                powerChaser.powerX = powerChaser.powerX + Math.random() * 2 - 1;
                powerChaser.powerY = powerChaser.powerY + Math.random() * 2 - 1;
            } else {
                powerChaser.powerX = powerChaser.powerX + Math.random() * 2 - 1;
                powerChaser.powerY = powerChaser.powerY - 2;
            }
            if (powerChaser.powerX < 1470 - powerChaser.mass / 2) {
                powerChaser.powerX = powerChaser.powerX + Math.random() * 2 - 1;
                powerChaser.powerY = powerChaser.powerY + Math.random() * 2 - 1;
            } else {
                powerChaser.powerX = powerChaser.powerX - 2;
                powerChaser.powerY = powerChaser.powerY + Math.random() * 2 - 1;
            }
            if (powerChaser.powerY > 234 + powerChaser.mass / 2) {
                powerChaser.powerX = powerChaser.powerX + Math.random() * 2 - 1;
                powerChaser.powerY = powerChaser.powerY + Math.random() * 2 - 1;
            } else {
                powerChaser.powerX = powerChaser.powerX + Math.random() * 2 - 1;
                powerChaser.powerY = powerChaser.powerY + 2;
            }
        }

        //bouncing on walls
        if (powerChaser.powerY >= 670 - powerChaser.mass / 2 && powerChaser.inertiaY > 0) {     //Bounce on ceiling and floor
            powerChaser.inertiaY = powerChaser.inertiaY * -1;
        }
        if (powerChaser.powerX >= 1470 - powerChaser.mass / 2 && powerChaser.inertiaX > 0) {     //Bounce on both walls
            powerChaser.inertiaX = powerChaser.inertiaX * -1;
        }
        if (powerChaser.powerY <= 0 + powerChaser.mass / 2 && powerChaser.inertiaY < 0) {     //Bounce on ceiling and floor
            powerChaser.inertiaY = powerChaser.inertiaY * -1;
        }
        if (powerChaser.powerX <= 0 + powerChaser.mass / 2 && powerChaser.inertiaX < 0) {     //Bounce on both walls
            powerChaser.inertiaX = powerChaser.inertiaX * -1;
        }
    },

    //Bouncer Boss
    thirdPowerMove: function () {
        let powerBouncer = this.powers[2];
        if (this.player.mass >= 135) {
            powerBouncer.powerX = powerBouncer.powerX + powerBouncer.inertiaX;
            powerBouncer.powerY = powerBouncer.powerY + powerBouncer.inertiaY;
        } else {
            if (powerBouncer.powerX > 1268 + powerBouncer.mass / 2) {
                powerBouncer.powerX = powerBouncer.powerX + Math.random() * 2 - 1;
                powerBouncer.powerY = powerBouncer.powerY + Math.random() * 2 - 1;
            } else {
                powerBouncer.powerX = powerBouncer.powerX + 2;
                powerBouncer.powerY = powerBouncer.powerY + Math.random() * 2 - 1;
            }
            if (powerBouncer.powerY < 670 - powerBouncer.mass / 2) {
                powerBouncer.powerX = powerBouncer.powerX + Math.random() * 2 - 1;
                powerBouncer.powerY = powerBouncer.powerY + Math.random() * 2 - 1;
            } else {
                powerBouncer.powerX = powerBouncer.powerX + Math.random() * 2 - 1;
                powerBouncer.powerY = powerBouncer.powerY - 2;
            }
            if (powerBouncer.powerX < 1470 - powerBouncer.mass / 2) {
                powerBouncer.powerX = powerBouncer.powerX + Math.random() * 2 - 1;
                powerBouncer.powerY = powerBouncer.powerY + Math.random() * 2 - 1;
            } else {
                powerBouncer.powerX = powerBouncer.powerX - 2;
                powerBouncer.powerY = powerBouncer.powerY + Math.random() * 2 - 1;
            }
            if (powerBouncer.powerY > 467 + powerBouncer.mass / 2) {
                powerBouncer.powerX = powerBouncer.powerX + Math.random() * 2 - 1;
                powerBouncer.powerY = powerBouncer.powerY + Math.random() * 2 - 1;
            } else {
                powerBouncer.powerX = powerBouncer.powerX + Math.random() * 2 - 1;
                powerBouncer.powerY = powerBouncer.powerY + 2;
            }
        }

        //bouncing on walls
        if (powerBouncer.powerY >= 670 - powerBouncer.mass / 2 && powerBouncer.inertiaY > 0) {     //Bounce on ceiling and floor
            powerBouncer.inertiaY = powerBouncer.inertiaY * -1;
        }
        if (powerBouncer.powerX >= 1470 - powerBouncer.mass / 2 && powerBouncer.inertiaX > 0) {     //Bounce on both walls
            powerBouncer.inertiaX = powerBouncer.inertiaX * -1;
        }
        if (powerBouncer.powerY <= 0 + powerBouncer.mass / 2 && powerBouncer.inertiaY < 0) {     //Bounce on ceiling and floor
            powerBouncer.inertiaY = powerBouncer.inertiaY * -1;
        }
        if (powerBouncer.powerX <= 0 + powerBouncer.mass / 2 && powerBouncer.inertiaX < 0) {     //Bounce on both walls
            powerBouncer.inertiaX = powerBouncer.inertiaX * -1;
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

        //Bouncing on walls
        if (this.player.playerY >= 670 - this.player.mass / 2 && this.player.inertiaY > 0) {     //Bounce on ceiling and floor
            this.player.inertiaY = this.player.inertiaY * -1;
        }
        if (this.player.playerX >= 1470 - this.player.mass / 2 && this.player.inertiaX > 0) {     //Bounce on both walls
            this.player.inertiaX = this.player.inertiaX * -1;
        }
        if (this.player.playerY <= 0 + this.player.mass / 2 && this.player.inertiaY < 0) {     //Bounce on ceiling and floor
            this.player.inertiaY = this.player.inertiaY * -1;
        }
        if (this.player.playerX <= 0 + this.player.mass / 2 && this.player.inertiaX < 0) {     //Bounce on both walls
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

        //bouncers
        for (let i = 0; i < this.bouncers.length; i++) {
            this.bouncers[i].bouncerY = this.bouncers[i].bouncerY + this.bouncers[i].inertiaY;
            this.bouncers[i].bouncerX = this.bouncers[i].bouncerX + this.bouncers[i].inertiaX;
            //console.log(this.bouncers[i].bouncerX);
            //console.log(this.bouncers[i].bouncerY);
        }
    },

    renderEntities: function () {

        if (this.usedTime > 35) {
            this.deathscreen.style.height = window.innerHeight + "px";
            this.deathscreen.style.width = window.innerWidth + "px";
        }

        //player
        this.player.element.style.top = this.player.playerY - (this.player.mass / 2) + "px";
        this.player.element.style.left = this.player.playerX - (this.player.mass / 2) + "px";
        this.player.element.style.height = (this.player.mass + 25) + "px";
        this.player.element.style.width = (this.player.mass + 25) + "px";
        this.player.element.style.zIndex = this.player.mass;

        //wanderers
        for (let i = 0; i < this.wanderers.length; i++) {
            this.wanderers[i].element.style.top = this.wanderers[i].wandererY - (this.wanderers[i].mass / 2) + "px";
            this.wanderers[i].element.style.left = this.wanderers[i].wandererX - (this.wanderers[i].mass / 2) + "px";
            this.wanderers[i].element.style.height = (this.wanderers[i].mass + 25) + "px";
            this.wanderers[i].element.style.width = (this.wanderers[i].mass + 25) + "px";
            this.wanderers[i].element.style.zIndex = this.wanderers[i].mass;
            if (this.wanderers[i].mass < this.player.mass - 2 && this.wanderers[i].eaten == false) {
                this.wanderers[i].element.style.border = "3px solid rgba(0, 0, 40, 1)";
                this.smallerVirus = true;

            } else if (this.wanderers[i].mass > this.player.mass + 2 && this.wanderers[i].eaten == false) {
                //console.log("here");
                this.wanderers[i].element.style.border = "3px solid rgba(40, 0, 0, 1)";
                //console.log("but not here");
            } else if (this.wanderers[i].mass < this.player.mass + 2 && this.wanderers[i].mass > this.player.mass - 2 && this.wanderers[i].eaten == false) {
                this.wanderers[i].element.style.border = "3px solid rgba(0, 0, 0, 1)";
                //console.log(this.wanderers[i].element.style.backgroundColor);
                //console.log(this.wanderers[i].element.style.border);
            } else {
                this.wanderers[i].element.style.border = "rgba(0, 0, 0, 0)";
                this.wanderers[i].element.style.backgroundColor = "rgba(0, 83, 14, 0.2)";
                this.wanderers[i].element.style.zIndex = 0;
            }
        }

        //chasers
        for (let i = 0; i < this.chasers.length; i++) {
            this.chasers[i].element.style.top = this.chasers[i].chaserY - (this.chasers[i].mass / 2) + "px";
            this.chasers[i].element.style.left = this.chasers[i].chaserX - (this.chasers[i].mass / 2) + "px";
            this.chasers[i].element.style.height = (this.chasers[i].mass + 25) + "px";
            this.chasers[i].element.style.width = (this.chasers[i].mass + 25) + "px";
            this.chasers[i].element.style.zIndex = this.chasers[i].mass;
            if (this.chasers[i].mass < this.player.mass - 2 && this.chasers[i].eaten == false) {
                this.chasers[i].element.style.border = "3px solid rgb(0, 0, 40)";
                this.smallerVirus = true;

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

        //bouncers
        for (let i = 0; i < this.bouncers.length; i++) {
            this.bouncers[i].element.style.top = this.bouncers[i].bouncerY - (this.bouncers[i].mass / 2) + "px";
            this.bouncers[i].element.style.left = this.bouncers[i].bouncerX - (this.bouncers[i].mass / 2) + "px";
            this.bouncers[i].element.style.height = (this.bouncers[i].mass + 25) + "px";
            this.bouncers[i].element.style.width = (this.bouncers[i].mass + 25) + "px";
            this.bouncers[i].element.style.zIndex = this.bouncers[i].mass;
            if (this.bouncers[i].mass < this.player.mass - 2 && this.bouncers[i].eaten == false) {
                this.bouncers[i].element.style.border = "3px solid rgb(0, 0, 40)";
                this.smallerVirus = true;

            } else if (this.bouncers[i].mass > this.player.mass + 2 && this.bouncers[i].eaten == false) {
                this.bouncers[i].element.style.border = "3px solid rgb(40, 0, 0)";
            } else if (this.bouncers[i].mass < this.player.mass + 2 && this.bouncers[i].mass > this.player.mass - 2 && this.bouncers[i].eaten == false) {
                this.bouncers[i].element.style.border = "3px solid rgb(0, 0, 0)";
            } else {
                this.bouncers[i].element.style.border = "rgba(0, 0, 0, 0)";
                this.bouncers[i].element.style.backgroundColor = "rgba(166, 166, 0, 0.2)";
                this.bouncers[i].element.style.zIndex = 0;
            }
        }

        //power cells
        for (let i = 0; i < this.powers.length; i++) {
            this.powers[i].element.style.top = this.powers[i].powerY - (this.powers[i].mass / 2) + "px";
            this.powers[i].element.style.left = this.powers[i].powerX - (this.powers[i].mass / 2) + "px";
            this.powers[i].element.style.height = (this.powers[i].mass + 25) + "px";
            this.powers[i].element.style.width = (this.powers[i].mass + 25) + "px";
            this.powers[i].element.style.zIndex = this.powers[i].mass;
            if (this.powers[i].mass < this.player.mass - 2 && this.powers[i].eaten == false) {
                this.powers[i].element.style.border = "3px solid rgb(0, 0, 40)";
                this.smallerVirus = true;

            } else if (this.powers[i].mass > this.player.mass + 2 && this.powers[i].eaten == false) {
                this.powers[i].element.style.border = "3px solid rgb(40, 0, 0)";
            } else if (this.powers[i].mass < this.player.mass + 2 && this.powers[i].mass > this.player.mass - 2 && this.powers[i].eaten == false) {
                this.powers[i].element.style.border = "3px solid rgb(0, 0, 0)";
            } else {
                this.powers[i].element.style.border = "rgba(0, 0, 0, 0)";
                this.powers[i].element.style.backgroundColor = "rgba(6, 15, 20, 0.2)";
                this.powers[i].element.style.zIndex = 0;
            }
        }

        //Score and HighScore
        //console.log("Score = " + this.score);
        document.getElementById("score_box").innerHTML = "<h3> Score: " + this.score + "</h3>";
        //document.getElementById("score_box").innerHTML = "<h3> Highscore: " + this.highscore + "</h3><h3> Score: " + this.score + "</h3>";
        //if (this.score > this.highscore) {
        //    this.highscore = this.score;
        //}                                                      //couldn't get the reset working cause I couldn't learn how to remove divs
    },

}

Cell_Division.init();     //Perfectly 1,300 lines. I wouldn't have it any other way.