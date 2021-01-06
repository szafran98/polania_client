import Player from "./characters/Player";
import Map from "./Map";
import Fight from "./Fight";
import { Scene } from "../Enums";
import { initializeSocketListening } from "../events/socketEventHandler";
import { initializeControls } from "../controls";
import Draw from "./Draw";
import Group from "./characters/Group";
// @ts-ignore
import { playerSocket } from "@/views/GameComponent.vue";
import Trade from "@/assets/js/core/characters/Trade";
import Npc from "@/assets/js/core/characters/Npc";
import * as expToLevelTable from "./exp_table.json";
//import { initializeButtonListeners } from '@/assets/js/ui/uiDrawMethods';

export default class Game {
  // @ts-ignore
  //private _socket = io('http://localhost:2000');
  // @ts-ignore
  private _socket = playerSocket;
  public player!: Player;
  playerGroup!: Group;
  public playersList: Player[] = [];
  map!: Map;
  draw: Draw = new Draw();
  public currentFight: Fight | null = null;
  public currentTrade: Trade | null = null;
  public currentConversationWith: Npc | null = null;
  actualScene = Scene.WALK;
  showMiniMap = false;
  isPlayerDoingConversation = false;

  pendingTradeRequest = {
    state: false,
    requestPlayerName: "",
  };

  expToLevelTable = expToLevelTable;

  private static instance: Game;

  private constructor() {
    initializeSocketListening(this);
    initializeControls(this);
    //initializeChat(this);
    //initializeButtonListeners();
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  get socket(): any {
    return this._socket;
  }

  setSceneToFight(): void {
    this.actualScene = Scene.FIGHT;
  }
}
