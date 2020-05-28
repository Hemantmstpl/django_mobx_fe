import Api from '../../utils/api';
// import { AUTH_ROUTES_CONSTANTS } from '@modules/auth/auth-routes-constants';
// import { AuthApi } from '@services/api/endpoints/auth-api-class';
// import AuthPostParams = AuthApi.AuthPostParams;
// import AuthTokenResponse = AuthApi.AuthTokenResponse;
export interface loginSubData {
    data: loginDataInterface
}
export interface loginDataInterface {
    refresh: string;
    access: string;
}


export class AuthLoginServices {

    public static getToken = async (params: { username: string; password: string; }): Promise<loginSubData> => {
        return Api.post('/token/',{
            username: params.username,
            password: params.password,
        });
    };

    public static refreshToken = async (): Promise<loginSubData> => {
        return Api.post('/token/refresh/', {"refresh": localStorage.getItem('refresh')});
      }

}
