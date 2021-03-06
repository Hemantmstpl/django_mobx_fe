import { createStore } from '../../store';
import history from '../../utils/history';
import { AuthLoginServices } from './services';

import { LoginPostParams, AuthLoginStoresInterface } from './stores'
// import AuthTokenResponse = AuthApi.AuthTokenResponse;

export class AuthLoginActions {

    public static async authorize(): Promise<void> {
        const { store } = createStore();
        const login: AuthLoginStoresInterface = store.authStore.login;
        login.isLoading = true;

        try {
            const tokenResponse = await AuthLoginServices.getToken(login.authData);
            localStorage.setItem('token', tokenResponse.data.access);
            localStorage.setItem('refresh', tokenResponse.data.refresh);
            login.accessToken = tokenResponse.data.access;
            login.refreshToken = tokenResponse.data.refresh;
            history.push('/restaurent');
            // window.location.assign('/tickets');
        } catch (error) {
            // login.errorObject = error?.body ? error.body : error;
            console.log(error);
        }

        login.isLoading = false;
    }

    public static async refreshTokens(): Promise<void> {
        const { store } = createStore();
        const login: AuthLoginStoresInterface = store.authStore.login;
        login.isLoading = true;
    
            try {
                const tokenResponse = await AuthLoginServices.refreshToken();
                localStorage.setItem('token', tokenResponse.data.access);
                localStorage.setItem('refresh', tokenResponse.data.refresh);
                login.accessToken = tokenResponse.data.access;
                login.refreshToken = tokenResponse.data.refresh;
            } catch (error) {
                console.log(error);
            }
    
            login.isLoading = false;
      }

    public static setAuthorizationsData(authData: Partial<LoginPostParams>): void {
        const { store } = createStore();
        const login: AuthLoginStoresInterface = store.authStore.login;
        login.authData = { ...login.authData, ...authData };
    }

}
