import { CTX, game } from '../index';
import Enemy from '../core/characters/Enemy';
import Player from '../core/characters/Player';
//import { showAddToGroupButton } from '../ui/interfaceManipulation';
import { canvasButtonsColors } from '@/assets/js/ui/uiDrawMethods';

export default class CanvasEventHandler {
    constructor() {
        //this.enemyClickHandler();
        //this.enemyMouseOverHandler();
        //this.playerMouseOverHandler();
        //this.itemOnGroundMouseOverHandler();
        //this.getItemFromGroundClickListener();
        //this.getItemFromGroundMouseOverListener();
        //this.attackPlayerButtonClickListener();
        //this.attackPlayerButtonMouseOverListener();
        //this.addPlayerToGroupButtonClickListener();
        //this.addPlayerToGroupMouseOverListener();
        //this.tradeButtonMouseOverListener();
        //this.playerClickHandler();
        //this.itemOnGroundClickHandler();
        //this.tradeWithPlayerButtonClickListener();

        this.mouseOverEventHandler();
        this.clickEventHandler();
    }

    clickEventHandler() {
        CTX.canvas.addEventListener('click', (event: any) => {
            this.enemyClickHandler(event);
            this.getItemFromGroundClickListener(event);
            this.attackPlayerButtonClickListener(event);
            this.addPlayerToGroupButtonClickListener(event);
            this.tradeWithPlayerButtonClickListener(event);
            this.playerClickHandler(event);
            this.itemOnGroundClickHandler(event);
        });
    }

    mouseOverEventHandler() {
        CTX.canvas.addEventListener('mousemove', (event: any) => {
            this.enemyMouseOverHandler(event);
            this.playerMouseOverHandler(event);
            this.itemOnGroundMouseOverHandler(event);
            this.getItemFromGroundMouseOverListener(event);
            this.attackPlayerButtonMouseOverListener(event);
            this.addPlayerToGroupMouseOverListener(event);
            this.tradeButtonMouseOverListener(event);
        });
    }

    enemyClickHandler(event: any) {
        //CTX.canvas.addEventListener('click', (event: MouseEvent) => {
        //console.log('klik');
        game.map.enemiesOnMap.forEach((enemy: Enemy) => {
            console.log(
                event.offsetY - game.draw.margin.vertical + 12,
                enemy.y + enemy.height
            );
            if (
                event.offsetX - game.draw.margin.horizontal + 12 >= enemy.x &&
                event.offsetX - game.draw.margin.horizontal + 12 <=
                    enemy.x + enemy.width &&
                event.offsetY - game.draw.margin.vertical + 12 >= enemy.y &&
                event.offsetY - game.draw.margin.vertical + 12 <=
                    enemy.y + enemy.height &&
                enemy.isCollidedWithPlayer()
            ) {
                game.player.beginFight(enemy);
            }
        });
        //});
    }

    enemyMouseOverHandler(event: any) {
        //CTX.canvas.addEventListener('mousemove', (event: MouseEvent) => {
        let enemiesGroups: Enemy[][] = [];
        game.map.enemiesOnMap.forEach((enemy) =>
            enemiesGroups.push(enemy.group)
        );
        enemiesGroups.forEach((group) => {
            let isMouseOverGroupMember = false;
            for (let i in group) {
                if (
                    event.offsetX - game.draw.margin.horizontal >= group[i].x &&
                    event.offsetX - game.draw.margin.horizontal <=
                        group[i].x + group[i].width &&
                    event.offsetY - game.draw.margin.vertical >= group[i].y &&
                    event.offsetY - game.draw.margin.vertical <=
                        group[i].y + group[i].height
                ) {
                    isMouseOverGroupMember = true;
                    break;
                }
            }

            if (isMouseOverGroupMember) {
                group.forEach((member) => (member.guiEvents.mouseOver = true));
            } else if (!isMouseOverGroupMember) {
                group.forEach((member) => (member.guiEvents.mouseOver = false));
            }
        });
        //});
    }

    playerMouseOverHandler(event: any) {
        //CTX.canvas.addEventListener('mousemove', (event: MouseEvent) => {
        game.playersList.forEach((player: Player) => {
            if (
                event.offsetX - game.draw.margin.horizontal >= player.x &&
                event.offsetX - game.draw.margin.horizontal <=
                    player.x + player.width &&
                event.offsetY - game.draw.margin.vertical >= player.y &&
                event.offsetY - game.draw.margin.vertical <=
                    player.y + player.height
            ) {
                player.guiEvents.mouseOver = true;
            } else {
                player.guiEvents.mouseOver = false;
            }
        });
        //});
    }

    playerClickHandler(event: any) {
        //CTX.canvas.addEventListener('click', (event: MouseEvent) => {
        game.playersList.forEach((player: Player) => {
            if (player.id === game.player.id) return;
            if (
                event.offsetX - game.draw.margin.horizontal >= player.x &&
                event.offsetX - game.draw.margin.horizontal <=
                    player.x + player.width &&
                event.offsetY - game.draw.margin.vertical >= player.y &&
                event.offsetY - game.draw.margin.vertical <=
                    player.y + player.height &&
                player !== game.player
            ) {
                player.showPlayerDropDownMenu = true;
                console.log(player.showPlayerDropDownMenu);
            }
        });
        //});
    }

