import { IItem, IStats } from "@/assets/js/Interfaces";
import { ItemType } from '@/assets/js/Enums';
import { Class } from "@/assets/js/Enums";

export default class Item implements IItem {
    id: string;
    name: string;
    type: ItemType;
    statistics: IStats;
    class: Class;
    value: number;
    requiredLevel: number;
    imageSrc!: string;
    image!: HTMLImageElement;

    constructor(itemData: IItem) {
        //console.log(itemData);
        this.id = itemData.id;
        this.name = itemData.name;
        this.type = itemData.type;
        this.statistics = itemData.statistics;
        this.class = itemData.class;
        this.value = itemData.value;
        this.requiredLevel = itemData.requiredLevel;
        if (itemData.imageSrc) {
            this.imageSrc = <string>itemData.imageSrc;
            this.image = new Image();
            this.image.src = this.imageSrc;
        }
    }
}
