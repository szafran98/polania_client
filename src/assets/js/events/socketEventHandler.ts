import Map from '../core/Map';
import Game from '../core/Game';
import { Scene } from '../Enums';
import Player from '../core/characters/Player';
import Fight from '../core/Fight';

let gameInstancesList: Game[] = [];

export function initializeSocketListening(game: Game) {
    //console.log('socket initialize');
    //gameInstancesList.push(game);
    //console.log(game);
    game.socket.on('newGameData', function (data: any) {
        //console.log(data);
        //console.log('new game data');
        if (game.actualScene === Scene.WALK) {
            for (let i = data.playersData.length - 1; i >= 0; i--) {
                // @ts-ignore
                Player.createOrUpdate(data.playersData[i]);
                //console.log(data.playersData[i]);
            }
        }

        if (game.map) {
            game.draw.drawLoop();
            game.map.enemiesOnMapUpdate(data.mapData.enemiesOnMap);
            game.map.enemiesCollisionsUpdate(data.mapData.collisionMap);
            //game.map.itemsOnMap = data.mapData.itemsOnMap;
            game.map.itemsOnMapUpdate(data.mapData.itemsOnMap);
            //console.log(game);
        } else if (!game.map) {
            game.map = new Map(data.mapData);
            //game.map.itemsOnMap = data.mapData.itemsOnMap;
            game.draw.setStartingCameraMargin();
        }
    });

    game.socket.on('askPlayerForTrade', (playerName: string) => {
        game.pendingTradeRequest.requestPlayerName = playerName;
        game.pendingTradeRequest.state = true;

        console.log('ask player for trade');
    });

    game.socket.on('addedToGroup', (groupData: any) => {
        game.playerGroup.update(groupData.members, groupData.groupInitiator);
        console.log(game.playerGroup);
    });

    game.socket.on('beginCombat', (combatData: any) => {
        game.currentFight = new Fight(
            combatData._attackers,
            combatData._defenders,
            combatData.type
        );
    });

    game.socket.on('playerDisconnected', (dcSocket: any) => {
        console.log(dcSocket);
        game.playersList = game.playersList.filter((player) => {
            if (player.socketId !== dcSocket) {
                return player;
            }
        });
        console.log(game.playersList);
    });

    game.socket.on('changeHorizontalMargin', (data: number) => {
        let previousPlayerX = game.player.x;
        setTimeout(() => {
            if (game.player.x <= 256) {
                game.draw.margin.horizontal = 0;
            } else if (game.map.world.width - 288 <= game.player.x) {
                game.draw.margin.horizontal = -992;
            } else {
                let diff = 0;
                if (previousPlayerX < 256) {
                    diff = 256 - previousPlayerX;
                } else if (previousPlayerX > game.map.world.width - 288) {
                    diff = game.map.world.width - 288 - previousPlayerX;
                }
                game.draw.margin.horizontal += data + diff;
            }
        }, 100);
    });

    game.socket.on('changeVerticalMargin', (data: number) => {
        let previousPlayerY = game.player.y;
        setTimeout(() => {
            if (game.player.y <= 256) {
                game.draw.margin.vertical = 0;
            } else if (game.map.world.height - 288 <= game.player.y) {
                game.draw.margin.vertical = -game.map.world.height + 512 + 32;
            } else {
                let diff = 0;
                if (previousPlayerY < 256) {
                    diff = 256 - previousPlayerY;
                } else if (previousPlayerY > game.map.world.height - 288) {
                    diff = game.map.world.height - 288 - previousPlayerY;
                }
                game.draw.margin.vertical += data + diff;
            }
        }, 100);
    });

    game.socket.on('cameraRight', () => {
        let move = 0;
        let cameraTimer = setInterval(() => {
            move += 2;
            game.draw.margin.horizontal -= 2;
            if (move % 32 === 0) {
                clearInterval(cameraTimer);
            }
        }, 1000 / 25);
    });

    game.socket.on('cameraLeft', () => {
        let move = 0;
        let cameraTimer = setInterval(() => {
            game.draw.margin.horizontal += 2;
            move += 2;
            if (move % 32 === 0) {
                clearInterval(cameraTimer);
            }
        }, 1000 / 25);
    });

    game.socket.on('cameraUp', () => {
        let move = 0;
        let cameraTimer = setInterval(() => {
            game.draw.margin.vertical += 2;
            move += 2;
            if (move % 32 === 0) {
                clearInterval(cameraTimer);
            }
        }, 1000 / 25);
    });

    game.socket.on('cameraDown', () => {
        let move = 0;
        let cameraTimer = setInterval(() => {
            game.draw.margin.vertical -= 2;
            move += 2;
            if (move % 32 === 0) {
                clearInterval(cameraTimer);
            }
        }, 1000 / 25);
    });
}
