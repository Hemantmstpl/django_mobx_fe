import { createStore } from '../../store';
import { toast } from 'react-toastify';
import { TicketsServices } from './services';
import { TicketCreateData, TicketStoresInterface, RestaurentGetData, TicketGetData, purchaseDetail } from './stores'


export class TicketsActions {

  public static getHeaders = (): any => {
    return {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}};
};

  public static getStore = (): any => {
    const { store } = createStore();
    const ticketInfo: TicketStoresInterface = store.appStore.ticket;
    return ticketInfo;
  }

  public static async getRestaurent(): Promise<any> {
    const ticket = this.getStore()
    ticket.isLoading = true;

    try {
        const headers = this.getHeaders();
        const restaurentResponse = await TicketsServices.getRestaurent(headers);
        ticket.restaurentData = restaurentResponse.data;
        ticket.selectedRestaurent = restaurentResponse.data[0];
        TicketsActions.getRestaurentTickets();
    } catch (error) {
        console.log(error);
    }

    ticket.isLoading = false;
}

  public static async getRestaurentTickets(): Promise<any> {
    const headers = this.getHeaders();
    const ticket = this.getStore()

    ticket.isLoading = true;
    try {
      const restaurentTicketResponse = await TicketsServices.getRestaurentTicket({id: ticket.selectedRestaurent.id , headers});
      ticket.ticketData = restaurentTicketResponse.data.results;
    } catch (error) {
        console.log(error);
    }
  ticket.isLoading = false;
  }

  public static async createRestaurentTickets(): Promise<any> {
    const headers = this.getHeaders();
    const ticket = this.getStore()
    ticket.isLoading = true;

    try {
      const { newTicket: {name, max_purchase_count}, selectedRestaurent } = ticket
      const restaurentTicketResponse = await TicketsServices.postRestaurentTicket({id : selectedRestaurent.id, name: name, count: max_purchase_count, headers });
      ticket.newTicket.name="";
      ticket.newTicket.max_purchase_count="";
      TicketsActions.getRestaurentTickets();
      toast.success('created ticket');
    } catch (error) {
        toast.error('something went wrong!!')
        console.log(error);
    }
  ticket.isLoading = false;
  }

  public static setNewTicketData(newTicketData: Partial<TicketCreateData>): void {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    ticket.newTicket = { ...ticket.newTicket, ...newTicketData };
}

public static setPurchaseDetail(newPurchaseData: Partial<purchaseDetail>): void {
  const ticket = this.getStore()
  ticket.purchaseDetail = { ...ticket.purchaseDetail, ...newPurchaseData };
}

  public static setRestaurentData(selectedRestaurentData: Partial<RestaurentGetData>): void {
    
    const ticket = this.getStore()
    const selectedRestarentDetail = ticket.restaurentData.filter((obj: { id: number; }) => {
      return obj.id === +selectedRestaurentData
    })
    ticket.selectedRestaurent = { ...selectedRestarentDetail[0] };
    TicketsActions.getRestaurentTickets();
  }

  public static setEditInfo(id: Partial<TicketGetData>): void {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    const filteredTicketDetail = ticket.ticketData.filter(obj => {
      return +obj.id === +id
    })
    ticket.selectedTicket = filteredTicketDetail[0];
  }

  public static async buyTicket(param: { id: string; name: string; }): Promise<any> {
    const ticket = this.getStore()
    ticket.isLoading = true;

    try {
      const { purchaseDetail: {email, count} } = ticket
      const restaurentTicketResponse = await TicketsServices.buyRestaurentTicket({...param, email, count});
      ticket.purchaseDetail.email="";
      ticket.purchaseDetail.count="";
      TicketsActions.getRestaurentTickets();
      toast.success('success purchsed ticket');
    } catch (error) {
        if(error.response.status === 400) {
          toast.error(`Please enter a valid purchase ${Object.keys(error.response.data)}`);
        }
        console.log(error);
    }
  ticket.isLoading = false;
  }
}
