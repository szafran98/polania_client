import Game from './core/Game';

export function initializeControls(game: Game) {
    document.onkeydown = (event) => {
        // @ts-ignore
        if (event.target.nodeName === 'INPUT') {
            return;
        }
        if (event.keyCode === 68) {
            game.socket.emit('keyPress', { inputId: 'right', state: true });
        } else if (event.keyCode === 83) {
            game.socket.emit('keyPress', { inputId: 'down', state: true });
        } else if (event.keyCode === 65) {
            game.socket.emit('keyPress', { inputId: 'left', state: true });
        } else if (event.keyCode === 87) {
            game.socket.emit('keyPress', { inputId: 'up', state: true });
        }
    };
    document.onkeyup = (event) => {
        if (event.keyCode === 68) {
            game.socket.emit('keyPress', { inputId: 'right', state: false });
        }
        if (event.keyCode === 83) {
            game.socket.emit('keyPress', { inputId: 'down', state: false });
        }
        if (event.keyCode === 65) {
            game.socket.emit('keyPress', { inputId: 'left', state: false });
        }
        if (event.keyCode === 87) {
            game.socket.emit('keyPress', { inputId: 'up', state: false });
        }
    };
}
