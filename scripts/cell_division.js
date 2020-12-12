let Cell_Division = {

    animation1: undefined,
    wanderers: [],
    chasers: [],
    spitters: [],

    init: function () {
        let player = document.createElement("div")
        var circle1 = {radius: 20, x: 5, y: 5};
    },

    startAnimation: function () {
        this.animation1 = window.setInterval(this.animateCircles.bind(Cell_Division), 20);
    },

    animateGame: function () {
        this.moveWanderers();
        this.renderWanderers();
    },

    moveWanderers: function () {
        for (let i = 0; i < this.wanderers.length; i++) {
            if (this.wanderers[i].x_pos + (this.wanderers[i].radius * 2) > 590) {
                this.circles[i].x_pos = 590 - this.circles[i].radius * 2;
                this.circles[i].x_velocity = this.circles[i].x_velocity * -1;
            } else if (this.circles[i].x_pos < 0) {
            }
        }
    }

}