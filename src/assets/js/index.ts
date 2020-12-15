import Game from './core/Game';
import { chatInput } from './chat';
import CanvasEventHandler from './events/CanvasEventHandler';
//import { initializeButtonListeners } from '@/assets/js/ui/uiDrawMethods';

// @ts-ignore
export const startGameMain = async function () {
    // @ts-ignore
    CTX = document.getElementById('ctx').getContext('2d');
    CTX.font = '14px Arial bold';

    //console.log('siemaaaa kurwaaaa');

    if (!game) {
        game = Game.getInstance();
    }
    new CanvasEventHandler();

    game.draw.contextLayer = CTX;
    //initializeButtonListeners();
    //showEquipment();
};

export const stopGameMain = function (game: Game) {
    game.playersList = [];
    game.draw.margin.vertical = 0;
    game.draw.margin.horizontal = 0;
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'm' && document.activeElement !== chatInput) {
        game!.showMiniMap = !game!.showMiniMap;
    }
});

export let game: Game;
export let CTX: any;
export const serverIp = '159.65.115.115:80/server'
