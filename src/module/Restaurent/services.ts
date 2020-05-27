import Api from '../../utils/api';
import { paramData } from '../Ticket/stores'

export class RestaurentServices {

    public static getRestaurent = async (params: Partial<paramData>): Promise<any> => {
        return Api.get('/restaurants/choices/', {...params});
    };

    public static getRestaurentTicket = async (params: Partial<paramData>): Promise<any> => {
      console.log('get ticket params', params)
      return Api.get(`/restaurants/${params.id}/tickets/`, params.headers);
    };
    
    public static postRestaurentTicket = async (params: any): Promise<any> => {
      console.log('service params', params);
      return Api.post(`/restaurants/${params.id}/tickets/`, {
        "name": params.name,
        "max_purchase_count": +params.count
      }, params.headers);
    };

}
