import { CTX, game } from '../index';
import { IOwnedItem } from "@/assets/js/Interfaces";

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
    document.getElementById('ui').style.backgroundColor = 'white';
    // @ts-ignore
    document.getElementById('ui').style.zIndex = '4';
    // @ts-ignore
    document.getElementById('ctx').style.zIndex = '1';
}

export function setWalkModeInterface() {
    // @ts-ignore
    document.getElementById('ui').style.backgroundColor = 'white';
    // @ts-ignore
    document.getElementById('ui').style.zIndex = '-1';
    // @ts-ignore
    document.getElementById('ctx').style.zIndex = '3';
    // @ts-ignore
    //document.getElementById('body')?.focus()
    document.getElementById('attack-btn')?.blur();
}

export function addRowToFightLog(damage: number, who: string) {
    let msg = document.createElement('div');
    msg.style.height = 20 + 'px';
    msg.innerText = `${who} zadał ${damage} obrażeń`;
    document.getElementById('fight-log')?.appendChild(msg);
}

export function clearFightLog() {
    // @ts-ignore
    document.getElementById('fight-log')?.innerHTML = '';
}

export function setRoundTimer(timeleft: number) {
    // @ts-ignore
    document.getElementById('combat-timer').textContent = timeleft;
}

// TESTOWA FUNKCJA POTRZEBNY REFACTOR
export function showEquipment(itemObject: IOwnedItem) {
    let itemHint: HTMLDivElement;
    let itemData = itemObject.itemData;
    let backpackFieldId = itemObject.fieldInEquipment;

    //console.log(itemObject);
    // @ts-ignore
    /*
    document.getElementById(
        'dev-logger'
    )?.innerHTML = `<div id="eq"><img src='${game.player.statistics.equipment.weapon.imageSrc}'/></div>`;

     */

    itemHint = document.createElement('div');
    itemHint.setAttribute('id', 'item-hint');
    itemHint.setAttribute('class', 'item-hint');
    itemHint.innerHTML = `<b style="color: gold">${itemData.name}</b><br>`;
    if (typeof itemData.statistics.attack === 'number') {
        itemHint.innerHTML += `<b>Atak ${itemData.statistics.attack}</b><br>`;
    } else if (Array.isArray(itemData.statistics.attack)) {
        // @ts-ignore
        itemHint.innerHTML += `<b>Atak ${itemData.statistics.attack[0]}-${itemData.statistics.attack[1]}</b><br>`;
    }
    itemHint.innerHTML += `<b>Siła +${itemData.statistics.strength}</b><br>`;
    itemHint.innerHTML += `<b>Wymagany poziom: ${itemData.requiredLevel}</b><br>`;
    itemHint.innerHTML += `<b>Klasa: ${itemData.class}</b><br>`;
    itemHint.innerHTML += `<b>Wartość: ${itemData.value}</b>`;
    itemHint.style.position = 'absolute';
    itemHint.style.width = 'max-content';
    itemHint.style.backgroundColor = '#52231a';
    itemHint.style.borderColor = '#8f541f';
    itemHint.style.color = '#fff';
    itemHint.style.border = '3px double #a95';
    itemHint.style.padding = '3px';
    itemHint.style.fontSize = '11px';
    itemHint.style.transform = 'translateX(-30%)';
    //console.log(document.getElementsByClassName('item-hint'));
    document.getElementById(<string>backpackFieldId)?.appendChild(itemHint);
    //console.log('created item hint');
    //console.log(backpackFieldId, itemObject);
    document
        .getElementById(<string>backpackFieldId)
        ?.addEventListener('dragstart', (event) => {
            //console.log(event.target);
            try {
                document
                    .getElementById(<string>backpackFieldId)
                    ?.removeChild(itemHint);
            } catch (e) {
                //console.log(e);
            }
        });

    document
        .getElementById(<string>backpackFieldId)
        ?.addEventListener('mouseleave', (event) => {
            //console.log(event.target);
            try {
                document
                    .getElementById(<string>backpackFieldId)
                    ?.removeChild(itemHint);
            } catch (e) {
                //console.log(e);
            }
        });
}
