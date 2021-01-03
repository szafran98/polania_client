import Player from './characters/Player';
import Enemy from './characters/Enemy';
import { CombatType, Scene } from '../Enums';
import {
    addRowToFightLog,
    clearFightLog,
    setFightModeInterface,
    setRoundTimer,
    setWalkModeInterface,
} from '../ui/interfaceManipulation';
import { game } from '../index';
import {
    bindAttackListener,
    bindPlayerMoveListener,
    bindSelectedTargetListener,
} from '../events/fightEventHandlers';
import { Statistics } from './characters/Statistics';
import Entity from './characters/Entity';

export default class Fight {
    fightId!: number;
    type: CombatType;
    _attackers!: Entity[];
    _defenders!: Entity[];
    public activeEntityId: number | null = 0;
    private actualTurn: number = 1;
    attackQueue: Entity[] = [];
    isPlayerTurnTimerRunning: boolean = false;

    timer!: any;

    static gridLayersDistance: number = 50;

    static sceneBackground: HTMLImageElement = new Image(544, 400);

    static readonly grid = [
        [
            [96, 224],
            [128, 224],
            [160, 224],
            [192, 224],
            [224, 224],
            [256, 224],
            [288, 224],
            [320, 224],
        ],
        [
            [96, 274],
            [128, 274],
            [160, 274],
            [192, 274],
            [224, 274],
            [256, 274],
            [288, 274],
            [320, 274],
        ],
        [
            [96, 324],
            [128, 324],
            [160, 324],
            [192, 324],
            [224, 324],
            [256, 324],
            [288, 324],
            [320, 324],
        ],
    ];

    constructor(attackers: Entity[], defenders: Entity[], type: CombatType) {
        game.setSceneToFight();
        Fight.sceneBackground.src = './img/fight_background.png';

        this.type = type;

        this.attackers = attackers;
        this.defenders = defenders;

        this.placeEntitiesOnGrid();

        this.getCombatStateFromServer();

        setFightModeInterface();

        bindAttackListener();
        bindSelectedTargetListener();
        bindPlayerMoveListener();

        game.socket.on('entityMoved', (data: { fightId: number; entity: any; }) => {
            if (data.fightId !== this.fightId) return;

            let entity = data.entity;
            let entityInstance = this.defenders.find(
                (entityInstance) => entityInstance.id === entity.id
            );
            if (entityInstance) {
                entityInstance._positionOnGrid[1] += 50;
            } else {
                entityInstance = this.attackers.find(
                    (entityInstance) => entityInstance.id === entity.id
                );
                //console.log(entity, this.attackers);
                entityInstance!._positionOnGrid[1] -= 50;
                //console.log(this.grid);
            }
            if (entityInstance === game.player) {
                clearInterval(this.timer);
                this.isPlayerTurnTimerRunning = false;
            }
        });

        this.fightLogListener();
        this.endCombatListener();
    }

    set attackers(attackersData: Entity[]) {
        let attackersInstances: Entity[] = [];
        attackersData.forEach((attacker) => {
            let attackerInstance = game.playersList.find(
                (player) => player.id === attacker.id
            );
            if (attackerInstance && attackerInstance.id === game.player.id) {
                attackersInstances.push(game.player);
            } else if (attackerInstance) {
                attackersInstances.push(attackerInstance);
            }
        });
        this._attackers = attackersInstances;
    }

    get attackers() {
        return this._attackers;
    }

    set defenders(defendersData: Entity[]) {
        let defendersInstances: Entity[] = [];
        defendersData.forEach((defender) => {
            let defenderInstance: Player | undefined = game.playersList.find(
                (player) => player.id === defender.id
            );
            if (defenderInstance) {
                defendersInstances.push(defenderInstance);
            } else {
                let defenderInstance = <Enemy>(
                    game.map.enemiesOnMap.find(
                        (enemy) => enemy.id === defender.id
                    )
                );
                defendersInstances.push(defenderInstance);
            }
        });
        this._defenders = defendersInstances;
    }

    get defenders() {
        return this._defenders;
    }

    private endCombatListener() {
        game.socket.on('combatEnded', () => {
            this.exitFight();
        });
    }

    private fightLogListener() {
        game.socket.on(
            'fightLogData',
            (data: { damage: number; name: string; fightId: number }) => {
                if (this.fightId !== data.fightId) return;
                let attacker = this.attackQueue.find(attacker => attacker.name === data.name)
                // TRZEBA SPRAWDZIĆ CZY JEST W DRUŻYNIE GRACZA ALE TERAZ MI SIE NIE CHCE
                if (attacker instanceof Player) {
                    addRowToFightLog(data.damage, data.name, 'player');
                } else if (attacker instanceof Enemy) {
                    addRowToFightLog(data.damage, data.name, 'enemy');
                }
            }
        );
    }

    get activeEntity() {
        return this.attackQueue[<number>this.activeEntityId];
    }

    get player() {
        return game.player;
    }

    get computerEnemies() {
        let enemies: Enemy[] = [];
        this.attackQueue.forEach((entity) => {
            if (entity instanceof Enemy) {
                enemies.push(entity);
            }
        });
        return enemies;
    }

