import { CTX, game } from '../../index';
import Entity from './Entity';
import Enemy from './Enemy';
import {
    IItem,
    IPlayer,
    IReceivedMap,
    IStats,
    ICollisionEntity,
} from "@/assets/js/Interfaces";
import Group from './Group';
import { Statistics } from '@/assets/js/core/characters/Statistics';

export default class Player extends Entity implements IPlayer {
    testId = Math.random();
    mapData: IReceivedMap;
    hasMoved: boolean;
    currentDirection: number;
    frameCount: number;
    currentLoopIndex: number;
    static CYCLE_LOOP: number[] = [0, 1, 2, 3];
    socketId: string;

    showPlayerDropDownMenu = false;

    constructor(data: IPlayer) {
        super(data);
        this.hasMoved = data.hasMoved;
        this.mapData = data.mapData;
        //this.image.src = data.imageSrc;
        this.currentDirection = data.currentDirection;
        this.frameCount = data.frameCount;
        this.currentLoopIndex = data.currentLoopIndex;
        this.socketId = data.socketId;
        this.visible = true;
        //this.image.src = '../../../../../public/img/admin.png';
        this.image.src = `http://localhost:8080/img/${data.imageSrc}`;

        console.log(this);
        console.log('at object creation player');
    }

    addToGroup(player: Player) {
        if (!Player.arePlayersInRange(this, player)) return;
        game.socket.emit('addToGroup', player.id);
        alert(`Dodano do grupy gracza ${player.name}`);
    }

    get group() {
        if (this._group.length === 0) {
            return [this];
        } else {
            let group: Player[] = [];
            this._group.forEach((memberId) => {
                let memberInstance = <Player>(
                    game.playersList.find((player) => player.id === memberId)
                );
                group.push(memberInstance);
            });
            group = group.concat([this]);
            return group;
        }
    }

    get collider(): ICollisionEntity {
        return {
            x1: this.x,
            x2: this.x + 32,
            y1: this.y,
            y2: this.y + 32,
        };
    }

    get combatTarget(): Enemy | null {
        if (game.currentFight !== null) {
            return <Enemy>this.target;
        }
        return null;
    }

    static createOrUpdate(data: IPlayer) {
        if (game.socket.id === data.socketId) {
            if (typeof game.player === 'undefined') {
                console.log('new player created');
                game.player = new Player(data);
                game.playerGroup = new Group(game.player);
            } else {
                //Object.assign(game.player, new Player(data));
                Object.assign(game.player, data);
                game.player.statistics = Statistics.createOrUpdate(
                    data.statistics
                );
                game.player.currentDirection = data.currentDirection;
                //console.log(data);
            }
        }
        //console.log(game.player.statistics.equipment);

        if (game.map) {
            if (
                game.playersList.find(
                    (player) => player.socketId === data.socketId
                )
            ) {
                Object.assign(
                    game.playersList.find(
                        (player) => player.socketId === data.socketId
                    ),
                    data
                );
            } else {
                game.playersList.push(new Player(data));
            }
        }
    }

    static arePlayersInRange(player1: Player, player2: Player) {
        return (
            player1.x - 288 < player2.x &&
            player1.x + 288 > player2.x &&
            player1.y - 288 < player2.y &&
            player1.y + 288 > player2.y
        );
    }

    draw(): void {
        //console.log(this.image);
        CTX.drawImage(
            this.image,
            Player.CYCLE_LOOP[this.currentLoopIndex] * 32,
            this.currentDirection * 48,
            32,
            48,
            this.x + game.draw.margin.horizontal,
            this.y + game.draw.margin.vertical,
            32,
            48
        );
    }

    drawInFight(): void {
        let playerFrame;

        if (game.currentFight!.isPlayerDefender(this)) {
            playerFrame = 0;
        } else {
            playerFrame = 3 * 48;
        }

        CTX.drawImage(
            this.image,
            Player.CYCLE_LOOP[this.currentLoopIndex] * 32,
            playerFrame,
            32,
            48,
            this._positionOnGrid[0],
            this._positionOnGrid[1],
            32,
            48
        );
    }

    beginFight(enemy: Enemy | Player) {
        let playerGroup: Player[] = [];
        game.playerGroup.members.forEach((member) => {
            if (Player.arePlayersInRange(this, member)) {
                playerGroup.push(member);
            }
        });

        game.socket.emit('startCombat', {
            attackers: playerGroup,
            defenders: enemy.group,
        });
    }

    attack(enemy: Entity) {
        super.attack(enemy);
    }

    getItemFromGround(item: any) {
        game.socket.emit('getItemFromGround', item);
    }

    requestTradeWithPlayer(player: Player) {
        game.socket.emit('requestTradeWithPlayer', player.id);
    }
}
