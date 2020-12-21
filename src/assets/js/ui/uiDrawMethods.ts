import html2canvas from 'html2canvas';
import { CTX, game } from '../index';
import Enemy from '../core/characters/Enemy';
import Player from '../core/characters/Player';
import Entity from '../core/characters/Entity';
import Npc from "@/assets/js/core/characters/Npc";

export function enemyUiDrawMethodsMain(enemy: Enemy) {
    if (enemy.guiEvents.mouseOver) {
        renderEnemyMapCircle(enemy);
        renderEnemyNameHint(enemy);
    }
}

export function playerUiDrawMethodsMain(player: Player) {
    if (player.guiEvents.mouseOver) {
        renderPlayerNameHint(player);
    }

    if (player.showPlayerDropDownMenu) {
        showAddToGroupButton(player);
        showAttackPlayerButton(player);
        showTradeButton(player);
        console.log('show dropdown menu');
    }
}

export function entityUiDrawMethodsMain(entity: Entity) {
    if (entity.guiEvents.mouseOver) {
        //renderEntityNameHint(entity)
    }
}

export function itemUiDrawMethodsMain(item: any) {
    if (item.guiEvents.mouseOver) {
        renderItemOnGroundHint(item);
    }

    if (item.showItemDropDownMenu) {
        showGetItemButton(item);
    }
}

export function npcUiDrawMethodsMain(npc: Npc) {
    if (npc.guiEvents.mouseOver) {
        renderNpcNameHint(npc)
    }
}

function renderNpcNameHint(npc: Npc) {
    CTX.font = '12px serif';
    CTX.textBaseline = 'top';

    let len = Math.floor(CTX.measureText(npc.name).width);

    CTX.fillStyle = '#52231a';
    CTX.fillRect(
        npc.x + game.draw.margin.horizontal - npc.width / 2,
        npc.y + game.draw.margin.vertical - npc.height / 2,
        2 * len,
        30
    );

    CTX.strokeStyle = '#8f541f';
    CTX.strokeRect(
        npc.x + game.draw.margin.horizontal + 2 - npc.width / 2,
        npc.y + game.draw.margin.vertical - npc.height / 2 + 2,
        2 * len - 4,
        30 - 4
    );

    CTX.fillStyle = '#fff';
    CTX.fillText(
        npc.name,
        npc.x + game.draw.margin.horizontal + len / 2 - npc.width / 2,
        npc.y + game.draw.margin.vertical - npc.height / 2 + 5
    );

    /*
    CTX.font = '10px serif';
    CTX.fillText(
        `Lvl: ${entity.statistics._level}`,
        entity.x +
        game.draw.margin.horizontal +
        len / 2 +
        len / 8 -
        entity.width / 2,
        entity.y + game.draw.margin.vertical - entity.height + 15
    );

     */
}

function renderEnemyMapCircle(enemy: Enemy) {
    let circle = new Path2D();
    CTX.strokeStyle = 'black';
    circle.arc(
        enemy.collider.x1 + enemy.width / 2 + game.draw.margin.horizontal,
        enemy.collider.y2 - 5 + game.draw.margin.vertical,
        20,
        0,
        Math.PI * 2
    );
    CTX.stroke(circle);
}

export function renderEnemyIsTargetCircle(enemy: Entity) {
    let circle = new Path2D();
    CTX.strokeStyle = 'red';
    circle.arc(
        enemy._positionOnGrid[0] + enemy.width / 2,
        enemy._positionOnGrid[1] + enemy.height / 2,
        35,
        0,
        Math.PI * 2
    );
    CTX.stroke(circle);
}

