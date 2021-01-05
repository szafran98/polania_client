(() => {
  "use strict";
  var e = {
      383: (e, t) => {
        var i, a, r, n, s;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.CombatType = t.ItemType = t.Statistic = t.ObjectType = t.Scene = void 0),
          ((s = t.Scene || (t.Scene = {})).WALK = "WALK"),
          (s.FIGHT = "FIGHT"),
          ((n = t.ObjectType || (t.ObjectType = {})).ENEMY = "enemy"),
          (n.NPC = "npc"),
          (n.ITEM = "item"),
          ((r = t.Statistic || (t.Statistic = {})).MAX_HEALTH = "maxHealth"),
          (r.ATTACK = "attack"),
          (r.ATTACK_SPEED = "attackSpeed"),
          (r.CRITICAL_STRIKE_CHANCE = "criticalStrikeChance"),
          (r.CRITICAL_STRIKE_POWER = "criticalStrikePower"),
          (r.STRENGTH = "strength"),
          (r.DEXTERITY = "dexterity"),
          (r.INTELLECT = "intellect"),
          (r.ENERGY = "energy"),
          (r.MANA = "mana"),
          (r.ARMOR = "armor"),
          (r.DODGE = "dodge"),
          ((a = t.ItemType || (t.ItemType = {})).HELMET = "helmet"),
          (a.ARMOR = "armor"),
          (a.WEAPON = "weapon"),
          (a.GLOVES = "gloves"),
          (a.BOOTS = "boots"),
          (a.RING = "ring"),
          (a.AMULET = "amulet"),
          ((i = t.CombatType || (t.CombatType = {}))[(i.PVE = 0)] = "PVE"),
          (i[(i.PVP = 1)] = "PVP");
      },
      802: (e, t) => {},
      861: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.initializeChat = t.chatInput = void 0);
        let i = document.getElementById("chat-text");
        t.chatInput = document.getElementById("chat-input");
        let a = document.getElementById("chat-form");
        t.initializeChat = function (e) {
          e.socket.on("addToChat", (e) => {
            i.innerHTML += `<div>${e}</div>`;
          }),
            (a.onsubmit = (i) => {
              try {
                i.preventDefault(),
                  e.socket.emit(
                    "sendMsgToServer",
                    "dssd: " + t.chatInput.value
                  ),
                  "/showColliders" ===
                    (null === t.chatInput || void 0 === t.chatInput
                      ? void 0
                      : t.chatInput.value) &&
                    (e.draw.drawCollidersDEV = !e.draw.drawCollidersDEV),
                  (t.chatInput.value = "");
              } catch (e) {
                console.log(e);
              }
            });
        };
      },
      33: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.initializeControls = void 0),
          (t.initializeControls = function (e) {
            (document.onkeydown = (t) => {
              "INPUT" !== t.target.nodeName &&
                (68 === t.keyCode
                  ? e.socket.emit("keyPress", { inputId: "right", state: !0 })
                  : 83 === t.keyCode
                  ? e.socket.emit("keyPress", { inputId: "down", state: !0 })
                  : 65 === t.keyCode
                  ? e.socket.emit("keyPress", { inputId: "left", state: !0 })
                  : 87 === t.keyCode &&
                    e.socket.emit("keyPress", { inputId: "up", state: !0 }));
            }),
              (document.onkeyup = (t) => {
                68 === t.keyCode &&
                  e.socket.emit("keyPress", { inputId: "right", state: !1 }),
                  83 === t.keyCode &&
                    e.socket.emit("keyPress", { inputId: "down", state: !1 }),
                  65 === t.keyCode &&
                    e.socket.emit("keyPress", { inputId: "left", state: !1 }),
                  87 === t.keyCode &&
                    e.socket.emit("keyPress", { inputId: "up", state: !1 });
              });
          });
      },
      620: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = i(607),
          n = i(383),
          s = a(i(917)),
          l = a(i(127)),
          o = i(580);
        t.default = class {
          constructor() {
            (this.contextLayer = document.getElementById("ctx")),
              (this.bufferContext = document.createElement("canvas")),
              (this.playerCanvasMargin = 288),
              (this.drawCollidersDEV = !1),
              (this.margin = { horizontal: 0, vertical: 0 }),
              (this.contextLayer = this.contextLayer.getContext("2d")),
              (this.bufferContext = this.bufferContext.getContext("2d"));
          }
          renderTransparent() {
            for (let e in r.game.map.world.map)
              if ("2" === e)
                for (let t = r.game.map.world.map[e].length - 1; t > -1; t--) {
                  let i = r.game.map.world.map[e][t] - 1;
                  if (0 !== i) {
                    let e =
                        (i % r.game.map.tileSheet.columns) *
                        r.game.map.tileSheet.tile_width,
                      a =
                        Math.floor(i / r.game.map.tileSheet.columns) *
                        r.game.map.tileSheet.tile_height,
                      n =
                        (t % r.game.map.world.columns) *
                        r.game.map.tileSheet.tile_width,
                      s =
                        Math.floor(t / r.game.map.world.columns) *
                        r.game.map.tileSheet.tile_height;
                    this.contextLayer.drawImage(
                      r.game.map.tileSheet.image,
                      e,
                      a,
                      r.game.map.tileSheet.tile_width,
                      r.game.map.tileSheet.tile_height,
                      n + this.margin.horizontal,
                      s + this.margin.vertical,
                      r.game.map.tileSheet.tile_width,
                      r.game.map.tileSheet.tile_height
                    );
                  }
                }
          }
          renderCollidersDEV() {
            this.drawCollidersDEV &&
              r.game.map.collisionMap.forEach((e) => {
                this.contextLayer.fillRect(
                  e.x1 + this.margin.horizontal,
                  e.y1 + this.margin.vertical,
                  32,
                  32
                );
              });
          }
          renderGuiElementsWorld() {
            r.game.map.enemiesOnMap.forEach((e) => {
              o.enemyUiDrawMethodsMain(e);
            }),
              r.game.playersList.forEach((e) => {
                o.playerUiDrawMethodsMain(e);
              });
          }
          renderGuiElementsFight() {
            o.renderHealthBar(),
              r.game.player.target instanceof s.default &&
                o.renderEnemyIsTargetCircle(r.game.player.target);
          }
          prepareMinimap(e, t, i, a) {
            r.game.showMiniMap &&
              this.bufferContext.drawImage(
                r.game.map.tileSheet.image,
                e,
                t,
                r.game.map.tileSheet.tile_width,
                r.game.map.tileSheet.tile_height,
                i / 4,
                a / 4,
                r.game.map.tileSheet.tile_width / 4,
                r.game.map.tileSheet.tile_height / 4
              );
          }
          render() {
            (r.game.map.tileSheet.columns =
              r.game.map.tileSheet.image.width /
              r.game.map.tileSheet.tile_width),
              (this.bufferContext.canvas.width = 544),
              (this.bufferContext.canvas.height = 544);
            for (let e in r.game.map.world.map) {
              if ("3" === e || "2" === e) break;
              for (let t = r.game.map.world.map[e].length - 1; t > -1; t--) {
                let i = r.game.map.world.map[e][t] - 1,
                  a =
                    (i % r.game.map.tileSheet.columns) *
                    r.game.map.tileSheet.tile_width,
                  n =
                    Math.floor(i / r.game.map.tileSheet.columns) *
                    r.game.map.tileSheet.tile_height,
                  s =
                    (t % r.game.map.world.columns) *
                    r.game.map.tileSheet.tile_width,
                  l =
                    Math.floor(t / r.game.map.world.columns) *
                    r.game.map.tileSheet.tile_height;
                this.prepareMinimap(a, n, s, l),
                  this.isTileInFieldOfView(s, l) &&
                    this.contextLayer.drawImage(
                      r.game.map.tileSheet.image,
                      a,
                      n,
                      r.game.map.tileSheet.tile_width,
                      r.game.map.tileSheet.tile_height,
                      s + this.margin.horizontal,
                      l + this.margin.vertical,
                      r.game.map.tileSheet.tile_width,
                      r.game.map.tileSheet.tile_height
                    );
              }
            }
          }
          renderMinimap() {
            var e, t;
            null === (e = this.bufferContext) ||
              void 0 === e ||
              (e.fillStyle = "red"),
              null === (t = this.bufferContext) ||
                void 0 === t ||
                t.fillRect(r.game.player.x / 4, r.game.player.y / 4, 8, 8),
              this.contextLayer.drawImage(this.bufferContext.canvas, 64, 64),
              this.contextLayer.beginPath(),
              this.contextLayer.rect(64, 64, 384, 384),
              this.contextLayer.stroke();
          }
          renderEntities() {
            let e = r.game.playersList.concat(r.game.map.enemiesOnMap);
            e.sort((e, t) => e.y - t.y),
              e.forEach((e) => {
                e.draw();
              });
          }
          renderFight() {
            try {
              this.contextLayer.drawImage(
                l.default.sceneBackground,
                l.default.sceneBackground.x,
                l.default.sceneBackground.y,
                l.default.sceneBackground.width,
                l.default.sceneBackground.width
              );
              let e = [...r.game.currentFight.attackQueue];
              e.sort((e, t) => e.healthBarPosition.y - t.healthBarPosition.y),
                e.forEach((e) => {
                  e.drawInFight();
                });
            } finally {
            }
          }
          isTileInFieldOfView(e, t) {
            return (
              (e >= r.game.player.x - this.playerCanvasMargin &&
                e <=
                  r.game.player.x +
                    r.game.player.width +
                    this.playerCanvasMargin &&
                t >= r.game.player.y - this.playerCanvasMargin &&
                t <=
                  r.game.player.y +
                    r.game.player.height +
                    this.playerCanvasMargin) ||
              r.game.player.x <= 288 ||
              r.game.player.x >= r.game.map.world.width - 288 ||
              r.game.player.y <= 288 ||
              r.game.player.y >= r.game.map.world.height - 288
            );
          }
          setStartingCameraMargin() {
            if (
              r.game.player.x >= 288 &&
              r.game.player.x <= r.game.map.world.width - 288
            ) {
              let e = r.game.player.x - 256;
              this.margin.horizontal -= e;
            } else
              r.game.player.x >= r.game.map.world.width - 288 &&
                (this.margin.horizontal -= r.game.map.world.width - 544);
            if (
              r.game.player.y >= 288 &&
              r.game.player.y <= r.game.map.world.height - 288
            ) {
              let e = r.game.player.y - 256;
              this.margin.vertical -= e;
            } else
              r.game.player.y >= r.game.map.world.height - 288 &&
                (this.margin.vertical -= r.game.map.world.height - 544);
          }
          drawLoop() {
            r.game.actualScene === n.Scene.WALK
              ? (this.render(),
                this.renderCollidersDEV(),
                this.renderEntities(),
                this.renderTransparent(),
                this.renderGuiElementsWorld())
              : r.game.actualScene === n.Scene.FIGHT &&
                (this.renderFight(), this.renderGuiElementsFight()),
              r.game.showMiniMap && this.renderMinimap();
          }
        };
      },
      127: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = a(i(71)),
          n = i(383),
          s = i(258),
          l = i(607),
          o = i(871),
          h = i(363);
        class d {
          constructor(e, t, i) {
            (this.activeEntityId = 0),
              (this.actualTurn = 1),
              (this.attackQueue = []),
              (this.isPlayerTurnTimerRunning = !1),
              l.game.setSceneToFight(),
              (d.sceneBackground.src = "./img/fight_background.png"),
              (this.type = i),
              (this.attackers = e),
              (this.defenders = t),
              this.placeEntitiesOnGrid(),
              this.getCombatStateFromServer(),
              s.setFightModeInterface(),
              o.bindAttackListener(),
              o.bindSelectedTargetListener(),
              o.bindPlayerMoveListener(),
              l.game.socket.on("entityMoved", (e) => {
                if (e.fightId !== this.fightId) return;
                let t = e.entity,
                  i = this.defenders.find((e) => e.id === t.id);
                i
                  ? (i._positionOnGrid[1] += 50)
                  : ((i = this.attackers.find((e) => e.id === t.id)),
                    (i._positionOnGrid[1] -= 50)),
                  i === l.game.player &&
                    (clearInterval(this.timer),
                    (this.isPlayerTurnTimerRunning = !1));
              }),
              this.fightLogListener(),
              this.endCombatListener();
          }
          set attackers(e) {
            let t = [];
            e.forEach((e) => {
              let i = l.game.playersList.find((t) => t.id === e.id);
              i && i.id === l.game.player.id
                ? t.push(l.game.player)
                : i && t.push(i);
            }),
              (this._attackers = t);
          }
          get attackers() {
            return this._attackers;
          }
          set defenders(e) {
            let t = [];
            e.forEach((e) => {
              let i = l.game.playersList.find((t) => t.id === e.id);
              if (i) t.push(i);
              else {
                let i = l.game.map.enemiesOnMap.find((t) => t.id === e.id);
                t.push(i);
              }
            }),
              (this._defenders = t);
          }
          get defenders() {
            return this._defenders;
          }
          endCombatListener() {
            l.game.socket.on("combatEnded", () => {
              this.exitFight();
            });
          }
          fightLogListener() {
            l.game.socket.on("fightLogData", (e) => {
              this.fightId === e.fightId &&
                s.addRowToFightLog(e.damage, e.name);
            });
          }
          get activeEntity() {
            return this.attackQueue[this.activeEntityId];
          }
          get player() {
            return l.game.player;
          }
          get computerEnemies() {
            let e = [];
            return (
              this.attackQueue.forEach((t) => {
                t instanceof r.default && e.push(t);
              }),
              e
            );
          }
          isPlayerDefender(e) {
            return !!this.defenders.find((t) => t.id === e.id);
          }
          placeEntitiesOnGrid() {
            let e = [4, 3, 5, 2, 6, 1, 7, 0];
            for (let t = 0; t < this.attackers.length; t++)
              this.attackers[t]._positionOnGrid = [...d.grid[2][e[t]]];
            for (let t = 0; t < this.defenders.length; t++)
              this.defenders[t]._positionOnGrid = [...d.grid[0][e[t]]];
          }
          setAttackQueue(e) {
            let t = [];
            return (
              e.forEach((e) => {
                let i = l.game.playersList.find((t) => t.id === e.id),
                  a = l.game.map.enemiesOnMap.find((t) => t.id === e.id);
                i && i.id === l.game.player.id
                  ? t.push(l.game.player)
                  : i
                  ? t.push(i)
                  : a && t.push(a);
              }),
              t
            );
          }
          getCombatStateFromServer() {
            l.game.socket.on("updateFight", (e) => {
              if (
                l.game.currentFight === this &&
                (0 === this.attackQueue.length &&
                  ((this.attackQueue = this.setAttackQueue(e.attackQueue)),
                  (this.fightId = e.fightId)),
                e.fightId === this.fightId &&
                  ((this.actualTurn = e.actualTurn),
                  (this.activeEntityId = e.activeEntityId),
                  e.attackQueue.forEach((t) => {
                    this.attackQueue.forEach((i) => {
                      e.attackQueue.find((e) => e.id === i.id) ||
                        (i === l.game.player.target &&
                          (l.game.player.target = null),
                        (this.attackQueue = this.attackQueue.filter((e) => {
                          if (e.id !== i.id) return e;
                        }))),
                        i.id === t.id &&
                          ((i.statistics = new h.Statistics(t.statistics)),
                          (i.statistics._health = t.statistics._health));
                    });
                  }),
                  this.activeEntity.id === l.game.player.id &&
                    !this.isPlayerTurnTimerRunning))
              ) {
                if (l.game.currentFight !== this) return;
                (this.timer = this.setTurnTimer()),
                  (this.isPlayerTurnTimerRunning = !0);
              }
            });
          }
          setTurnTimer() {
            if (l.game.currentFight.fightId !== this.fightId) return;
            let e = 10;
            return setInterval(() => {
              s.setRoundTimer(e),
                e--,
                e <= 0 &&
                  (l.game.socket.emit("noPlayerAction", this.fightId),
                  clearInterval(this.timer),
                  (this.isPlayerTurnTimerRunning = !1));
            }, 1e3);
          }
          doPlayerAttack() {
            return this.player.target
              ? !!this.isEnemyInRange(this.player, this.player.target)
              : (alert("Musisz najpierw wybrać cel ataku!"), !1);
          }
          isEnemyInRange(e, t) {
            return (
              e.positionOnGrid[1] - t.positionOnGrid[1] ===
                d.gridLayersDistance ||
              e.positionOnGrid[1] - t.positionOnGrid[1] ==
                -d.gridLayersDistance ||
              (alert("Musisz wykonać krok!"), !1)
            );
          }
          exitFight() {
            this.attackers
              .concat(this.defenders)
              .forEach((e) => (e._positionOnGrid = null)),
              clearInterval(this.timer),
              (this.timer = null),
              (this.attackers = []),
              (this.defenders = []),
              (this.activeEntityId = null),
              (this.attackQueue = []),
              (this.isPlayerTurnTimerRunning = !1),
              (l.game.actualScene = n.Scene.WALK),
              (l.game.currentFight = null),
              s.clearFightLog(),
              s.setWalkModeInterface(),
              (l.game.player.target = null);
          }
        }
        (t.default = d),
          (d.gridLayersDistance = 50),
          (d.sceneBackground = new Image(544, 400)),
          (d.grid = [
            [
              [96, 224],
              [128, 224],
              [160, 224],
              [192, 224],
              [224, 224],
              [256, 224],
              [288, 224],
              [320, 224],
            ],
            [
              [96, 274],
              [128, 274],
              [160, 274],
              [192, 274],
              [224, 274],
              [256, 274],
              [288, 274],
              [320, 274],
            ],
            [
              [96, 324],
              [128, 324],
              [160, 324],
              [192, 324],
              [224, 324],
              [256, 324],
              [288, 324],
              [320, 324],
            ],
          ]);
      },
      851: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = i(383),
          n = i(657),
          s = i(33),
          l = i(861),
          o = a(i(620));
        t.default = class {
          constructor() {
            (this._socket = io("http://localhost:2000")),
              (this.playersList = []),
              (this.draw = new o.default()),
              (this.currentFight = null),
              (this.actualScene = r.Scene.WALK),
              (this.showMiniMap = !1),
              n.initializeSocketListening(this),
              s.initializeControls(this),
              l.initializeChat(this);
          }
          get socket() {
            return this._socket;
          }
          setSceneToFight() {
            this.actualScene = r.Scene.FIGHT;
          }
        };
      },
      824: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = class {
            constructor(e) {
              (this.name = e.name),
                (this.type = e.type),
                (this.statistics = e.statistics),
                (this.class = e.class),
                (this.value = e.value),
                (this.requiredLevel = e.requiredLevel),
                e.imageSrc &&
                  ((this.imageSrc = e.imageSrc),
                  (this.image = new Image()),
                  (this.image.src = this.imageSrc));
            }
          });
      },
      151: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = a(i(71));
        t.default = class {
          constructor(e) {
            (this.collisionMap = []),
              (this.tileSheet = {
                image: new Image(),
                columns: 0,
                tile_height: 32,
                tile_width: 32,
              }),
              (this.mapLayersData = []),
              (this.enemiesOnMap = []),
              (this.collisionMap = e.collisionMap),
              (this.tilesToCollide = e.tilesToCollide),
              (this.mapLayersData = e.mapLayersData),
              (this.world = e.world),
              (this.tileSheet.image.src = e.imageSrc),
              this.createEnemies(e.enemiesOnMap);
          }
          createEnemies(e) {
            e.forEach((e) => {
              this.enemiesOnMap.push(new r.default(e));
            });
          }
          enemiesOnMapUpdate(e) {
            this.enemiesOnMap.forEach((t) => {
              e.find((e) => t.id === e.id) ||
                (this.enemiesOnMap = this.enemiesOnMap.filter((e) => e !== t));
            }),
              e.forEach((e) => {
                if (!this.enemiesOnMap.find((t) => e.id === t.id)) {
                  let t = new r.default(e);
                  this.enemiesOnMap.push(t);
                }
              });
          }
          enemiesCollisionsUpdate(e) {
            this.collisionMap.forEach((t) => {
              let i;
              try {
                i = e.find(
                  (e) =>
                    e.x1 === t.x1 &&
                    e.x2 === t.x2 &&
                    e.y1 === t.y1 &&
                    e.y2 === t.y2
                );
              } catch (e) {
                if (!i) {
                  let e = this.collisionMap.indexOf(t);
                  delete this.collisionMap[e];
                }
              }
            });
          }
        };
      },
      71: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = i(607),
          n = a(i(917));
        class s extends n.default {
          constructor(e) {
            super(e),
              (this.spawnTime = e.spawnTime),
              (this.databaseId = e.databaseId);
          }
          get group() {
            if (0 === this._group.length) return [this];
            {
              let e = [];
              return (
                this._group.forEach((t) => {
                  let i = r.game.map.enemiesOnMap.find((e) => e.id === t);
                  e.push(i);
                }),
                (e = e.concat([this])),
                e
              );
            }
          }
          draw() {
            r.CTX.drawImage(
              this.image,
              this.x + r.game.draw.margin.horizontal,
              this.y + r.game.draw.margin.vertical,
              this.width,
              this.height
            );
          }
          drawInFight() {
            r.CTX.drawImage(
              this.image,
              this._positionOnGrid[0],
              this._positionOnGrid[1],
              this.width,
              this.height
            );
          }
          createCollisionMap() {
            return 64 === this.width
              ? [
                  {
                    x1: this.x,
                    x2: this.x + this.width / 2,
                    y1: this.y,
                    y2: this.y + this.height / 2,
                  },
                  {
                    x1: this.x + this.width / 2,
                    x2: this.x + this.width,
                    y1: this.y,
                    y2: this.y + this.height / 2,
                  },
                ]
              : this.collider;
          }
          attack(e) {
            super.attack(e);
          }
          chooseTarget(e) {
            this.target = e[Math.floor(Math.random() * e.length)];
          }
        }
        t.default = s;
      },
      917: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = i(363),
          n = a(i(974)),
          s = i(607);
        t.default = class {
          constructor(e) {
            (this.image = new Image()),
              (this.statistics = new r.Statistics(void 0)),
              (this.guiEvents = { mouseOver: !1 }),
              (this._positionOnGrid = null),
              (this._group = []),
              (this.id = e.id),
              (this.name = e.name),
              (this.x = e.x),
              (this.y = e.y),
              (this.width = e.width),
              (this.height = e.height),
              (this.visible = e.visible),
              (this._group = e._group),
              (this.imageSrc = e.imageSrc),
              (this.image.src = e.imageSrc);
          }
          get healthBarPosition() {
            return { x: this.positionOnGrid[0], y: this.positionOnGrid[1] };
          }
          set positionOnGrid(e) {
            this._positionOnGrid = e;
          }
          get positionOnGrid() {
            return this._positionOnGrid;
          }
          get mapCoordinates() {
            return { x: Math.floor(this.x / 32), y: Math.floor(this.y / 32) };
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
            let e = s.game.player;
            return (
              (e.x < this.x &&
                this.collider.x1 - e.collider.x2 < 5 &&
                this.collider.y1 === e.collider.y1) ||
              (e.x > this.x &&
                e.collider.x1 - this.collider.x2 < 5 &&
                this.collider.y1 === e.collider.y1) ||
              (e.y < this.y &&
                this.collider.x1 <= e.collider.x1 &&
                e.collider.x1 < this.collider.x2 &&
                this.collider.y1 - e.collider.y2 < 5) ||
              (e.y > this.y &&
                this.collider.x1 <= e.collider.x1 &&
                e.collider.x1 < this.collider.x2 &&
                this.collider.y1 - e.collider.y2 < 5)
            );
          }
          draw() {
            throw new n.default(this.constructor.name);
          }
          drawInFight() {
            throw new n.default(this.constructor.name);
          }
          attack(e) {
            throw new n.default(this.constructor.name);
          }
          moveForward() {
            throw new n.default(this.constructor.name);
          }
        };
      },
      958: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Equipment = void 0);
        const r = i(383),
          n = a(i(824));
        t.Equipment = class {
          constructor() {
            (this.helmet = new n.default({
              name: "Hełm",
              type: r.ItemType.HELMET,
              statistics: { armor: 2 },
              class: "wojownik",
              value: 10,
              requiredLevel: 1,
            })),
              (this.ring = new n.default({
                name: "pierek",
                type: r.ItemType.RING,
                statistics: { strength: 2 },
                class: "wojownik",
                value: 10,
                requiredLevel: 1,
              })),
              (this.amulet = new n.default({
                name: "amulet",
                type: r.ItemType.AMULET,
                statistics: { maxHealth: 10 },
                class: "wojownik",
                value: 10,
                requiredLevel: 1,
              })),
              (this.gloves = new n.default({
                name: "rekawice",
                type: r.ItemType.GLOVES,
                statistics: { strength: 1 },
                class: "wojownik",
                value: 10,
                requiredLevel: 1,
              })),
              (this.armor = new n.default({
                name: "zbroja",
                type: r.ItemType.ARMOR,
                statistics: { strength: 3, armor: 10 },
                class: "wojownik",
                value: 10,
                requiredLevel: 1,
              })),
              (this.boots = new n.default({
                name: "buty",
                type: r.ItemType.BOOTS,
                statistics: { armor: 1 },
                class: "wojownik",
                value: 10,
                requiredLevel: 1,
              })),
              (this.weapon = new n.default({
                name: "miecz",
                type: r.ItemType.WEAPON,
                statistics: { attack: [7, 9], strength: 1 },
                class: "wojownik",
                value: 10,
                requiredLevel: 1,
                imageSrc: "./img/miecz.png",
              }));
          }
          get equipmentStats() {
            let e = {};
            return (
              Object.values(this).forEach((t) => {
                Object.keys(t.statistics).forEach((i) => {
                  t.statistics[i] &&
                    (e[i]
                      ? (e[i] += t.statistics[i])
                      : (e[i] = t.statistics[i]));
                });
              }),
              e
            );
          }
        };
      },
      40: (e, t, i) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = i(607);
        t.default = class {
          constructor(e) {
            (this.members = []),
              this.members.push(e),
              (this.groupInitiator = e);
          }
          update(e, t) {
            let i = [];
            e.forEach((e) => {
              let t = a.game.playersList.find((t) => t.id === e.id);
              t && i.push(t);
            }),
              (this.members = i),
              (this.groupInitiator = a.game.playersList.find(
                (e) => e.id === t.id
              ));
          }
        };
      },
      632: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const r = i(607),
          n = a(i(917)),
          s = a(i(40));
        class l extends n.default {
          constructor(e) {
            super(e),
              (this.showPlayerDropDownMenu = !1),
              (this.hasMoved = e.hasMoved),
              (this.mapData = e.mapData),
              (this.image.src = e.imageSrc),
              (this.currentDirection = e.currentDirection),
              (this.frameCount = e.frameCount),
              (this.currentLoopIndex = e.currentLoopIndex),
              (this.socketId = e.socketId),
              (this.visible = !0);
          }
          addToGroup(e) {
            l.arePlayersInRange(this, e) &&
              (r.game.socket.emit("addToGroup", e.id),
              alert("Dodano do grupy gracza " + e.name));
          }
          get group() {
            if (0 === this._group.length) return [this];
            {
              let e = [];
              return (
                this._group.forEach((t) => {
                  let i = r.game.playersList.find((e) => e.id === t);
                  e.push(i);
                }),
                (e = e.concat([this])),
                e
              );
            }
          }
          get collider() {
            return { x1: this.x, x2: this.x + 32, y1: this.y, y2: this.y + 32 };
          }
          get combatTarget() {
            return null !== r.game.currentFight ? this.target : null;
          }
          static createOrUpdate(e) {
            r.game.socket.id === e.socketId &&
              (void 0 === r.game.player
                ? ((r.game.player = new l(e)),
                  (r.game.playerGroup = new s.default(r.game.player)))
                : Object.assign(r.game.player, new l(e))),
              r.game.map &&
                (r.game.playersList.find((t) => t.socketId === e.socketId)
                  ? Object.assign(
                      r.game.playersList.find((t) => t.socketId === e.socketId),
                      e
                    )
                  : r.game.playersList.push(new l(e)));
          }
          static arePlayersInRange(e, t) {
            return (
              e.x - 288 < t.x &&
              e.x + 288 > t.x &&
              e.y - 288 < t.y &&
              e.y + 288 > t.y
            );
          }
          draw() {
            r.CTX.drawImage(
              this.image,
              32 * l.CYCLE_LOOP[this.currentLoopIndex],
              48 * this.currentDirection,
              32,
              48,
              this.x + r.game.draw.margin.horizontal,
              this.y + r.game.draw.margin.vertical,
              32,
              48
            );
          }
          drawInFight() {
            let e;
            (e = r.game.currentFight.isPlayerDefender(this) ? 0 : 144),
              r.CTX.drawImage(
                this.image,
                32 * l.CYCLE_LOOP[this.currentLoopIndex],
                e,
                32,
                48,
                this._positionOnGrid[0],
                this._positionOnGrid[1],
                32,
                48
              );
          }
          beginFight(e) {
            let t = [];
            r.game.playerGroup.members.forEach((e) => {
              l.arePlayersInRange(this, e) && t.push(e);
            }),
              r.game.socket.emit("startCombat", {
                attackers: t,
                defenders: e.group,
              });
          }
          attack(e) {
            super.attack(e);
          }
        }
        (t.default = l), (l.CYCLE_LOOP = [0, 1, 2, 3]);
      },
      363: (e, t, i) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Statistics = void 0);
        const a = i(958),
          r = i(383);
        t.Statistics = class {
          constructor(e) {
            (this._baseStats = {
              attack: 3,
              attackSpeed: 1,
              criticalStrikeChance: 1,
              criticalStrikePower: 1,
              strength: 3,
              dexterity: 3,
              intellect: 3,
              energy: 0,
              mana: 0,
              resistance: { fire: 0, frost: 0, lightning: 0, poison: 0 },
              armor: 0,
              dodge: 0,
              maxHealth: void 0,
            }),
              (this._level = 1),
              (this._experience = 0),
              (this.equipment = new a.Equipment()),
              (this._baseStats.maxHealth = Math.floor(
                20 * Math.pow(this._level, 1.25) +
                  5 * this._baseStats.strength +
                  0.1 * this._level * this._baseStats.strength
              )),
              (this._health = this.maxHealth);
          }
          get allStatistics() {
            let e = {};
            return (
              Object.values(r.Statistic).forEach((t) => {
                this.equipment.equipmentStats[t]
                  ? t === r.Statistic.ATTACK
                    ? (e[t] = this.equipment.equipmentStats[t])
                    : (e[t] =
                        this._baseStats[t] + this.equipment.equipmentStats[t])
                  : (e[t] = this._baseStats[t]);
              }),
              e
            );
          }
          get maxHealth() {
            return this.allStatistics.maxHealth;
          }
          get health() {
            return this._health;
          }
          set health(e) {
            this._health = e;
          }
        };
      },
      898: (e, t, i) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = i(607);
        t.default = class {
          constructor() {
            this.enemyClickHandler(),
              this.enemyMouseOverHandler(),
              this.playerClickHandler(),
              this.playerMouseOverHandler();
          }
          enemyClickHandler() {
            a.CTX.canvas.addEventListener("click", (e) => {
              a.game.map.enemiesOnMap.forEach((t) => {
                e.offsetX - a.game.draw.margin.horizontal + 12 >= t.x &&
                  e.offsetX - a.game.draw.margin.horizontal + 12 <=
                    t.x + t.width &&
                  e.offsetY - a.game.draw.margin.vertical + 12 >= t.y &&
                  e.offsetY - a.game.draw.margin.vertical + 12 <=
                    t.y + t.height &&
                  t.isCollidedWithPlayer() &&
                  a.game.player.beginFight(t);
              });
            });
          }
          enemyMouseOverHandler() {
            a.CTX.canvas.addEventListener("mousemove", (e) => {
              let t = [];
              a.game.map.enemiesOnMap.forEach((e) => t.push(e.group)),
                t.forEach((t) => {
                  let i = !1;
                  for (let r in t)
                    if (
                      e.offsetX - a.game.draw.margin.horizontal >= t[r].x &&
                      e.offsetX - a.game.draw.margin.horizontal <=
                        t[r].x + t[r].width &&
                      e.offsetY - a.game.draw.margin.vertical >= t[r].y &&
                      e.offsetY - a.game.draw.margin.vertical <=
                        t[r].y + t[r].height
                    ) {
                      i = !0;
                      break;
                    }
                  i
                    ? t.forEach((e) => (e.guiEvents.mouseOver = !0))
                    : i || t.forEach((e) => (e.guiEvents.mouseOver = !1));
                });
            });
          }
          playerMouseOverHandler() {
            a.CTX.canvas.addEventListener("mousemove", (e) => {
              a.game.playersList.forEach((t) => {
                e.offsetX - a.game.draw.margin.horizontal >= t.x &&
                e.offsetX - a.game.draw.margin.horizontal <= t.x + t.width &&
                e.offsetY - a.game.draw.margin.vertical >= t.y &&
                e.offsetY - a.game.draw.margin.vertical <= t.y + t.height
                  ? (t.guiEvents.mouseOver = !0)
                  : (t.guiEvents.mouseOver = !1);
              });
            });
          }
          playerClickHandler() {
            a.CTX.canvas.addEventListener("click", (e) => {
              a.game.playersList.forEach((t) => {
                t.id !== a.game.player.id &&
                  e.offsetX - a.game.draw.margin.horizontal >= t.x &&
                  e.offsetX - a.game.draw.margin.horizontal <= t.x + t.width &&
                  e.offsetY - a.game.draw.margin.vertical >= t.y &&
                  e.offsetY - a.game.draw.margin.vertical <= t.y + t.height &&
                  t !== a.game.player &&
                  (t.showPlayerDropDownMenu = !0);
              });
            });
          }
        };
      },
      871: (e, t, i) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.bindSelectedTargetListener = t.bindPlayerMoveListener = t.bindAttackListener = void 0);
        const a = i(607),
          r = document.getElementById("attack-btn"),
          n = document.getElementById("move-btn");
        function s() {
          if (null === a.game.currentFight)
            r.removeEventListener("click", s, !0);
          else if (a.game.currentFight.activeEntity.id === a.game.player.id) {
            if (!a.game.currentFight.doPlayerAttack()) return;
            a.game.socket.emit("playerAttack", {
              target: a.game.player.target,
              fightId: a.game.currentFight.fightId,
            }),
              clearInterval(a.game.currentFight.timer),
              (a.game.currentFight.isPlayerTurnTimerRunning = !1),
              console.log("koniec tury");
          }
        }
        function l() {
          null === a.game.currentFight
            ? null == n || n.removeEventListener("click", l, !0)
            : a.game.currentFight.activeEntity.id === a.game.player.id &&
              (a.game.socket.emit("playerMove", {
                player: a.game.player,
                fightId: a.game.currentFight.fightId,
              }),
              (a.game.currentFight.isPlayerTurnTimerRunning = !1));
        }
        function o(e) {
          let t = a.game.currentFight;
          null === a.game.currentFight
            ? a.CTX.canvas.removeEventListener("click", o, !0)
            : t.defenders.forEach((t) => {
                e.offsetX >= t.positionOnGrid[0] &&
                  e.offsetX <= t.positionOnGrid[0] + t.width &&
                  e.offsetY >= t.positionOnGrid[1] &&
                  e.offsetY <= t.positionOnGrid[1] + t.height &&
                  (console.log("target"), (a.game.player.target = t));
              });
        }
        (t.bindAttackListener = function () {
          r.addEventListener("click", s, !0);
        }),
          (t.bindPlayerMoveListener = function () {
            n.addEventListener("click", l, !0);
          }),
          (t.bindSelectedTargetListener = function () {
            a.CTX.canvas.addEventListener("click", o, !0);
          });
      },
      657: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.initializeSocketListening = void 0);
        const r = a(i(151)),
          n = i(383),
          s = a(i(632)),
          l = a(i(127));
        t.initializeSocketListening = function (e) {
          e.socket.on("newGameData", function (t) {
            if (e.actualScene === n.Scene.WALK)
              for (let e = t.playersData.length - 1; e >= 0; e--)
                s.default.createOrUpdate(t.playersData[e]);
            e.map
              ? (e.draw.drawLoop(),
                e.map.enemiesOnMapUpdate(t.mapData.enemiesOnMap),
                e.map.enemiesCollisionsUpdate(t.mapData.collisionMap))
              : e.map ||
                ((e.map = new r.default(t.mapData)),
                e.draw.setStartingCameraMargin());
          }),
            e.socket.on("addedToGroup", (t) => {
              e.playerGroup.update(t.members, t.groupInitiator),
                console.log(e.playerGroup);
            }),
            e.socket.on("beginCombat", (t) => {
              e.currentFight = new l.default(
                t._attackers,
                t._defenders,
                t.type
              );
            }),
            e.socket.on("playerDisconnected", (t) => {
              e.playersList = e.playersList.filter((e) => {
                if (e.socketId !== t) return e;
              });
            }),
            e.socket.on("changeHorizontalMargin", (t) => {
              let i = e.player.x;
              setTimeout(() => {
                if (e.player.x <= 256) e.draw.margin.horizontal = 0;
                else if (e.map.world.width - 288 <= e.player.x)
                  e.draw.margin.horizontal = -992;
                else {
                  let a = 0;
                  i < 256
                    ? (a = 256 - i)
                    : i > e.map.world.width - 288 &&
                      (a = e.map.world.width - 288 - i),
                    (e.draw.margin.horizontal += t + a);
                }
              }, 100);
            }),
            e.socket.on("changeVerticalMargin", (t) => {
              let i = e.player.y;
              setTimeout(() => {
                if (e.player.y <= 256) e.draw.margin.vertical = 0;
                else if (e.map.world.height - 288 <= e.player.y)
                  e.draw.margin.vertical = 512 - e.map.world.height + 32;
                else {
                  let a = 0;
                  i < 256
                    ? (a = 256 - i)
                    : i > e.map.world.height - 288 &&
                      (a = e.map.world.height - 288 - i),
                    (e.draw.margin.vertical += t + a);
                }
              }, 100);
            }),
            e.socket.on("cameraRight", () => {
              let t = 0,
                i = setInterval(() => {
                  (t += 2),
                    (e.draw.margin.horizontal -= 2),
                    t % 32 == 0 && clearInterval(i);
                }, 40);
            }),
            e.socket.on("cameraLeft", () => {
              let t = 0,
                i = setInterval(() => {
                  (e.draw.margin.horizontal += 2),
                    (t += 2),
                    t % 32 == 0 && clearInterval(i);
                }, 40);
            }),
            e.socket.on("cameraUp", () => {
              let t = 0,
                i = setInterval(() => {
                  (e.draw.margin.vertical += 2),
                    (t += 2),
                    t % 32 == 0 && clearInterval(i);
                }, 40);
            }),
            e.socket.on("cameraDown", () => {
              let t = 0,
                i = setInterval(() => {
                  (e.draw.margin.vertical -= 2),
                    (t += 2),
                    t % 32 == 0 && clearInterval(i);
                }, 40);
            });
        };
      },
      607: function (e, t, i) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.CTX = t.game = void 0);
        const r = a(i(851)),
          n = i(861),
          s = a(i(898));
        (window.onload = function () {
          (t.CTX = document.getElementById("ctx").getContext("2d")),
            (t.CTX.font = "14px Arial bold"),
            (t.game = new r.default()),
            console.log(t.game),
            new s.default(),
            t.game.socket.emit("setPlayerName", "szafran");
        }),
          document.addEventListener("keydown", (e) => {
            "m" === e.key &&
              document.activeElement !== n.chatInput &&
              (t.game.showMiniMap = !t.game.showMiniMap);
          });
      },
      258: (e, t, i) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.showEquipment = t.setRoundTimer = t.clearFightLog = t.addRowToFightLog = t.setWalkModeInterface = t.setFightModeInterface = void 0);
        const a = i(607);
        (t.setFightModeInterface = function () {
          (document.getElementById("ui").style.backgroundColor = "white"),
            (document.getElementById("ui").style.zIndex = "4"),
            (document.getElementById("ctx").style.zIndex = "1");
        }),
          (t.setWalkModeInterface = function () {
            var e;
            (document.getElementById("ui").style.backgroundColor = "white"),
              (document.getElementById("ui").style.zIndex = "-1"),
              (document.getElementById("ctx").style.zIndex = "3"),
              null === (e = document.getElementById("attack-btn")) ||
                void 0 === e ||
                e.blur();
          }),
          (t.addRowToFightLog = function (e, t) {
            var i;
            let a = document.createElement("div");
            (a.style.height = "20px"),
              (a.innerText = `${t} zadał ${e} obrażeń`),
              null === (i = document.getElementById("fight-log")) ||
                void 0 === i ||
                i.appendChild(a);
          }),
          (t.clearFightLog = function () {
            var e;
            null === (e = document.getElementById("fight-log")) ||
              void 0 === e ||
              (e.innerHTML = "");
          }),
          (t.setRoundTimer = function (e) {
            document.getElementById("dev-logger").textContent = e;
          }),
          (t.showEquipment = function () {
            var e, t, i;
            let r;
            null === (e = document.getElementById("dev-logger")) ||
              void 0 === e ||
              (e.innerHTML = `<div id="eq"><img src='${a.game.player.statistics.equipment.weapon.imageSrc}'/></div>`),
              null === (t = document.getElementById("eq")) ||
                void 0 === t ||
                t.addEventListener("mouseenter", () => {
                  var e;
                  (r = document.createElement("div")),
                    (r.innerHTML = `<b style="color: gold">${a.game.player.statistics.equipment.weapon.name}</b><br>`),
                    "number" ==
                    typeof a.game.player.statistics.equipment.weapon.statistics
                      .attack
                      ? (r.innerHTML += `<b>Atak ${a.game.player.statistics.equipment.weapon.statistics.attack}</b><br>`)
                      : (r.innerHTML += `<b>Atak ${a.game.player.statistics.equipment.weapon.statistics.attack[0]}-${a.game.player.statistics.equipment.weapon.statistics.attack[1]}</b><br>`),
                    (r.innerHTML += `<b>Siła +${a.game.player.statistics.equipment.weapon.statistics.strength}</b><br>`),
                    (r.innerHTML += `<b>Wymagany poziom: ${a.game.player.statistics.equipment.weapon.requiredLevel}</b><br>`),
                    (r.innerHTML += `<b>Klasa: ${a.game.player.statistics.equipment.weapon.class}</b><br>`),
                    (r.innerHTML += `<b>Wartość: ${a.game.player.statistics.equipment.weapon.value}</b>`),
                    (r.style.position = "absolute"),
                    (r.style.width = "max-content"),
                    (r.style.backgroundColor = "#52231a"),
                    (r.style.borderColor = "#8f541f"),
                    (r.style.color = "#fff"),
                    (r.style.border = "3px double #a95"),
                    (r.style.padding = "3px"),
                    (r.style.fontSize = "11px"),
                    (r.style.transform = "translateX(-30%)"),
                    null === (e = document.getElementById("eq")) ||
                      void 0 === e ||
                      e.appendChild(r);
                }),
              null === (i = document.getElementById("eq")) ||
                void 0 === i ||
                i.addEventListener("mouseleave", () => {
                  var e;
                  null === (e = document.getElementById("eq")) ||
                    void 0 === e ||
                    e.removeChild(r);
                });
          });
      },
      580: (e, t, i) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.showAttackPlayerButton = t.showAddToGroupButton = t.renderHealthBar = t.renderEnemyIsTargetCircle = t.entityUiDrawMethodsMain = t.playerUiDrawMethodsMain = t.enemyUiDrawMethodsMain = void 0);
        const a = i(607);
        function r(e) {
          let t = () => ({
            x: e.x + a.game.draw.margin.horizontal - e.width,
            y: e.y + a.game.draw.margin.vertical + e.height + 20,
            width: 100,
            height: 18,
          });
          a.CTX.beginPath(),
            a.CTX.rect(t().x, t().y, t().width, t().height),
            (a.CTX.fillStyle = "#31521A"),
            a.CTX.fill(),
            (a.CTX.lineWidth = 1),
            (a.CTX.strokeStyle = "#000000"),
            a.CTX.stroke(),
            a.CTX.closePath(),
            (a.CTX.font = "12px serif"),
            (a.CTX.fillStyle = "#fff"),
            (a.CTX.textBaseline = "top"),
            a.CTX.fillText("Zaproś do grupy", t().x + 10, t().y + 3);
        }
        function n(e) {
          let t = () => ({
            x: e.x + a.game.draw.margin.horizontal - e.width,
            y: e.y + a.game.draw.margin.vertical + e.height,
            width: 100,
            height: 18,
          });
          a.CTX.beginPath(),
            a.CTX.rect(t().x, t().y, t().width, t().height),
            (a.CTX.fillStyle = "#31521A"),
            a.CTX.fill(),
            (a.CTX.lineWidth = 1),
            (a.CTX.strokeStyle = "#000000"),
            a.CTX.stroke(),
            a.CTX.closePath(),
            (a.CTX.font = "12px serif"),
            (a.CTX.fillStyle = "#fff"),
            (a.CTX.textBaseline = "top"),
            a.CTX.fillText("Atakuj", t().x + 35, t().y + 3);
        }
        (t.enemyUiDrawMethodsMain = function (e) {
          e.guiEvents.mouseOver &&
            ((function (e) {
              let t = new Path2D();
              (a.CTX.strokeStyle = "black"),
                t.arc(
                  e.collider.x1 + e.width / 2 + a.game.draw.margin.horizontal,
                  e.collider.y2 - 5 + a.game.draw.margin.vertical,
                  20,
                  0,
                  2 * Math.PI
                ),
                a.CTX.stroke(t);
            })(e),
            (function (e) {
              (a.CTX.font = "12px serif"), (a.CTX.textBaseline = "top");
              let t = Math.floor(a.CTX.measureText(e.name).width);
              (a.CTX.fillStyle = "#52231a"),
                a.CTX.fillRect(
                  e.x + a.game.draw.margin.horizontal + e.width / 8,
                  e.y + a.game.draw.margin.vertical - e.height / 2,
                  2 * t,
                  30
                ),
                (a.CTX.strokeStyle = "#8f541f"),
                a.CTX.strokeRect(
                  e.x + a.game.draw.margin.horizontal + 2 + e.width / 8,
                  e.y + a.game.draw.margin.vertical - e.height / 2 + 2,
                  2 * t - 4,
                  26
                ),
                (a.CTX.fillStyle = "#fff"),
                a.CTX.fillText(
                  e.name,
                  e.x + a.game.draw.margin.horizontal + t / 2 + e.width / 8,
                  e.y + a.game.draw.margin.vertical - e.height / 2 + 5
                ),
                (a.CTX.font = "10px serif"),
                a.CTX.fillText(
                  "Lvl: " + e.statistics._level,
                  e.x +
                    a.game.draw.margin.horizontal +
                    t / 2 +
                    t / 8 +
                    e.width / 8,
                  e.y + a.game.draw.margin.vertical - e.height / 2 + 15
                );
            })(e));
        }),
          (t.playerUiDrawMethodsMain = function (e) {
            e.guiEvents.mouseOver &&
              (function (e) {
                (a.CTX.font = "12px serif"), (a.CTX.textBaseline = "top");
                let t = Math.floor(a.CTX.measureText(e.name).width);
                (a.CTX.fillStyle = "#52231a"),
                  a.CTX.fillRect(
                    e.x + a.game.draw.margin.horizontal - e.width / 2,
                    e.y + a.game.draw.margin.vertical - e.height,
                    2 * t,
                    30
                  ),
                  (a.CTX.strokeStyle = "#8f541f"),
                  a.CTX.strokeRect(
                    e.x + a.game.draw.margin.horizontal + 2 - e.width / 2,
                    e.y + a.game.draw.margin.vertical - e.height + 2,
                    2 * t - 4,
                    26
                  ),
                  (a.CTX.fillStyle = "#fff"),
                  a.CTX.fillText(
                    e.name,
                    e.x + a.game.draw.margin.horizontal + t / 2 - e.width / 2,
                    e.y + a.game.draw.margin.vertical - e.height + 5
                  ),
                  (a.CTX.font = "10px serif"),
                  a.CTX.fillText(
                    "Lvl: " + e.statistics._level,
                    e.x +
                      a.game.draw.margin.horizontal +
                      t / 2 +
                      t / 8 -
                      e.width / 2,
                    e.y + a.game.draw.margin.vertical - e.height + 15
                  );
              })(e),
              e.showPlayerDropDownMenu && (r(e), n(e));
          }),
          (t.entityUiDrawMethodsMain = function (e) {
            e.guiEvents.mouseOver;
          }),
          (t.renderEnemyIsTargetCircle = function (e) {
            let t = new Path2D();
            (a.CTX.strokeStyle = "red"),
              t.arc(
                e._positionOnGrid[0] + e.width / 2,
                e._positionOnGrid[1] + e.height / 2,
                35,
                0,
                2 * Math.PI
              ),
              a.CTX.stroke(t);
          }),
          (t.renderHealthBar = function () {
            var e;
            null === (e = a.game.currentFight) ||
              void 0 === e ||
              e.attackQueue.forEach((e) => {
                e._positionOnGrid &&
                  ((a.CTX.fillStyle = "green"),
                  a.CTX.fillRect(
                    e.healthBarPosition.x - 9,
                    e.healthBarPosition.y - 10,
                    e.statistics._health,
                    4
                  ),
                  (a.CTX.fillStyle = "red"),
                  a.CTX.fillRect(
                    e.healthBarPosition.x + e.statistics._health - 9,
                    e.healthBarPosition.y - 10,
                    50 - e.statistics._health,
                    4
                  ));
              });
          }),
          (t.showAddToGroupButton = r),
          (t.showAttackPlayerButton = n);
      },
      974: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.arrayEquals = void 0),
          (t.arrayEquals = function (e, t) {
            return (
              Array.isArray(e) &&
              Array.isArray(t) &&
              e.length === t.length &&
              e.every((e, i) => e === t[i])
            );
          });
        class i extends Error {
          constructor(e) {
            super(e), (this.name = "NotImplementedError");
          }
        }
        t.default = i;
      },
    },
    t = {};
  function i(a) {
    if (t[a]) return t[a].exports;
    var r = (t[a] = { exports: {} });
    return e[a].call(r.exports, r, r.exports, i), r.exports;
  }
  i(851),
    i(607),
    i(861),
    i(632),
    i(33),
    i(657),
    i(620),
    i(71),
    i(898),
    i(871),
    i(802);
})();
