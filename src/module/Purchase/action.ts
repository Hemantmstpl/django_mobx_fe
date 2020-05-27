import { createStore } from '../../store';
import { toJS } from 'mobx';
import { PurchaseServices } from './services';
import { PurchaseStoresInterface, TicketData,ticketPurchaseDetail } from './store'
import { toast } from 'react-toastify';

export class PurchaseActions {

  public static async getAllTickets(): Promise<any> {
    const { store } = createStore();
    const buy: PurchaseStoresInterface = store.appStore.buy;
    buy.isLoading = true;
    // console.log('heyy', toJS(buy));
    try {
      const allTicketResponse: any = await PurchaseServices.getAllTicket();
      // console.log(allTicketResponse, 'tickGetResponse');
      buy.ticketData = allTicketResponse.data.results;
      buy.selectedTicket = allTicketResponse.data.results[0];
      // console.log(toJS(buy), 'updatedbuyStore');
    } catch (error) {
        console.log(error);
    }
  buy.isLoading = false;
  }

  public static async buyTicket(): Promise<any> {
    const { store } = createStore();
    const buy: PurchaseStoresInterface = store.appStore.buy;
    buy.isLoading = true;

    try {
      const { purchaseDetail: {email, count}, selectedTicket } = buy
      const buyTicketResponse = await PurchaseServices.buyTicket({selectedTicket, email, count});
      buy.purchaseDetail.email="";
      buy.purchaseDetail.count=0;
      PurchaseActions.getAllTickets();
      toast.success('success purchsed ticket');
    } catch (error) {
        if(error.response.status === 400) {
          toast.error(`Please enter a valid purchase ${Object.keys(error.response.data)}`);
        }
        console.log(error);
    }
  buy.isLoading = false;
  }

  public static setSelectedTicketData(selectedTicketData: Partial<TicketData>): void {
    const { store } = createStore();
    const buy: PurchaseStoresInterface = store.appStore.buy;
    const filteredTicketDetail = buy.ticketData.filter(obj => {
      return obj.code === selectedTicketData
    })
    buy.selectedTicket = { ...filteredTicketDetail[0] };
  }

  public static setPurchaseDetail(newPurchaseData: Partial<ticketPurchaseDetail>): void {
    const { store } = createStore();
    const buy: PurchaseStoresInterface = store.appStore.buy;
    buy.purchaseDetail = { ...buy.purchaseDetail, ...newPurchaseData };
  }
}
