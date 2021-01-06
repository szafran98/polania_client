import Fight from "../core/Fight";
import { CTX, game } from "../index";
import Entity from "../core/characters/Entity";

let ATTACK_BUTTON = document.getElementById("attack-btn");
let MOVE_BUTTON = document.getElementById("move-btn");

// TO DZIAŁĄ TAK MOŻE BYĆ
const fightEventHandlers = {
  bindAttackListener: () => {},
};

// ALBO MOŻE TAK LEPIEJ BO NIE TRZEBA BRAĆ FIGHT POPRZEZ GAME, ALBO CIĄGLE PRZEKAZYWAĆ
class FightEventHandler {
  fight: Fight;
  constructor(fight: Fight) {
    this.fight = fight;
  }
}

export function bindAttackListener() {
  ATTACK_BUTTON = document.getElementById("attack-btn");
  ATTACK_BUTTON!.addEventListener("click", attackButtonListener, true);
}

function attackButtonListener() {
  if (game.currentFight === null) {
    ATTACK_BUTTON!.removeEventListener("click", attackButtonListener, true);
  } else {
    if (game.currentFight.activeEntity.id === game.player.id) {
      // @ts-ignore
      if (!game.currentFight.doPlayerAttack()) {
        return;
      } else {
        game.socket.emit("playerAttack", {
          target: game.player.target,
          fightId: game.currentFight.fightId,
        });
        clearInterval(game.currentFight.timer);
        game.currentFight.isPlayerTurnTimerRunning = false;
        console.log("koniec tury");
      }
    }
  }
}

export function bindPlayerMoveListener() {
  MOVE_BUTTON = document.getElementById("move-btn");
  MOVE_BUTTON!.addEventListener("click", moveButtonListener, true);
}

function moveButtonListener() {
  if (game.currentFight === null) {
    MOVE_BUTTON?.removeEventListener("click", moveButtonListener, true);
  } else {
    if (game.currentFight.activeEntity.id === game.player.id) {
      game.socket.emit("playerMove", {
        player: game.player,
        fightId: game.currentFight.fightId,
      });
      //game.player.moveForward();
      //clearInterval(game.currentFight.timer);
      game.currentFight.isPlayerTurnTimerRunning = false;
    }
  }
}

export function bindSelectedTargetListener() {
  CTX.canvas.addEventListener("click", selectedTargetListener, true);
}

function selectedTargetListener(event: any) {
  let fight = <Fight>game.currentFight;
  if (game.currentFight === null) {
    CTX.canvas.removeEventListener("click", selectedTargetListener, true);
  } else {
    // @ts-ignore
    //let cRect = document.getElementById('ctx').getBoundingClientRect();
    console.log(fight.livingDefenders);
    fight.livingDefenders.forEach((entity) => {
      if (
        event.offsetX >= entity!.positionOnGrid[0] &&
        event.offsetX <= entity!.positionOnGrid[0] + entity!.width &&
        event.offsetY >= entity!.positionOnGrid[1] &&
        event.offsetY <= entity!.positionOnGrid[1] + entity!.height
      ) {
        console.log("target");
        game.player.target = <Entity>entity;
      }
    });
  }
}
