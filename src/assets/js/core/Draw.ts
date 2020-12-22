import { CTX, game } from '../index';
import Player from './characters/Player';
import { Scene } from '../Enums';
import Enemy from './characters/Enemy';
import Entity from './characters/Entity';
import { ICollisionEntity } from "@/assets/js/Interfaces";
import Fight from './Fight';
import {
    enemyUiDrawMethodsMain,
    playerUiDrawMethodsMain,
    entityUiDrawMethodsMain,
    renderHealthBar,
    renderEnemyIsTargetCircle,
    itemUiDrawMethodsMain, npcUiDrawMethodsMain,
} from '../ui/uiDrawMethods';
import Npc from "@/assets/js/core/characters/Npc";

export default class Draw {
    contextLayer?: any = document.getElementById('ctx');
    bufferContext: any = document.createElement('canvas');
    readonly playerCanvasMargin: number = 288;
    drawCollidersDEV = false;
    margin = {
        horizontal: 0,
        vertical: 0,
    };

    constructor() {
        this.contextLayer = this.contextLayer.getContext('2d');
        this.bufferContext = this.bufferContext.getContext('2d');

        this.contextLayer.imageSmoothingEnabled = false;
        //this.contextLayer.imageSmoothingQuality = 'high';
    }

    private renderTransparent(): void {
        for (let i in game.map.world.map) {
            if (i === '2') {
                for (
                    let index = game.map.world.map[i].length - 1;
                    index > -1;
                    index--
                ) {
                    let value = game.map.world.map[i][index] - 1;
                    if (value !== 0) {
                        let source_x =
                            (value % game.map.tile_sheet.columns) *
                            game.map.tile_sheet.tile_width;
                        let source_y =
                            Math.floor(value / game.map.tile_sheet.columns) *
                            game.map.tile_sheet.tile_height;

                        let destination_x =
                            (index % game.map.world.columns) *
                            game.map.tile_sheet.tile_width;
                        let destination_y =
                            Math.floor(index / game.map.world.columns) *
                            game.map.tile_sheet.tile_height;

                        this.contextLayer.drawImage(
                            game.map.tile_sheet.image,
                            source_x,
                            source_y,
                            game.map.tile_sheet.tile_width,
                            game.map.tile_sheet.tile_height,
                            destination_x + this.margin.horizontal,
                            destination_y + this.margin.vertical,
                            game.map.tile_sheet.tile_width,
                            game.map.tile_sheet.tile_height
                        );
                    }
                }
            }
        }
    }

    renderCollidersDEV(): void {
        if (this.drawCollidersDEV) {
            game.map.collisionMap.forEach((tileCollider: ICollisionEntity) => {
                this.contextLayer.fillRect(
                    tileCollider.x1 + this.margin.horizontal,
                    tileCollider.y1 + this.margin.vertical,
                    32,
                    32
                );
            });
        }
    }

    renderGuiElementsWorld(): void {
        game.map.enemiesOnMap.forEach((enemy: Enemy) => {
            enemyUiDrawMethodsMain(enemy);
        });

        game.playersList.forEach((player: Player) => {
            playerUiDrawMethodsMain(player);
        });

        game.map.itemsOnMap.forEach((item: any) => {
            itemUiDrawMethodsMain(item);
        });

        game.map.npcsOnMap.forEach((npc: Npc) => {
            //npc.guiEvents.mouseOver = true
            npcUiDrawMethodsMain(npc)
        })
    }

    renderGuiElementsFight(): void {
        renderHealthBar();
        // @ts-ignore
        if (game.player.target instanceof Entity) {
            // @ts-ignore
            renderEnemyIsTargetCircle(game.player.target);
        }
    }

    prepareMinimap(
        source_x: number,
        source_y: number,
        destination_x: number,
        destination_y: number
    ): void {
        if (game.showMiniMap) {
            this.bufferContext!.drawImage(
                game.map.tile_sheet.image,
                source_x,
                source_y,
                game.map.tile_sheet.tile_width,
                game.map.tile_sheet.tile_height,
                destination_x / 4,
                destination_y / 4,
                game.map.tile_sheet.tile_width / 4,
                game.map.tile_sheet.tile_height / 4
            );
        }
    }

