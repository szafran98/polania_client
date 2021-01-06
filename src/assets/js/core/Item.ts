import { IItem, IStats } from "@/assets/js/Interfaces";
import { ItemType } from "@/assets/js/Enums";
import { Class } from "@/assets/js/Enums";
import { ItemUnableToDressBecause } from "@/assets/js/Enums";
import * as classDefinitions from "@/assets/js/core/class_definitions.json";
import { game } from "@/assets/js";

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

  static canItemBeDressedByPlayer(itemData: IItem) {
    let notFulfilledCriteria = [];
    let playerClassDefinition = classDefinitions.definitions[game.player.class];
    if (itemData.class !== game.player.class) {
      notFulfilledCriteria.push(ItemUnableToDressBecause.DIFFRENT_CLASS);
    } else if (itemData.requiredLevel > game.player.statistics._level) {
      notFulfilledCriteria.push(ItemUnableToDressBecause.NOT_ENOUGH_LEVEL);
    }

    return notFulfilledCriteria;
  }
}