    itemOnGroundClickHandler(event: any) {
        //CTX.canvas.addEventListener('click', (event: MouseEvent) => {
        console.log(game.map.itemsOnMap);
        game.map.itemsOnMap.forEach((item: any) => {
            //if (player.id === game.player.id) return;
            if (
                event.offsetX - game.draw.margin.horizontal >=
                    item.positionOnGround.x &&
                event.offsetX - game.draw.margin.horizontal <=
                    item.positionOnGround.x + 32 &&
                event.offsetY - game.draw.margin.vertical >=
                    item.positionOnGround.y &&
                event.offsetY - game.draw.margin.vertical <=
                    item.positionOnGround.y + 32
            ) {
                item.showItemDropDownMenu = true;
                console.log(item.showItemDropDownMenu);
            }
        });
        //});
    }

    itemOnGroundMouseOverHandler(event: any) {
        //CTX.canvas.addEventListener('mousemove', (event: MouseEvent) => {
        game.map.itemsOnMap.forEach((item: any) => {
            if (
                event.offsetX - game.draw.margin.horizontal >=
                    item.positionOnGround.x &&
                event.offsetX - game.draw.margin.horizontal <=
                    item.positionOnGround.x + 32 &&
                event.offsetY - game.draw.margin.vertical >=
                    item.positionOnGround.y &&
                event.offsetY - game.draw.margin.vertical <=
                    item.positionOnGround.y + 32 &&
                !item.showItemDropDownMenu
            ) {
                item.guiEvents.mouseOver = true;
                //console.log(item);
            } else {
                item.guiEvents.mouseOver = false;
            }
        });
        //});
    }

