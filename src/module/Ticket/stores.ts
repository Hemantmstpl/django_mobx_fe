import { observable } from 'mobx';

export interface TicketGetData {
  id: string;
  name: string;
  available_quantity: number;
  code: string;
}
export interface RestaurentGetData {
  id: string;
  name: string;
}
export interface TicketCreateData {
  name: string;
  max_purchase_count: number;
}
export interface purchaseDetail {
  email: string;
  count: number;
}
export interface paramData {
  id: string;
  headers: object;
}

export interface TicketStoresInterface {
    restaurentData: RestaurentGetData[];
    ticketData: TicketGetData[];
    newTicket: TicketCreateData;
    selectedTicket: TicketGetData;
    selectedRestaurent: RestaurentGetData
    purchaseDetail: purchaseDetail
    isLoading: boolean;
}

export const TicketStores: TicketStoresInterface = observable({
  restaurentData: [],
  ticketData: [],
  newTicket: {
    name: '',
    max_purchase_count: 0
  },
  selectedTicket: {
    id: '',
    name: '',
    available_quantity: 0,
    code: ''
  },
  selectedRestaurent: {
    id: '',
    name: ''
  },
  purchaseDetail: {
    email: '',
    count: 0
  },
  isLoading: false
});
