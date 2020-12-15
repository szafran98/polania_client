import { CTX, game } from '../../index';
import Entity from './Entity';
import { IEnemy } from "@/assets/js/Interfaces";

export default class Enemy extends Entity implements IEnemy {
    spawnTime: number;
    databaseId: string;

    constructor(data: IEnemy) {
        super(data);
        this.spawnTime = data.spawnTime;
        this.databaseId = data.databaseId;
        this.image.src = `http://165.22.18.233/img/${data.imageSrc}`;
    }

    get group(): Enemy[] {
        if (this._group.length === 0) {
            return [this];
        } else {
            let group: Enemy[] = [];
            this._group.forEach((memberId) => {
                let memberInstance = <Enemy>(
                    game.map.enemiesOnMap.find((enemy) => enemy.id === memberId)
                );
                group.push(memberInstance);
            });
            group = group.concat([this]);
            return group;
        }
    }

    draw() {
        CTX.drawImage(
            this.image,
            this.x + game.draw.margin.horizontal,
            this.y + game.draw.margin.vertical,
            this.width,
            this.height
        );
    }

    drawInFight() {
        CTX.drawImage(
            this.image,
            this._positionOnGrid[0],
            this._positionOnGrid[1],
            this.width,
            this.height
        );
    }

    public createCollisionMap() {
        if (this.width === 64) {
            return [
                {
                    x1: this.x,
                    x2: this.x + this.width / 2,
                    y1: this.y,
                    y2: this.y + this.height / 2,
                },
                {
                    x1: this.x + this.width / 2,
                    x2: this.x + this.width,
                    y1: this.y,
                    y2: this.y + this.height / 2,
                },
            ];
        } else {
            return this.collider;
        }
    }

    /*
    moveForward() {
        this.positionOnGrid = [
            this._positionOnGrid[0],
            this._positionOnGrid[1] + 50,
        ];
    }

     */

    attack(enemy: Entity) {
        super.attack(enemy);
    }

    chooseTarget(enemies: Entity[]) {
        this.target = enemies[Math.floor(Math.random() * enemies.length)];
    }
}