    getItemFromGroundMouseOverListener(event: any) {
        // GET ITEM FROM GROUND BUTTON MOUSEMOVE
        //CTX.canvas.addEventListener('mousemove', (event: any) => {
        //console.log(game.map.itemsOnMap);
        game.map.itemsOnMap.forEach((item) => {
            let getItemButton = () => {
                return {
                    x:
                        item.positionOnGround.x +
                        game.draw.margin.horizontal -
                        32,
                    y: item.positionOnGround.y + game.draw.margin.vertical + 32,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= getItemButton().x &&
                event.offsetX <= getItemButton().x + getItemButton().width &&
                event.offsetY >= getItemButton().y &&
                event.offsetY <= getItemButton().y + getItemButton().height &&
                item.showItemDropDownMenu
            ) {
                //console.log('siema elo siemandero');
                //GET_ITEM_BUTTON_COLOR = '#59932f';
                canvasButtonsColors.GET_ITEM_BUTTON_COLOR = '#59932f';
            } else {
                //GET_ITEM_BUTTON_COLOR = '#31521A';
                canvasButtonsColors.GET_ITEM_BUTTON_COLOR = '#31521A';
            }
        });
        //});
    }

    getItemFromGroundClickListener(event: any) {
        // PLAYER ATTACK CLICK LISTENER
        //CTX.canvas.addEventListener('click', (event: MouseEvent) => {
        // GET ITEM FROM GROUND
        game.map.itemsOnMap.forEach((item: any) => {
            let getItemButton = () => {
                return {
                    x:
                        item.positionOnGround.x +
                        game.draw.margin.horizontal -
                        32,
                    y: item.positionOnGround.y + game.draw.margin.vertical + 32,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= getItemButton().x &&
                event.offsetX <= getItemButton().x + getItemButton().width &&
                event.offsetY >= getItemButton().y &&
                event.offsetY <= getItemButton().y + getItemButton().height &&
                item.showItemDropDownMenu
            ) {
                game.player.getItemFromGround(item);
                item.showItemDropDownMenu = false;
            } else {
                console.log('tu sie robi false instant');
                item.showItemDropDownMenu = false;
            }
        });
        //});
    }

    attackPlayerButtonClickListener(event: any) {
        //CTX.canvas.addEventListener('click', (event: any) => {
        // PLAYER ATTACK
        game.playersList.forEach((player) => {
            let attackButton = () => {
                return {
                    x: player.x + game.draw.margin.horizontal - player.width,
                    y: player.y + game.draw.margin.vertical + player.height,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= attackButton().x &&
                event.offsetX <= attackButton().x + attackButton().width &&
                event.offsetY >= attackButton().y &&
                event.offsetY <= attackButton().y + attackButton().height &&
                player.showPlayerDropDownMenu &&
                player.isCollidedWithPlayer()
            ) {
                game.player.beginFight(player);
                player.showPlayerDropDownMenu = false;
            }
        });
        //});
    }

    addPlayerToGroupButtonClickListener(event: any) {
        //CTX.canvas.addEventListener('click', (event: any) => {
        game.playersList.forEach((player: Player) => {
            // ADD PLAYER TO GROUP
            let addToGroupButton = () => {
                return {
                    x: player.x + game.draw.margin.horizontal - player.width,
                    y:
                        player.y +
                        game.draw.margin.vertical +
                        player.height +
                        20,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= addToGroupButton().x &&
                event.offsetX <=
                    addToGroupButton().x + addToGroupButton().width &&
                event.offsetY >= addToGroupButton().y &&
                event.offsetY <=
                    addToGroupButton().y + addToGroupButton().height &&
                player.showPlayerDropDownMenu
            ) {
                alert('zaproszono do grupy');
                game.player.addToGroup(player);
                player.showPlayerDropDownMenu = false;
            }
        });
        //});
    }

    addPlayerToGroupMouseOverListener(event: any) {
        // ADD TO GROUP MOUSEMOVE LISTENER
        //CTX.canvas.addEventListener('mousemove', (event: MouseEvent) => {
        game.playersList.forEach((player) => {
            let addToGroupButton = () => {
                return {
                    x: player.x + game.draw.margin.horizontal - player.width,
                    y:
                        player.y +
                        game.draw.margin.vertical +
                        player.height +
                        20,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= addToGroupButton().x &&
                event.offsetX <=
                    addToGroupButton().x + addToGroupButton().width &&
                event.offsetY >= addToGroupButton().y &&
                event.offsetY <=
                    addToGroupButton().y + addToGroupButton().height &&
                player.showPlayerDropDownMenu
            ) {
                //console.log('siema elo siemandero');
                //GROUP_BUTTON_COLOR = '#59932f';
                canvasButtonsColors.GROUP_BUTTON_COLOR = '#59932f';
            } else {
                //GROUP_BUTTON_COLOR = '#31521A';
                canvasButtonsColors.GROUP_BUTTON_COLOR = '#31521A';
            }
        });
        //});
    }

    attackPlayerButtonMouseOverListener(event: any) {
        //CTX.canvas.addEventListener('mousemove', (event: MouseEvent) => {
        game.playersList.forEach((player) => {
            let addToGroupButton = () => {
                return {
                    x: player.x + game.draw.margin.horizontal - player.width,
                    y: player.y + game.draw.margin.vertical + player.height,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= addToGroupButton().x &&
                event.offsetX <=
                    addToGroupButton().x + addToGroupButton().width &&
                event.offsetY >= addToGroupButton().y &&
                event.offsetY <=
                    addToGroupButton().y + addToGroupButton().height &&
                player.showPlayerDropDownMenu
            ) {
                //console.log('siema elo siemandero');
                //ATTACK_BUTTON_COLOR = '#59932f';
                canvasButtonsColors.ATTACK_BUTTON_COLOR = '#59932f';
            } else {
                //ATTACK_BUTTON_COLOR = '#31521A';
                canvasButtonsColors.ATTACK_BUTTON_COLOR = '#31521A';
            }
        });
        //});
    }

    tradeButtonMouseOverListener(event: any) {
        //CTX.canvas.addEventListener('mousemove', (event: any) => {
        game.playersList.forEach((player) => {
            let tradeButton = () => {
                return {
                    x: player.x + game.draw.margin.horizontal - player.width,
                    y:
                        player.y +
                        game.draw.margin.vertical +
                        player.height +
                        20 +
                        20,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= tradeButton().x &&
                event.offsetX <= tradeButton().x + tradeButton().width &&
                event.offsetY >= tradeButton().y &&
                event.offsetY <= tradeButton().y + tradeButton().height &&
                player.showPlayerDropDownMenu
            ) {
                //console.log('siema elo siemandero');
                //ATTACK_BUTTON_COLOR = '#59932f';
                canvasButtonsColors.TRADE_BUTTON_COLOR = '#59932f';
            } else {
                //ATTACK_BUTTON_COLOR = '#31521A';
                canvasButtonsColors.TRADE_BUTTON_COLOR = '#31521A';
            }
        });
        //});
    }

    tradeWithPlayerButtonClickListener(event: any) {
        //CTX.canvas.addEventListener('click', (event: any) => {
        game.playersList.forEach((player: Player) => {
            let tradeButton = () => {
                return {
                    x: player.x + game.draw.margin.horizontal - player.width,
                    y:
                        player.y +
                        game.draw.margin.vertical +
                        player.height +
                        20 +
                        20,
                    width: 100,
                    height: 18,
                };
            };

            if (
                event.offsetX >= tradeButton().x &&
                event.offsetX <= tradeButton().x + tradeButton().width &&
                event.offsetY >= tradeButton().y &&
                event.offsetY <= tradeButton().y + tradeButton().height &&
                player.showPlayerDropDownMenu
            ) {
                //console.log('zaproszono do handlu');
                //alert('zaproszono do handlu');
                game.player.requestTradeWithPlayer(player);

                //game.player.addToGroup(player);
                player.showPlayerDropDownMenu = false;
            }
        });
        //});
    }
}
