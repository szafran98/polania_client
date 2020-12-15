import Player from './Player';
import { game } from '../../index';

export default class Group {
    members: Player[] = [];
    groupInitiator: Player;

    constructor(groupInitiator: Player) {
        this.members.push(groupInitiator);
        this.groupInitiator = groupInitiator;
    }

    update(members: Player[], groupInitiator: Player) {
        let membersList: Player[] = [];
        members.forEach((member) => {
            let memberInstance = game.playersList.find(
                (player) => player.id === member.id
            );
            if (memberInstance) {
                membersList.push(memberInstance);
            }
        });
        this.members = membersList;
        this.groupInitiator = <Player>(
            game.playersList.find((player) => player.id === groupInitiator.id)
        );
    }
}
