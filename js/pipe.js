class Pipe {
    constructor(speed) {
        this.active = false;
        this.speed = speed;
        console.log('Pipe created');
    }

    init() {
        this.passed = false;
        this.active = true;

        // Get a pipe and calc the hole
        var totalHeight = window.innerHeight;
        var heightPerSlice = totalHeight / 10;
        var holeLocation = Math.floor(Math.random() * (8 - 1 + 1) + 1);
        this.position = { x: window.innerWidth + 50, y: holeLocation * heightPerSlice };
        this.$sprite = $('<div class="pipe"><div class="top" style="height:' + totalHeight + 'px; top: -' + (totalHeight + 124) + 'px"></div><div class="top-end"></div><div class="bottom-end"></div><div class="bottom"></div></div>');
        $('#viewport').append(this.$sprite);
    }

    update(dt) {
        this.position.x -= this.speed * dt;
    }

    draw() {
        this.$sprite.css('top', this.position.y);
        this.$sprite.css('left', this.position.x);
    }

    upperBB() {
        return {
            x: this.position.x,
            y: (this.position.y - 100) * 0.5,
            width: 52,
            height: this.position.y - 100
          };
    }

    lowerBB() {
        return {
            x: this.position.x,
            y: (this.position.y + 100) + (window.innerHeight - (this.position.y + 100)) * 0.5,
            width: 52,
            height: window.innerHeight - (this.position.y + 100)
          };
    }
}