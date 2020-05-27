import Api from '../../utils/api';
// import { AUTH_ROUTES_CONSTANTS } from '@modules/auth/auth-routes-constants';
// import { AuthApi } from '@services/api/endpoints/auth-api-class';
// import AuthPostParams = AuthApi.AuthPostParams;
// import AuthTokenResponse = AuthApi.AuthTokenResponse;

export class AuthLoginServices {

    public static getToken = async (params: { username: string; password: string; }): Promise<any> => {
        return Api.post('/token/',{
            username: params.username,
            password: params.password,
        });
    };

    public static refreshToken = async (): Promise<any> => {
        return Api.post('/token/refresh/', {"refresh": localStorage.getItem('refresh')});
      }

}
