import Player from "@/assets/js/core/characters/Player";
import { IOwnedItem } from "@/assets/js/Interfaces";
import { game } from "@/assets/js";

export default class Trade {
  id: number;
  player1: {
    instance: Player;
    offer?: IOwnedItem;
    isOfferAccepted: boolean;
  };
  player2: {
    instance: Player;
    offer?: IOwnedItem;
    isOfferAccepted: boolean;
  };

  constructor(id: number, player1: Player, player2: Player) {
    this.id = id;
    this.player1 = {
      instance: <Player>(
        game.playersList.find(
          (playerInstance) => playerInstance.id === player1.id
        )
      ),
      offer: undefined,
      isOfferAccepted: false,
    };

    this.player2 = {
      instance: <Player>(
        game.playersList.find(
          (playerInstance) => playerInstance.id === player2.id
        )
      ),
      offer: undefined,
      isOfferAccepted: false,
    };

    console.log(this);
    this.updateTradeStateListener();
  }

  updateTradeStateListener() {
    game.socket.on("synchronizeTradeState", (tradeData: Trade) => {
      this.player1.offer = tradeData.player1.offer;
      this.player1.isOfferAccepted = tradeData.player1.isOfferAccepted;
      this.player2.offer = tradeData.player2.offer;
      this.player2.isOfferAccepted = tradeData.player2.isOfferAccepted;

      console.log(this);
    });
  }

  acceptTradeOffer() {
    game.socket.emit("acceptTradeOffer");
    /*
    if (this.player1.instance.id === game.player.id) {
      this.player1.instance.playerSocket.emit("acceptTradeOffer");
    } else if (this.player2.instance.id === game.player.id) {
      this.player2.instance.playerSocket.emit("acceptTradeOffer");
    }

     */
  }
}
