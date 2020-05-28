import Api from '../../utils/api';
import { paramData } from '../Ticket/stores'
import { restaurentDetailInterface, restaurentDataInterface } from '../Ticket/services';

export class RestaurentServices {

    public static getRestaurent = async (params: Partial<paramData>): Promise<restaurentDetailInterface> => {
        return Api.get('/restaurants/choices/', {...params});
    };

    public static getRestaurentTicket = async (params: Partial<paramData>): Promise<restaurentDataInterface> => {
      return Api.get(`/restaurants/${params.id}/tickets/`, params.headers);
    };
    
    public static postRestaurentTicket = async (params: { id: string; name: string; count: number; headers: object; }): Promise<any> => {
      return Api.post(`/restaurants/${params.id}/tickets/`, {
        "name": params.name,
        "max_purchase_count": +params.count
      }, params.headers);
    };

}
