import { IItem, IOwnedItem, IStats } from "@/assets/js/Interfaces";
import { ItemType } from '../../Enums';
import Item from '../Item';

export class Equipment {
    helmet!: IOwnedItem;
    ring!: IOwnedItem;
    amulet!: IOwnedItem;
    gloves!: IOwnedItem;
    weapon!: IOwnedItem;
    armor!: IOwnedItem;
    boots!: IOwnedItem;

    backpack: IOwnedItem[] = [];

    constructor(ownedItems: IOwnedItem[]) {
        //console.log(ownedItems);
        if (Object.keys(ownedItems).length === 0) return;
        //console.log(Object.keys(ownedItems).length === 0);
        //console.log(ownedItems);
        for (let i in ownedItems) {
            //ownedItems.forEach((item) => {
            if (ownedItems[i] === null) continue;
            Object.keys(this).forEach((property) => {
                //console.log(ownedItems[i]);
                if (ownedItems[i] instanceof Array) return;
                let ownedItem: IOwnedItem = {
                    id: ownedItems[i].id,
                    itemData: new Item(ownedItems[i].itemData),
                    fieldInEquipment: ownedItems[i].fieldInEquipment,
                };
                if (property === ownedItems[i].itemData.type) {
                    // @ts-ignore
                    this[property] = ownedItem;
                } else {
                    //console.log('backpack push');
                    this.backpack.push(ownedItem);
                }
            });
        }

        //console.log(this);

        /*
        setTimeout(() => {
            showEquipment();
        }, 1000);

         */
    }

    get equipmentStats() : IStats {
        let statsSum = {};

        Object.values(this).forEach((item: IOwnedItem | IOwnedItem[]) => {
            if (item === null || item instanceof Array) return;
            //console.log(item);
            Object.keys(item.itemData.statistics).forEach((stat) => {
                // @ts-ignore
                if (item.itemData.statistics[stat]) {
                    // @ts-ignore
                    if (!statsSum[stat]) {
                        // @ts-ignore
                        statsSum[stat] = item.itemData.statistics[stat];
                    } else {
                        // @ts-ignore
                        statsSum[stat] += item.itemData.statistics[stat];
                    }
                }
            });
        });
        return <IStats>statsSum;
    }
}
