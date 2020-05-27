import { observable } from 'mobx';

export interface TicketData {
  name: string;
  available_quantity: number;
  code: string;
  restaurant: string,
  detail_url: string,
}

export interface ticketPurchaseDetail {
  email: string;
  count: number;
}

export interface PurchaseStoresInterface {
    ticketData: TicketData[];
    purchaseDetail: ticketPurchaseDetail;
    selectedTicket: TicketData;
    isLoading: boolean;
}

export const PurchaseStores: PurchaseStoresInterface = observable({
  ticketData: [],
  purchaseDetail: {
    email: '',
    count: 0
  },
  selectedTicket: {
    id: '',
    name: '',
    available_quantity: 0,
    code: '',
    restaurant: '',
    detail_url: '',
  },
  isLoading: false
});
