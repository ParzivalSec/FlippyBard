class Bard {
    constructor(impuls, gravity) {
        this.jumpImpuls = impuls;
        this.alive = true;
        this.gravity = gravity;
    }

    init() {
        this.position = window.innerWidth * 0.25;
        this.velocity = 0;
        this.alive = true;

        $('#bard').attr('data-alive', 'true');
        $('#bard').show();
    }

    jump() {
        if (this.alive) {
            this.velocity = -this.jumpImpuls;
        }
    }

    die() {
        this.alive = false;
    }

    update(dt) {
        this.position = this.position + this.velocity * dt;
        this.velocity = this.velocity + this.gravity * dt;

        if (this.position >= window.innerHeight - 111) {
            this.position = window.innerHeight - 120;
            this.die();
        }
    }

    draw() {
        $('#bard').css('top', this.position);
    }

    getBB() {
        return {
            x: $('#bard').position().left,
            y: this.position,
            width: 36,
            height: 26
        }
    }
}