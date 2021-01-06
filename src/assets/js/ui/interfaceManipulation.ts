import { IOwnedItem } from "@/assets/js/Interfaces";
import Item from "@/assets/js/core/Item";
import { ItemType, ItemUnableToDressBecause } from "@/assets/js/Enums";

/*
// PRZYDATNE
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}
function isInside(pos, rect) {
    return (
        pos.x > rect.x &&
        pos.x < rect.x + rect.width &&
        pos.y < rect.y + rect.heigth &&
        pos.y > rect.y
    );
}

 */

export function setFightModeInterface() {
  // @ts-ignore
  //document.getElementById('ui').style.backgroundColor = 'white';
  // @ts-ignore
  //document.getElementById('ui').style.zIndex = '4';
  // @ts-ignore
  //document.getElementById('ctx').style.zIndex = '1';
}

export function setWalkModeInterface() {
  // @ts-ignore
  //document.getElementById('ui').style.backgroundColor = 'white';
  // @ts-ignore
  //document.getElementById('ui').style.zIndex = '-1';
  // @ts-ignore
  //document.getElementById('ctx').style.zIndex = '3';
  // @ts-ignore
  //document.getElementById('body')?.focus()
  //document.getElementById('attack-btn')?.blur();
}

export function addRowToFightLog(damage: number, who: string, whoType: string) {
  let msg = document.createElement("div");
  msg.style.height = 20 + "px";
  msg.innerText = `${who} zadał ${damage} obrażeń`;
  if (whoType === "player") {
    msg.style.backgroundColor = "#0A3301";
  } else {
    msg.style.backgroundColor = "#78140C";
  }
  msg.style.textAlign = "left";
  msg.style.margin = "2px";
  msg.style.borderRadius = "2px";
  document.getElementById("fight-log")?.appendChild(msg);
}

export function clearFightLog() {
  // @ts-ignore
  document.getElementById("fight-log")?.innerHTML = "";
}

export function setRoundTimer(timeleft: number) {
  // @ts-ignore
  document.getElementById("combat-timer").textContent = timeleft;
}

