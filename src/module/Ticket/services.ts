import Api from '../../utils/api';
import { paramData } from './stores';
export class TicketsServices {

    public static getRestaurent = async (params: paramData): Promise<any> => {
        return Api.get('/restaurants/choices/', {...params});
    };

    public static getRestaurentTicket = async (params: paramData): Promise<any> => {
      return Api.get(`/restaurants/${params.id}/tickets/`, params.headers);
    };
    
    public static postRestaurentTicket = async (params: any): Promise<any> => {
      return Api.post(`/restaurants/${params.id}/tickets/`, {
        "name": params.name,
        "max_purchase_count": +params.count
      }, params.headers);
  };
  
  public static buyRestaurentTicket = async (params: any): Promise<any> => {
    return Api.post(`/tickets/${params.id}/purchase/`, {
      email: params.email,
      count: params.count
    });
};
}
