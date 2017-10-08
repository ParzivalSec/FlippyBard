var EGameState = Object.freeze({ MENU: 0, GAME: 1 });

// Utility method for box-box intersections
function intersects(BB_One, BB_Two) {
    return (Math.abs(BB_One.x - BB_Two.x) * 2 < (BB_One.width + BB_Two.width)) && (Math.abs(BB_One.y - BB_Two.y) * 2 < (BB_One.height + BB_Two.height));
}

class World {
    constructor(gameState, gravity) {
        this.gameState = gameState;
        this.gravity = gravity;
        this.bard = {};
        this.lastFrameTime = 0;
        this.pipeManager = new PipeManager(20, 2, 3, 100);
    }

    Init() {
        this.bard.init();
        this.pipeManager.init();
    }

    AddBard(bard) {
        this.bard = bard;
    }

    AddPipe(pipe) {
        pipes.push(pipe);
    }

    Tick(dt) {
        this.bard.update(dt);
        this.pipeManager.update(dt);

        // Check for collisions between bard and the pipes / or the floor
        for (var i in this.pipeManager.pipes) {
            var pipe = this.pipeManager.pipes[i];
            if (!pipe.active) continue;

            var bard = this.bard;
            if (intersects(bard.getBB(), pipe.upperBB()) || intersects(bard.getBB(), pipe.lowerBB())) {
                bard.die();
            }

            // If we are not collided check if we passed a pipe
            if(!pipe.cleared && pipe.position.x <= bard.getBB().x - (bard.getBB().width * 0.5)) {
                pipe.cleared = true;
                // TODO: Alter the score
            }
        }

        if (!this.bard.alive) {
            this.gameState = EGameState.MENU;
        }
    }

    Draw() {
        this.bard.draw();
        this.pipeManager.draw();
    }
}