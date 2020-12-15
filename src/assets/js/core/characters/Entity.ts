import { Statistics } from './Statistics';
import NotImplementedError from '../../utils/utils';
import { game } from '../../index';
import { IEntity } from "@/assets/js/Interfaces";

export default class Entity {
    id: string;
    readonly name: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    visible: boolean;
    image: HTMLImageElement = new Image();
    imageSrc: string;
    statistics: Statistics;
    guiEvents = {
        mouseOver: false,
    };
    _positionOnGrid: any = null;
    _group = [];

    target!: Entity | null;

    constructor(data: IEntity) {
        this.id = data.id;
        this.name = data.name;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.visible = data.visible;
        this._group = data._group;
        this.imageSrc = `http://localhost:8080/img/${data.imageSrc}`;
        this.image.src = data.imageSrc;

        this.statistics = new Statistics(data.statistics);
    }

    get healthBarPosition() {
        return {
            x: this.positionOnGrid[0],
            y: this.positionOnGrid[1],
        };
    }

    set positionOnGrid(positionOnGrid: any) {
        this._positionOnGrid = positionOnGrid;
    }

    get positionOnGrid() {
        return this._positionOnGrid;
    }

    get mapCoordinates() {
        return {
            x: Math.floor(this.x / 32),
            y: Math.floor(this.y / 32),
        };
    }

    get collider() {
        return {
            x1: this.x,
            x2: this.x + this.width,
            y1: this.y,
            y2: this.y + this.height,
        };
    }

    isCollidedWithPlayer() {
        let player = game.player;

        if (
            player.x < this.x &&
            this.collider.x1 - player.collider.x2 < 5 &&
            this.collider.y1 === player.collider.y1
        ) {
            return true;
        } else if (
            player.x > this.x &&
            player.collider.x1 - this.collider.x2 < 5 &&
            this.collider.y1 === player.collider.y1
        ) {
            return true;
        } else if (
            player.y < this.y &&
            this.collider.x1 <= player.collider.x1 &&
            player.collider.x1 < this.collider.x2 &&
            this.collider.y1 - player.collider.y2 < 5
        ) {
            return true;
        } else if (
            player.y > this.y &&
            this.collider.x1 <= player.collider.x1 &&
            player.collider.x1 < this.collider.x2 &&
            this.collider.y1 - player.collider.y2 < 5
        ) {
            return true;
        }
        return false;
    }

    draw() {
        throw new NotImplementedError(this.constructor.name);
    }

    drawInFight() {
        throw new NotImplementedError(this.constructor.name);
    }

    attack(enemy: Entity) {
        throw new NotImplementedError(this.constructor.name);
    }

    moveForward() {
        throw new NotImplementedError(this.constructor.name);
    }
}
