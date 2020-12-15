import Game from './core/Game';

let chatText = document.getElementById('chat-text');
export let chatInput = <HTMLInputElement>document.getElementById('chat-input');
let chatForm = document.getElementById('chat-form');

export function initializeChat(game: Game) {
    game.socket.on('addToChat', (data: any) => {
        // @ts-ignore
        chatText.innerHTML += `<div>${data}</div>`;
    });

    // @ts-ignore
    chatForm.onsubmit = (event) => {
        try {
            event.preventDefault();
            // @ts-ignore
            game.socket.emit(
                'sendMsgToServer',
                `${'dssd'}: ${chatInput.value}`
            );
            // @ts-ignore
            if (chatInput?.value === '/showColliders') {
                game.draw.drawCollidersDEV = !game.draw.drawCollidersDEV;
            }
            // @ts-ignore
            chatInput.value = '';
        } catch (e) {
            console.log(e);
        }
    };
}
