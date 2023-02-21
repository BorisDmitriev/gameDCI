document.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            key.a.pressed = true;
            break;
        case 'b':
            key.b.pressed = true;
            break;
    }
}); 