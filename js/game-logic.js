var gameInstance = new World(EGameState.MENU, 700);

$(document).ready(function() {
    SetupBackground();
    gameInstance.AddBard(new Bard(400, 700));

    $('#start').click(function() {
        gameInstance.gameState = EGameState.GAME;
        Start();
    });

    $('#viewport').click(function() {
        gameInstance.bard.jump();
        gameInstance.bard.draw();
        console.log('asdf');
    });
});

function Start() {
    $('#menu').hide();
    $('#flash').removeClass('flash');

    gameInstance.Init();

    gameInstance.lastFrameTime = performance.now();
    console.log(gameInstance.lastFrameTime)
    window.requestAnimationFrame(GameLoop);
};

function End() {
    $('#flash').addClass('flash');
    $('#menu').show();

    gameInstance.pipeManager.clear();
}

function GameLoop(timeStamp) {
    var dt = (timeStamp - gameInstance.lastFrameTime) / 1000;
    
    gameInstance.Tick(dt);
    gameInstance.Draw();

    if (!gameInstance.bard.alive) {
        End();
    }
    
    if (gameInstance.gameState === EGameState.GAME) {
        gameInstance.lastFrameTime = timeStamp;
        window.requestAnimationFrame(GameLoop);
    }
}

/**
 * Funtion to setup the background
 */
function SetupBackground() {
    CreateScrollingSprites(275, 10, 'parallax-environment');
    CreateScrollingSprites(223, 3, 'parallax-floor');
}

/** 
* CreateScrollingSprites allows to create a slideshow of animations specified by the animation
* class. The duration specified was taken for a viewport of 360px and is scaled if the viewport is
* bigger or smaller. 
*/
function CreateScrollingSprites(spriteWidth, animationDuration, animation) {
    var spriteAmount = Math.ceil((window.innerWidth * 2) / spriteWidth);
    var scaledDuration = animationDuration / (360 / window.innerWidth);
    var delayOffset = scaledDuration / spriteAmount;
    console.log(`${animation}: ${scaledDuration}s with offset ${delayOffset}`)
    for (var i = 0; i < spriteAmount; i++) {
        var delay = delayOffset * i - scaledDuration;
        var sprite = $('<div class=' + animation + ' style="animation-duration:' + scaledDuration + 's; animation-delay:' + delay + 's"></div>');
        $('#viewport').append(sprite);
    }
}