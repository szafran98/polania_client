import Enemy from './characters/Enemy';
import {
    ICollisionEntity,
    IEnemy,
    IMapData,
    IMapWorld, INpc,
} from "@/assets/js/Interfaces";
import Npc from "@/assets/js/core/characters/Npc";

export default class Map {
    collisionMap: ICollisionEntity[] = [];
    tilesToCollide: number[];
    tile_sheet = {
        image: new Image(),
        columns: 0,
        tile_height: 32,
        tile_width: 32,
    };
    mapLayersData: number[][] = [];
    world: IMapWorld;
    enemiesOnMap: Enemy[] = [];
    npcsOnMap: any[] = []
    itemsOnMap: any[];

    constructor(mapData: IMapData) {
        this.collisionMap = mapData.collisionMap;
        this.tilesToCollide = mapData.tilesToCollide;
        this.mapLayersData = mapData.mapLayersData;
        this.world = mapData.world;
        this.tile_sheet.image.src = mapData.imageSrc;
        this.createEnemies(mapData.enemiesOnMap);
        this.createNpcs(mapData.npcsOnMap)
        this.itemsOnMap = mapData.itemsOnMap;

        //this.npcsOnMap = mapData.npcsOnMap
    }

    createNpcs(npcsData: INpc[]): void {
        npcsData.forEach(npcData => {
            this.npcsOnMap.push(new Npc(npcData))
        })
        console.log(this.npcsOnMap)
    }

    createEnemies(enemiesData: IEnemy[]): void {
        //console.log(enemiesData);
        enemiesData.forEach((enemyData) => {
            this.enemiesOnMap.push(new Enemy(enemyData));
        });
        console.log(this.enemiesOnMap);
    }

    enemiesOnMapUpdate(enemiesData: Enemy[]): void {
        this.enemiesOnMap.forEach((enemy) => {
            let newEnemyData = enemiesData.find(
                (enemyData) => enemy.id === enemyData.id
            );
            if (!newEnemyData) {
                this.enemiesOnMap = this.enemiesOnMap.filter((livingEnemy) => {
                    return livingEnemy !== enemy;
                });
            }
        });

        enemiesData.forEach((enemyData) => {
            let actualEnemyData = this.enemiesOnMap.find(
                (enemy) => enemyData.id === enemy.id
            );

            if (!actualEnemyData) {
                //console.log(enemyData);
                let enemy = new Enemy(enemyData);
                this.enemiesOnMap.push(enemy);
            }
        });
    }

    enemiesCollisionsUpdate(colliderData: ICollisionEntity[]): void {
        this.collisionMap.forEach((collider) => {
            let newColliderData;
            try {
                newColliderData = colliderData.find((colliderData) => {
                    return (
                        colliderData.x1 === collider.x1 &&
                        colliderData.x2 === collider.x2 &&
                        colliderData.y1 === collider.y1 &&
                        colliderData.y2 === collider.y2
                    );
                });
            } catch (e) {
                if (!newColliderData) {
                    let enemyIdInList = this.collisionMap.indexOf(collider);
                    delete this.collisionMap[enemyIdInList];
                }
            }
        });
    }

    itemsOnMapUpdate(itemsData: any[]) {
        itemsData.forEach((itemData) => {
            let isItemDataAlready = this.itemsOnMap.find(
                (item) => item.id === itemData.id
            );

            if (!isItemDataAlready) {
                this.itemsOnMap.push(itemData);
            }
        });

        this.itemsOnMap.forEach((itemInstance) => {
            let isItemStillOnMap = itemsData.find(
                (item) => item.id === itemInstance.id
            );

            if (!isItemStillOnMap) {
                let instanceIndex = this.itemsOnMap.indexOf(itemInstance);

                if (instanceIndex > -1) {
                    this.itemsOnMap.splice(instanceIndex, 1);
                }

                //delete this.itemsOnMap[instanceIndex];
            }
        });

    }
}
