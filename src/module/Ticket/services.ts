import Api from '../../utils/api';
import { paramData, TicketCreateData, RestaurentGetData, TicketGetData } from './stores';

export interface buyTicket {
  id: string;
  ticket: string;
  created_at: string;
  last_update: string;
  email: string;
  count: number;
}

export interface restaurentTicket {
  count: number;
  next: string;
  previous: string;
  result: TicketGetData[];
}

export interface restaurentDataInterface {
  data: restaurantResult
}

export interface restaurantResult {
  results: TicketGetData[]
}

export interface restaurentDetailInterface {
  data: RestaurentGetData[]
}
export class TicketsServices {

    public static getRestaurent = async (params: Partial<paramData>): Promise<restaurentDetailInterface> => {
        return Api.get('/restaurants/choices/', {...params});
    };

    public static getRestaurentTicket = async (params: paramData): Promise<restaurentDataInterface> => {
      return Api.get(`/restaurants/${params.id}/tickets/`, params.headers);
    };
    
    public static postRestaurentTicket = async (params: { id: string; name: string; count: number; headers: object; }): Promise<TicketCreateData> => {
      return Api.post(`/restaurants/${params.id}/tickets/`, {
        "name": params.name,
        "max_purchase_count": +params.count
      }, params.headers);
  };
  
  public static buyRestaurentTicket = async (params: { id: string; email: string; count: number; }): Promise<buyTicket> => {
    return Api.post(`/tickets/${params.id}/purchase/`, {
      email: params.email,
      count: params.count
    });
};
}