// TESTOWA FUNKCJA POTRZEBNY REFACTOR
export function showEquipment(itemObject: IOwnedItem) {
  let itemHint: HTMLDivElement;
  let itemData = itemObject.itemData;
  let backpackFieldId = itemObject.fieldInEquipment;

  let canBeDressedByPlayer = Item.canItemBeDressedByPlayer(itemObject.itemData);
  let isItemForDiffrentClass = canBeDressedByPlayer.find(
    (rule) => rule === ItemUnableToDressBecause.DIFFRENT_CLASS
  );
  let isItemForDiffrentLevel = canBeDressedByPlayer.find(
    (rule) => rule === ItemUnableToDressBecause.NOT_ENOUGH_LEVEL
  );
  console.log(Boolean(isItemForDiffrentClass), Boolean(isItemForDiffrentLevel));

  let classRequirementColor = "white";
  let levelRequirementColor = "white";
  if (isItemForDiffrentClass !== undefined) {
    console.log("item for diffrent class");
    classRequirementColor = "red";
  }
  if (isItemForDiffrentLevel !== undefined) {
    console.log("item for diffrent level");
    levelRequirementColor = "red";
  }

  //console.log(itemObject);
  // @ts-ignore
  /*
    document.getElementById(
        'dev-logger'
    )?.innerHTML = `<div id="eq"><img src='${game.player.statistics.equipment.weapon.imageSrc}'/></div>`;

     */

  itemHint = document.createElement("div");
  itemHint.setAttribute("id", "item-hint");
  itemHint.setAttribute("class", "item-hint");
  itemHint.innerHTML = `<b style="color: gold">${itemData.name}</b><br>`;

  if (typeof itemData.statistics.attack === "number") {
    itemHint.innerHTML += `<b>Atak ${itemData.statistics.attack}</b><br>`;
  } else if (Array.isArray(itemData.statistics.attack)) {
    // @ts-ignore
    itemHint.innerHTML += `<b>Atak ${itemData.statistics.attack[0]}-${itemData.statistics.attack[1]}</b><br>`;
  }
  if (itemData.statistics.strength) {
    itemHint.innerHTML += `<b>Siła +${itemData.statistics.strength}</b><br>`;
  }
  if (itemData.statistics.dexterity) {
    itemHint.innerHTML += `<b>Zręczność +${itemData.statistics.dexterity}</b><br>`;
  }
  if (itemData.statistics.intellect) {
    itemHint.innerHTML += `<b>Intelekt +${itemData.statistics.intellect}</b><br>`;
  }
  if (itemData.statistics.attackSpeed) {
    itemHint.innerHTML += `<b>Inicjatywa +${itemData.statistics.attackSpeed}</b><br>`;
  }
  if (itemData.statistics.criticalStrikeChance) {
    itemHint.innerHTML += `<b>Szansa CK +${itemData.statistics.criticalStrikeChance}</b><br>`;
  }
  if (itemData.statistics.criticalStrikePower) {
    itemHint.innerHTML += `<b>Moc CK +${itemData.statistics.criticalStrikePower}</b><br>`;
  }
  if (itemData.statistics.armor) {
    itemHint.innerHTML += `<b>Pancerz +${itemData.statistics.armor}</b><br>`;
  }
  if (itemData.statistics.fireResistance) {
    itemHint.innerHTML += `<b>Odporność <i class="fas fa-fire"></i> +${itemData.statistics.fireResistance}</b><br>`;
  }
  if (itemData.statistics.frostResistance) {
    itemHint.innerHTML += `<b>Odporność <i class="fas fa-snowflake"></i> +${itemData.statistics.frostResistance}</b><br>`;
  }
  if (itemData.statistics.lightningResistance) {
    itemHint.innerHTML += `<b>Odporność <i class="fas fa-bolt"></i> +${itemData.statistics.lightningResistance}</b><br>`;
  }
  if (itemData.statistics.poisonResistance) {
    itemHint.innerHTML += `<b>Odporność <i class="fas fa-skull-crossbones"></i> +${itemData.statistics.poisonResistance}</b><br>`;
  }
  if (itemData.statistics.dodge) {
    itemHint.innerHTML += `<b>Unik +${itemData.statistics.dodge}</b><br>`;
  }
  if (itemData.statistics.energy) {
    itemHint.innerHTML += `<b>Energia +${itemData.statistics.energy}</b><br>`;
  }
  if (itemData.statistics.mana) {
    itemHint.innerHTML += `<b>Mana +${itemData.statistics.mana}</b><br>`;
  }
  if (itemData.statistics.health) {
    itemHint.innerHTML += `<b>Życie +${itemData.statistics.health}</b><br>`;
  }

  itemHint.innerHTML += `<b style="color: ${levelRequirementColor}">Wymagany poziom: ${itemData.requiredLevel}</b><br>`;
  if (itemData.type !== ItemType.CONSUMABLE) {
    itemHint.innerHTML += `<b style="color: ${classRequirementColor}">Klasa: ${itemData.class}</b><br>`;
  }
  itemHint.innerHTML += `<b>Wartość: ${itemData.value}</b>`;

  itemHint.style.position = "fixed";
  itemHint.style.zIndex = "10";
  itemHint.style.width = "max-content";
  itemHint.style.backgroundColor = "#52231a";
  itemHint.style.borderColor = "#8f541f";
  itemHint.style.color = "#fff";
  itemHint.style.border = "3px double #a95";
  itemHint.style.padding = "3px";
  itemHint.style.fontSize = "11px";
  itemHint.style.transform = "translateX(-30%)";
  //console.log(document.getElementsByClassName('itemData-hint'));
  document.getElementById(<string>backpackFieldId)?.appendChild(itemHint);
  //console.log('created itemData hint');
  //console.log(backpackFieldId, itemObject);
  document
    .getElementById(<string>backpackFieldId)
    ?.addEventListener("dragstart", (event) => {
      //console.log(event.target);
      try {
        document.getElementById(<string>backpackFieldId)?.removeChild(itemHint);
      } catch (e) {
        //console.log(e);
      }
    });

  document
    .getElementById(<string>backpackFieldId)
    ?.addEventListener("mouseleave", (event) => {
      //console.log(event.target);
      try {
        document.getElementById(<string>backpackFieldId)?.removeChild(itemHint);
      } catch (e) {
        //console.log(e);
      }
    });
}