    isPlayerDefender(player: Player) {
        let playerInstance = this.defenders.find(
            (playerInstance) => playerInstance.id === player.id
        );
        if (playerInstance) {
            return true;
        }
        return false;
    }

    placeEntitiesOnGrid() {
        let attackersLayer = 2;
        let defendersLayer = 0;
        let placeInLayerOrder = [4, 3, 5, 2, 6, 1, 7, 0];

        for (let i = 0; i < this.attackers.length; i++) {
            //console.log(this.attackers[i].positionOnGrid);
            //console.log(Fight.grid[attackersLayer][placeInLayerOrder[i]]);
            this.attackers[i]._positionOnGrid = [
                ...Fight.grid[attackersLayer][placeInLayerOrder[i]],
            ];
        }
        for (let i = 0; i < this.defenders.length; i++) {
            this.defenders[i]._positionOnGrid = [
                ...Fight.grid[defendersLayer][placeInLayerOrder[i]],
            ];
        }

        //console.log(this.attackers);
        //console.log(this.defenders);
    }

    setAttackQueue(attackQueueData: any[]) {
        let attackQueue: any[] = [];
        attackQueueData.forEach((entity: any) => {
            let getEntityInstanceIfPlayer = game.playersList.find(
                (player) => player.id === entity.id
            );
            let getEntityInstanceIfEnemy = game.map.enemiesOnMap.find(
                (enemy) => enemy.id === entity.id
            );

            if (
                getEntityInstanceIfPlayer &&
                getEntityInstanceIfPlayer.id === game.player.id
            ) {
                attackQueue.push(game.player);
            } else if (getEntityInstanceIfPlayer) {
                attackQueue.push(getEntityInstanceIfPlayer);
            } else if (getEntityInstanceIfEnemy) {
                attackQueue.push(getEntityInstanceIfEnemy);
            }
        });
        return attackQueue;
    }

    getCombatStateFromServer() {
        game.socket.on('updateFight', (data: any) => {
            if (game.currentFight !== this) return;
            if (this.attackQueue.length === 0) {
                this.attackQueue = this.setAttackQueue(data.attackQueue);
                //this.placeEntitiesOnGrid();
                this.fightId = data.fightId;
            }
            if (data.fightId !== this.fightId) return;

            this.actualTurn = data.actualTurn;
            this.activeEntityId = data.activeEntityId;

            data.attackQueue.forEach((entityData: Entity) => {
                this.attackQueue.forEach((entity: Entity) => {
                    let entityInstance = data.attackQueue.find(
                        (instance: Entity) => instance.id === entity.id
                    );
                    if (!entityInstance) {
                        if (entity === game.player.target) {
                            game.player.target = null;
                        }
                        this.attackQueue = this.attackQueue.filter(
                            (instance) => {
                                if (instance.id !== entity.id) {
                                    return instance;
                                }
                            }
                        );
                    }

                    if (entity.id === entityData.id) {
                        if (entity === game.player) {
                            Statistics.createOrUpdate(entityData.statistics)
                        } else {
                            entity.statistics = new Statistics(
                                entityData.statistics
                            );
                            entity.statistics._health =
                                entityData.statistics._health;
                        }
                    }
                });
            });

            if (
                this.activeEntity.id === game.player.id &&
                !this.isPlayerTurnTimerRunning
            ) {
                if (game.currentFight !== this) return;
                this.timer = this.setTurnTimer();
                this.isPlayerTurnTimerRunning = true;
            }
        });
    }

    setTurnTimer() {
        if (game.currentFight!.fightId !== this.fightId) return;

        let secondsToEndOfTurn = 10;
        return setInterval(() => {
            setRoundTimer(secondsToEndOfTurn);
            secondsToEndOfTurn--;
            if (secondsToEndOfTurn <= 0) {
                game.socket.emit('noPlayerAction', this.fightId);
                clearInterval(this.timer);
                this.isPlayerTurnTimerRunning = false;
            }
        }, 1000);
    }

    doPlayerAttack() {
        if (!this.player.target) {
            alert('Musisz najpierw wybrać cel ataku!');
            return false;
        }

        if (this.isEnemyInRange(<Player>this.player, this.player.target)) {
            return true;
        } else {
            return false;
        }
    }

    isEnemyInRange(attacker: Entity, defender: Entity) {
        if (
            attacker.positionOnGrid[1] - defender.positionOnGrid[1] ===
                Fight.gridLayersDistance ||
            attacker.positionOnGrid[1] - defender.positionOnGrid[1] ===
                -Fight.gridLayersDistance
        ) {
            return true;
        } else {
            alert('Musisz wykonać krok!');
            return false;
        }
    }

    exitFight() {
        this.attackers
            .concat(this.defenders)
            .forEach((entity) => (entity._positionOnGrid = null));

        clearInterval(this.timer);
        this.timer = null;
        this.attackers = [];
        this.defenders = [];
        this.activeEntityId = null;
        this.attackQueue = [];
        this.isPlayerTurnTimerRunning = false;
        game.actualScene = Scene.WALK;
        game.currentFight = null;
        clearFightLog();
        setWalkModeInterface();
        game.player.target = null;
    }
}
