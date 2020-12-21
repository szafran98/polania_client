import { INpc } from "@/assets/js/Interfaces";
import {CTX, game} from "@/assets/js";


export default class Npc implements INpc {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement = new Image()
    imageSrc: string
    conversationOptions: object
    conversationOptionsTree: object
    databaseId: string
    guiEvents = {
        mouseOver: false,
    };

    constructor(data: INpc) {
        this.id = data.id
        this.name = data.name
        this.x = data.x
        this.y = data.y
        this.width = data.width
        this.height = data.height
        this.imageSrc = `http://159.65.115.115/img/${data.imageSrc}`;
        this.image.src = this.imageSrc
        this.conversationOptions = data.conversationOptions
        this.conversationOptionsTree = data.conversationOptionsTree
        this.databaseId = data.databaseId

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
}