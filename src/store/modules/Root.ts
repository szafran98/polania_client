import axios from 'axios';
import {
    Module,
    VuexModule,
    Mutation,
    Action,
    MutationAction,
} from 'vuex-module-decorators';
import TokenDataService from '@/services/TokenDataService';
import Item from '@/assets/js/core/Item';
import {serverIp} from "@/assets/js";

//Vue.use(Vuex);

@Module({ namespaced: true })
class Root extends VuexModule {
    loggedUserData = {
        userId: null,
        username: null,
    };
    userCharacters = [];
    selectedCharacter = null;
    popup = {
        state: false,
        content: '',
    };
    itemsAndPositions: any[] = [];
    isItemDragging = false;

    get userData() {
        return this.loggedUserData;
    }

    get characters() {
        return this.userCharacters;
    }

    get character() {
        return this.selectedCharacter;
    }

    get showPopup() {
        return this.popup;
    }

    get items() {
        return this.itemsAndPositions;
    }

    get itemDragging() {
        return this.isItemDragging;
    }

    @Mutation
    setItemDragging(value: boolean) {
        this.isItemDragging = value;
    }

    @Mutation
    storeItems(itemsData: { data: Item; field: string }[]) {
        this.itemsAndPositions = itemsData;
    }

    @Mutation
    changeItemField(fieldsData: any) {
        this.itemsAndPositions.forEach((item) => {
            //console.log(item);
            //console.log(fieldsData);
            if (item.fieldInEquipment === fieldsData.actual) {
                // console.log(item);
                item.fieldInEquipment = fieldsData.destination;
                //console.log(item);
            }
        });
    }

    @Mutation
    changePopupState(content: string) {
        this.popup.state = !this.popup.state;
        this.popup.content = content;
    }

    @Mutation
    storeLoggedUserData(userData: any) {
        this.loggedUserData = userData;
    }

    @Mutation
    storeUserCharactersData(characters: any) {
        //console.log(characters);
        this.userCharacters = characters;
    }

    @Mutation
    storeSelectedCharacter(character: any) {
        this.selectedCharacter = character;
    }


    @Action({ rawError: true })
    async getUserCharacters() {
        console.log('elo kurwa');
        await axios
            .get(
                `http://${serverIp}/character/${this.loggedUserData.userId}`,
                {
                    headers: {
                        Auth: TokenDataService.getAccessToken(),
                    },
                }
            )
            .then((res) => {
                this.context.commit(
                    'storeUserCharactersData',
                    res.data.characters
                );
                //const characters = res.data.characters;
                //return characters;
            });
    }
}

export default Root;
