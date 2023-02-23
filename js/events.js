document.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
    }
}); 

document.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
    }
}); 

startButton.addEventListener('click', event => {
    init();
}); 

restartButton.addEventListener('click', event => {
    restart();
}); 