    render(): void {
        game.map.tile_sheet.columns =
            game.map.tile_sheet.image.width / game.map.tile_sheet.tile_width;

        this.bufferContext!.canvas.width = 544;
        // @ts-ignore
        this.bufferContext!.canvas.height = 544;

        for (let i in game.map.world.map) {
            if (i === '3' || i === '2') break;
            for (
                let index = game.map.world.map[i].length - 1;
                index > -1;
                index--
            ) {
                let value = game.map.world.map[i][index] - 1;

                let source_x =
                    (value % game.map.tile_sheet.columns) *
                    game.map.tile_sheet.tile_width;
                let source_y =
                    Math.floor(value / game.map.tile_sheet.columns) *
                    game.map.tile_sheet.tile_height;

                let destination_x =
                    (index % game.map.world.columns) *
                    game.map.tile_sheet.tile_width;
                let destination_y =
                    Math.floor(index / game.map.world.columns) *
                    game.map.tile_sheet.tile_height;

                this.prepareMinimap(
                    source_x,
                    source_y,
                    destination_x,
                    destination_y
                );

                if (this.isTileInFieldOfView(destination_x, destination_y)) {
                    this.contextLayer.drawImage(
                        game.map.tile_sheet.image,
                        source_x,
                        source_y,
                        game.map.tile_sheet.tile_width,
                        game.map.tile_sheet.tile_height,
                        destination_x + this.margin.horizontal,
                        destination_y + this.margin.vertical,
                        game.map.tile_sheet.tile_width,
                        game.map.tile_sheet.tile_height
                    );
                }
            }
        }
    }

    renderMinimap(): void {
        // @ts-ignore
        this.bufferContext?.fillStyle = 'red';
        this.bufferContext?.fillRect(
            game.player.x / 4,
            game.player.y / 4,
            32 / 4,
            32 / 4
        );
        this.contextLayer.drawImage(this.bufferContext!.canvas, 64, 64);
        this.contextLayer.beginPath();
        this.contextLayer.rect(64, 64, (48 * 32) / 4, (48 * 32) / 4);
        this.contextLayer.stroke();
    }

    renderEntities(): void {
        // @ts-ignore
        let entitiesToDraw: any[] = game.playersList.concat(
            // @ts-ignore
            game.map.enemiesOnMap
        ).concat(game.map.npcsOnMap)

        entitiesToDraw.sort((a, b) => {
            return a.y - b.y;
        });

        //CTX.shadowColor = 'red';
        //CTX.shadowBlur = 15;
        entitiesToDraw.forEach((entity: any) => {
            entity.draw();
        });
        //CTX.shadowColor = '';
        //CTX.shadowBlur = 0;
    }

    renderFight(): void {
        try {
            this.contextLayer.drawImage(
                Fight.sceneBackground,
                Fight.sceneBackground.x,
                Fight.sceneBackground.y,
                Fight.sceneBackground.width,
                Fight.sceneBackground.width
            );

            // @ts-ignore
            let entitiesToDraw = [...game.currentFight.attackQueue];

            entitiesToDraw.sort((a, b) => {
                return a.healthBarPosition.y - b.healthBarPosition.y;
            });

            entitiesToDraw.forEach((entity) => {
                entity.drawInFight();
            });
        } finally {
        }
    }

    renderItemsOnMap() {
        game.map.itemsOnMap.forEach((itemData) => {
            let itemImage = new Image();
            itemImage.src = `http://localhost:8080/img/${itemData.item.itemData.imageSrc}`;

            this.contextLayer.drawImage(
                itemImage,
                itemData.positionOnGround.x + game.draw.margin.horizontal,
                itemData.positionOnGround.y + game.draw.margin.vertical
            );
        });
    }

    isTileInFieldOfView(destinationX: number, destinationY: number): boolean {
        if (
            (destinationX >= game.player.x - this.playerCanvasMargin &&
                destinationX <=
                    game.player.x +
                        game.player.width +
                        this.playerCanvasMargin &&
                destinationY >= game.player.y - this.playerCanvasMargin &&
                destinationY <=
                    game.player.y +
                        game.player.height +
                        this.playerCanvasMargin) ||
            game.player.x <= 288 ||
            game.player.x >= game.map.world.width - 288 ||
            game.player.y <= 288 ||
            game.player.y >= game.map.world.height - 288
        ) {
            return true;
        }
        return false;
    }

    setStartingCameraMargin(): void {
        console.log(this.margin);
        if (
            game.player.x >= 288 &&
            game.player.x <= game.map.world.width - 288
        ) {
            let diffrence = game.player.x - 256;
            this.margin.horizontal -= diffrence;
        } else if (game.player.x >= game.map.world.width - 288) {
            this.margin.horizontal -= game.map.world.width - 544;
        }

        if (
            game.player.y >= 288 &&
            game.player.y <= game.map.world.height - 288
        ) {
            let diffrence = game.player.y - 256;
            this.margin.vertical -= diffrence;
        } else if (game.player.y >= game.map.world.height - 288) {
            this.margin.vertical -= game.map.world.height - 544;
        }
        console.log(this.margin);
    }

    drawLoop(): void {
        if (game.actualScene === Scene.WALK) {
            //console.log(this.contextLayer);
            this.render();
            this.renderItemsOnMap();
            this.renderCollidersDEV();
            this.renderEntities();
            this.renderTransparent();
            this.renderGuiElementsWorld();
        } else if (game.actualScene === Scene.FIGHT) {
            this.renderFight();
            this.renderGuiElementsFight();
        }
        if (game.showMiniMap) {
            this.renderMinimap();
        }
    }
}
