import Vue from 'vue';

export default class TokenDataService {
    private static TOKEN_KEY = 'token';

    static setToken(tokenData: any) {
        Vue.$cookies.set(TokenDataService.TOKEN_KEY, tokenData);
    }

    static getAccessToken() {
        try {
            return Vue.$cookies.get(TokenDataService.TOKEN_KEY);
        } catch (e) {
            throw new Error('There is no token');
        }
    }
}