function renderEnemyNameHint(enemy: Enemy) {
    CTX.font = '12px serif';
    CTX.textBaseline = 'top';

    let len = Math.floor(CTX.measureText(enemy.name).width);

    CTX.fillStyle = '#52231a';
    CTX.fillRect(
        enemy.x + game.draw.margin.horizontal + enemy.width / 8,
        enemy.y + game.draw.margin.vertical - enemy.height / 2,
        2 * len,
        30
    );

    CTX.strokeStyle = '#8f541f';
    CTX.strokeRect(
        enemy.x + game.draw.margin.horizontal + 2 + enemy.width / 8,
        enemy.y + game.draw.margin.vertical - enemy.height / 2 + 2,
        2 * len - 4,
        30 - 4
    );

    CTX.fillStyle = '#fff';
    CTX.fillText(
        enemy.name,
        enemy.x + game.draw.margin.horizontal + len / 2 + enemy.width / 8,
        enemy.y + game.draw.margin.vertical - enemy.height / 2 + 5
    );

    CTX.font = '10px serif';
    CTX.fillText(
        `Lvl: ${enemy.statistics._level}`,
        enemy.x +
            game.draw.margin.horizontal +
            len / 2 +
            len / 8 +
            enemy.width / 8,
        enemy.y + game.draw.margin.vertical - enemy.height / 2 + 15
    );
}

function renderPlayerNameHint(entity: Entity) {
    CTX.font = '12px serif';
    CTX.textBaseline = 'top';

    let len = Math.floor(CTX.measureText(entity.name).width);

    CTX.fillStyle = '#52231a';
    CTX.fillRect(
        entity.x + game.draw.margin.horizontal - entity.width / 2,
        entity.y + game.draw.margin.vertical - entity.height,
        2 * len,
        30
    );

    CTX.strokeStyle = '#8f541f';
    CTX.strokeRect(
        entity.x + game.draw.margin.horizontal + 2 - entity.width / 2,
        entity.y + game.draw.margin.vertical - entity.height + 2,
        2 * len - 4,
        30 - 4
    );

    CTX.fillStyle = '#fff';
    CTX.fillText(
        entity.name,
        entity.x + game.draw.margin.horizontal + len / 2 - entity.width / 2,
        entity.y + game.draw.margin.vertical - entity.height + 5
    );

    CTX.font = '10px serif';
    CTX.fillText(
        `Lvl: ${entity.statistics._level}`,
        entity.x +
            game.draw.margin.horizontal +
            len / 2 +
            len / 8 -
            entity.width / 2,
        entity.y + game.draw.margin.vertical - entity.height + 15
    );
}

function renderItemOnGroundHint(item: any) {
    // TO MUSI BYĆ PRERENDEROWANE, BO ZACINA
    try {
        if (
            typeof item.image === 'undefined' &&
            document.getElementsByClassName('item-hint').length < 1
        ) {
            let itemHint = document.createElement('div');

            itemHint.setAttribute('id', 'item-hint');
            itemHint.setAttribute('class', 'item-hint');
            itemHint.innerHTML = `<b style="color: gold">${item.item.itemData.name}</b><br>`;
            if (typeof item.item.itemData.statistics.attack === 'number') {
                itemHint.innerHTML += `<b>Atak ${item.item.itemData.statistics.attack}</b><br>`;
            } else if (Array.isArray(item.item.itemData.statistics.attack)) {
                // @ts-ignore
                itemHint.innerHTML += `<b>Atak ${item.item.itemData.statistics.attack[0]}-${item.item.itemData.statistics.attack[1]}</b><br>`;
            }
            itemHint.innerHTML += `<b>Siła +${item.item.itemData.statistics.strength}</b><br>`;
            itemHint.innerHTML += `<b>Wymagany poziom: ${item.item.itemData.requiredLevel}</b><br>`;
            itemHint.innerHTML += `<b>Klasa: ${item.item.itemData.class}</b><br>`;
            itemHint.innerHTML += `<b>Wartość: ${item.item.itemData.value}</b>`;
            itemHint.style.position = 'absolute';
            itemHint.style.width = 'max-content';
            itemHint.style.backgroundColor = '#52231a';
            itemHint.style.borderColor = '#8f541f';
            itemHint.style.color = '#fff';
            itemHint.style.border = '3px double #a95';
            itemHint.style.padding = '3px';
            itemHint.style.fontSize = '11px';
            itemHint.style.transform = 'translateX(-30%)';
            //itemHint.style.visibility = 'hidden';
            itemHint.style.zIndex = '-5';
            document.body.appendChild(itemHint);

            //console.log('ee kurwa');
            html2canvas(itemHint)
                .then(function (canvas) {
                    //console.log('item hint generated');
                    let itemStatsHint = new Image();
                    itemStatsHint.src = canvas.toDataURL();
                    item.image = itemStatsHint;
                })
                .then(() =>
                    document.body.removeChild(
                        document.getElementById('item-hint')!
                    )
                );
        } else {
            //console.log(item.image.width, item.image.height);
            CTX.drawImage(
                item.image,
                item.positionOnGround.x +
                    game.draw.margin.horizontal -
                    item.image.width / 2 +
                    16,
                item.positionOnGround.y +
                    game.draw.margin.vertical +
                    item.image.height / 2 -
                    16
            );
        }
    } catch (e) {
        console.log(e);
        //console.log(item);
    }

    /*
    for (let stat in itemStatistics) {
        CTX.fillText(
            `${}`,
            item.positionOnGround.x +
            game.draw.margin.horizontal +
            len / 2 +
            len / 8 -
            32 / 2,
            item.positionOnGround.y + game.draw.margin.vertical - 32 + 15
        );
    }
    
     */

    /*
    // ITEM ATTACK
    CTX.fillText(
        `${item.item.itemData.statistics.attack}`,
        item.positionOnGround.x +
            game.draw.margin.horizontal +
            len / 2 +
            len / 8 -
            32 / 2,
        item.positionOnGround.y + game.draw.margin.vertical - 32 + 15
    );

     */

    // ITEM CLASS

    // ITEM REQUIRED LEVEL

    // ITEM VALUE
}

