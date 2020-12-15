import { IStats } from "@/assets/js/Interfaces";
import { Equipment } from './Equipment';
import { Statistic } from '../../Enums';

export class Statistics {
    _baseStats: IStats = {
        attack: 3,
        attackSpeed: 1.0,
        criticalStrikeChance: 1.0,
        criticalStrikePower: 1.0,
        strength: 3,
        dexterity: 3,
        intellect: 3,
        energy: 0,
        mana: 0,
        fireResistance: 0,
        frostResistance: 0,
        lightningResistance: 0,
        poisonResistance: 0,
        armor: 0,
        dodge: 0,
        maxHealth: undefined,
    };
    _level: number = 1;
    _experience: number = 0;
    _health?: number;

    equipment: Equipment = new Equipment(Object.create(null));

    private static instance: Statistics;

    constructor(statsData: any) {
        console.log(statsData);
        this._baseStats.attack = statsData._baseStats.attack;
        this._baseStats.attackSpeed = statsData._baseStats.attackSpeed;
        this._baseStats.criticalStrikeChance =
            statsData._baseStats.criticalStrikeChance;
        this._baseStats.criticalStrikePower =
            statsData._baseStats.criticalStrikePower;
        this._baseStats.strength = statsData._baseStats.strength;
        this._baseStats.dexterity = statsData._baseStats.dexterity;
        this._baseStats.intellect = statsData._baseStats.intellect;
        this._baseStats.energy = statsData._baseStats.energy;
        this._baseStats.mana = statsData._baseStats.mana;
        this._baseStats.fireResistance = statsData._baseStats.fireResistance;
        this._baseStats.frostResistance = statsData._baseStats.frostResistance;
        this._baseStats.lightningResistance =
            statsData._baseStats.lightningResistance;
        this._baseStats.poisonResistance =
            statsData._baseStats.poisonResistance;
        this._baseStats.armor = statsData._baseStats.armor;
        this._baseStats.dodge = statsData._baseStats.dodge;
        this.health = statsData._health;
        this._level = statsData._level;
        this._experience = statsData._experience;
        //this._baseStats = statsData;
        this._baseStats.maxHealth = this.calculateMaxHealth();
    }

    /*
    public constructor(statsData?: Statistics) {
        // POCZĄTKOWE ŻYCIE WYNIKAJĄCE WYŁĄCZNIE Z POZIOMU + 5 HP ZA KAŻDY PUNKT SIŁY + PRZELICZNIK WOJOWNIKA

        if (typeof statsData === 'undefined' || 'null') {
            //    console.log(typeof statsData);
            this._baseStats.maxHealth = Math.floor(
                20 * Math.pow(this._level, 1.25) +
                    <number>this._baseStats.strength * 5 +
                    this._level * 0.1 * <number>this._baseStats.strength
            );
            if (this._health === undefined) {
                this._health = this.maxHealth;
            }
        } else {
            //console.log(this.maxHealth);
            this._baseStats = statsData._baseStats;
            this._level = statsData._level;
            this._experience = statsData._experience;
            this._health = statsData._health;
            this.equipment = statsData.equipment;
        }
    }

     */

    public static getOrCreateInstance(initialData: Statistics): Statistics {
        if (!Statistics.instance) {
            Statistics.instance = new Statistics(initialData);
        }

        return Statistics.instance;
    }

    public static createOrUpdate(updateData: any): Statistics {
        if (!Statistics.instance) {
            Statistics.instance = new Statistics(updateData);
        } else if (Statistics.instance) {
            Statistics.instance._health = updateData._health;
            Statistics.instance._level = updateData._level;
            Statistics.instance._baseStats = updateData._baseStats;
            Statistics.instance._experience = updateData._experience;
            //Statistics.instance.equipment = new Equipment(updateData.equipment);
            //Statistics.instance.equipment = new Equipment(updateData.equipment);
            Object.assign(Statistics.instance.equipment, updateData.equipment);
            //console.log(Statistics.instance.equipment.backpack);
            //Statistics.instance._baseStats.maxHealth = Statistics.instance.calculateMaxHealth();
            //console.log(Statistics.instance.equipment);
            //console.log(Statistics.instance.calculateMaxHealth());
            //Statistics.instance. = updateData._experience
        }

        return Statistics.instance;
    }

    get allStatistics() {
        let combinedStats: IStats = {};

        Object.values(Statistic).forEach((stat) => {
            if (this.equipment.equipmentStats[stat]) {
                if (stat === Statistic.ATTACK) {
                    combinedStats[stat] = this.equipment.equipmentStats[stat];
                } else {
                    combinedStats[stat] =
                        <number>this._baseStats[stat] +
                        <number>this.equipment.equipmentStats[stat];
                }
            } else {
                combinedStats[stat] = <number>this._baseStats[stat];
            }
        });
        return combinedStats;
    }

    get maxHealth() {
        return <number>this.allStatistics.maxHealth;
    }

    get health() {
        return <number>this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    calculateMaxHealth() {
        return Math.floor(
            20 * Math.pow(this._level, 1.25) +
                <number>this.allStatistics.strength * 5 +
                this._level * 0.1 * <number>this.allStatistics.strength
        );
    }
}
