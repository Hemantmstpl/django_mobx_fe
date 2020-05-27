import { observable } from 'mobx';

export interface LoginPostParams {
  username: string;
  password: string;
}

export interface AuthLoginStoresInterface {
    authData: LoginPostParams;
    accessToken: string,
    refreshToken: string,
    isLoading: boolean;
}

export const AuthLoginStores: AuthLoginStoresInterface = observable({
    authData: {
        username: '',
        password: ''
    },
    accessToken: '',
    refreshToken: '',
    isLoading: false
});