export function renderHealthBar() {
    game.currentFight?.attackQueue.forEach((entity) => {
        if (!entity._positionOnGrid) return;
        CTX.fillStyle = 'green';
        CTX.fillRect(
            entity.healthBarPosition.x - 9,
            entity.healthBarPosition.y - 10,
            entity.statistics._health,
            4
        );

        CTX.fillStyle = 'red';
        CTX.fillRect(
            entity.healthBarPosition.x + entity.statistics._health - 9,
            entity.healthBarPosition.y - 10,
            50 - <number>entity.statistics._health,
            4
        );
    });
}
/*
let isAddToGroupButtonListenerEnabled = false;
let player;
let addToGroupButton = () => {
    return {
        x: player.x + game.draw.margin.horizontal - player.width,
        y: player.y + game.draw.margin.vertical + player.height,
        width: 100,
        height: 18,
    };
};

 */

export let canvasButtonsColors = {
    GROUP_BUTTON_COLOR: '#31521A',
    ATTACK_BUTTON_COLOR: '#31521A',
    GET_ITEM_BUTTON_COLOR: '#31521A',
    TRADE_BUTTON_COLOR: '#31521A',
};

function showTradeButton(player: Player) {
    let tradeButton = () => {
        return {
            x: player.x + game.draw.margin.horizontal - player.width,
            y: player.y + game.draw.margin.vertical + player.height + 20 + 20,
            width: 100,
            height: 18,
        };
    };

    CTX.beginPath();
    CTX.rect(
        tradeButton().x,
        tradeButton().y,
        tradeButton().width,
        tradeButton().height
    );

    CTX.fillStyle = canvasButtonsColors.TRADE_BUTTON_COLOR;

    CTX.fill();
    CTX.lineWidth = 1;
    CTX.strokeStyle = '#000000';
    CTX.stroke();
    CTX.closePath();
    CTX.font = '12px serif';
    CTX.fillStyle = '#fff';
    CTX.textBaseline = 'top';
    CTX.fillText('Handel', tradeButton().x + 35, tradeButton().y + 3);
}

