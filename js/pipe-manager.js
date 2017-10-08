class PipeManager {
    constructor(maxPipes, spawnIntervalMin, spawnIntervalMax, speed) {
        this.initialPipeCount = maxPipes;
        this.spawnIntervalMin = spawnIntervalMin;
        this.spawnIntervalMax = spawnIntervalMax;
        this.pipeSpeed = speed;
    }

    init() {
        console.log('PipeManager init()');
        this.pipes = new Array(this.initialPipeCount);
        this.timeSinceLastSpawn = 0;
        this.nextPipeTime = 0;    
        for (var i = 0; i < this.initialPipeCount; i++) {
            this.pipes[i] = new Pipe(this.pipeSpeed);
        }
    }

    spawnPipe() {
        // Find an inactive pipe from the array and activate it
        for (var p in this.pipes) {
            if (!this.pipes[p].active) {
                // Set the box extends new
                this.pipes[p].init();
                return;
            }
        }
    }

    clear() {
        for (var p in this.pipes) {
            if (!this.pipes[p].active) {
                this.pipes[p].active = false;
            }
        }
        $('#viewport .pipe').remove();
    }

    update(dt) {
        // Check if we need to spawn a new pipe
        this.timeSinceLastSpawn += dt;
        if (this.timeSinceLastSpawn >= this.nextPipeTime) {
            console.log('Pipe spawned');
            this.spawnPipe();
            this.nextPipeTime = Math.floor(Math.random() * (this.spawnIntervalMax - this.spawnIntervalMin + 1) + this.spawnIntervalMin);
            this.timeSinceLastSpawn = 0;
        }

        for (var pipe in this.pipes) {
            if (this.pipes[pipe].active) {
                this.pipes[pipe].update(dt);
            }
        }
   }

    draw() {
        for (var pipe in this.pipes) {
            if (this.pipes[pipe].active) {
                this.pipes[pipe].draw();
            }
        }
    }
}