export function showAddToGroupButton(player: Player) {
    //player = PLAYER;
    let addToGroupButton = () => {
        return {
            x: player.x + game.draw.margin.horizontal - player.width,
            y: player.y + game.draw.margin.vertical + player.height + 20,
            width: 100,
            height: 18,
        };
    };

    CTX.beginPath();
    CTX.rect(
        addToGroupButton().x,
        addToGroupButton().y,
        addToGroupButton().width,
        addToGroupButton().height
    );
    CTX.fillStyle = canvasButtonsColors.GROUP_BUTTON_COLOR;

    CTX.fill();
    CTX.lineWidth = 1;
    CTX.strokeStyle = '#000000';
    CTX.stroke();
    CTX.closePath();
    CTX.font = '12px serif';
    CTX.fillStyle = '#fff';
    CTX.textBaseline = 'top';
    CTX.fillText(
        'Zaproś do grupy',
        addToGroupButton().x + 10,
        addToGroupButton().y + 3
    );
}

export function showAttackPlayerButton(player: Player) {
    //player = PLAYER;
    let addToGroupButton = () => {
        return {
            x: player.x + game.draw.margin.horizontal - player.width,
            y: player.y + game.draw.margin.vertical + player.height,
            width: 100,
            height: 18,
        };
    };

    CTX.beginPath();
    CTX.rect(
        addToGroupButton().x,
        addToGroupButton().y,
        addToGroupButton().width,
        addToGroupButton().height
    );
    CTX.fillStyle = canvasButtonsColors.ATTACK_BUTTON_COLOR;

    CTX.fill();
    CTX.lineWidth = 1;
    CTX.strokeStyle = '#000000';
    CTX.stroke();
    CTX.closePath();
    CTX.font = '12px serif';
    CTX.fillStyle = '#fff';
    CTX.textBaseline = 'top';
    CTX.fillText('Atakuj', addToGroupButton().x + 35, addToGroupButton().y + 3);
}

export function showGetItemButton(item: any) {
    let getItemButton = () => {
        return {
            x: item.positionOnGround.x + game.draw.margin.horizontal - 32,
            y: item.positionOnGround.y + game.draw.margin.vertical + 32,
            width: 100,
            height: 18,
        };
    };

    CTX.beginPath();
    //CTX.rect(getItemButton());

    CTX.rect(
        getItemButton().x,
        getItemButton().y,
        getItemButton().width,
        getItemButton().height
    );

    CTX.fillStyle = canvasButtonsColors.GET_ITEM_BUTTON_COLOR;

    CTX.fill();
    CTX.lineWidth = 1;
    CTX.strokeStyle = '#000000';
    CTX.stroke();
    CTX.closePath();
    CTX.font = '12px serif';
    CTX.fillStyle = '#fff';
    CTX.textBaseline = 'top';
    CTX.fillText('Podnieś', getItemButton().x + 35, getItemButton().y + 3);
}

/*
export function initializeButtonListeners() {
    // GET ITEM FROM GROUND BUTTON MOUSEMOVE
    CTX.canvas.addEventListener('mousemove', (event: any) => {
        console.log(game.map.itemsOnMap);
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
                GET_ITEM_BUTTON_COLOR = '#59932f';
            } else {
                GET_ITEM_BUTTON_COLOR = '#31521A';
            }
        });
    });

    // PLAYER ATTACK CLICK LISTENER
    CTX.canvas.addEventListener('click', (event: MouseEvent) => {
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
                item.showItemDropDownMenu = false;
            }
        });

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
            } else {
                player.showPlayerDropDownMenu = false;
            }
        });
    });

    // ADD TO GROUP MOUSEMOVE LISTENER
    CTX.canvas.addEventListener('mousemove', (event: MouseEvent) => {
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
                GROUP_BUTTON_COLOR = '#59932f';
            } else {
                GROUP_BUTTON_COLOR = '#31521A';
            }
        });
    });

    // ATTACK BUTTON MOUSEMOVE LISTENER
    CTX.canvas.addEventListener('mousemove', (event: MouseEvent) => {
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
                ATTACK_BUTTON_COLOR = '#59932f';
            } else {
                ATTACK_BUTTON_COLOR = '#31521A';
            }
        });
    });
}

 */
