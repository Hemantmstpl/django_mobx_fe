import { createStore } from '../../store';
import { toast } from 'react-toastify';
import { TicketsServices } from './services';
import { TicketCreateData, TicketStoresInterface, RestaurentGetData, headerInterface, purchaseDetail } from './stores'


export class TicketsActions {

  public static getHeaders = (): Partial<headerInterface> => {
    return {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}};
};

  public static async getRestaurent(): Promise<void> {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
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

  public static async getRestaurentTickets(): Promise<void> {
    const headers = this.getHeaders();
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;

    ticket.isLoading = true;
    try {
      const restaurentTicketResponse = await TicketsServices.getRestaurentTicket({id: ticket.selectedRestaurent.id , headers});
      ticket.ticketData = restaurentTicketResponse.data.results;
    } catch (error) {
        console.log(error);
    }
  ticket.isLoading = false;
  }

  public static async createRestaurentTickets(): Promise<void> {
    const headers = this.getHeaders();
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    ticket.isLoading = true;

    try {
      const { newTicket: {name, max_purchase_count}, selectedRestaurent } = ticket
      const restaurentTicketResponse = await TicketsServices.postRestaurentTicket({id : selectedRestaurent.id, name: name, count: max_purchase_count, headers });
      ticket.newTicket.name="";
      ticket.newTicket.max_purchase_count=0;
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
  const { store } = createStore();
  const ticket: TicketStoresInterface = store.appStore.ticket;
  ticket.purchaseDetail = { ...ticket.purchaseDetail, ...newPurchaseData };
}

  public static setRestaurentData(selectedRestaurentData: Partial<RestaurentGetData>): void {
    
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    const selectedRestarentDetail = ticket.restaurentData.filter((obj: any) => {
      return obj.id === +selectedRestaurentData
    })
    ticket.selectedRestaurent = { ...selectedRestarentDetail[0] };
    TicketsActions.getRestaurentTickets();
  }

  public static setEditInfo(id: string): void {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    const filteredTicketDetail = ticket.ticketData.filter(obj => {
      return +obj.id === +id
    })
    ticket.selectedTicket = filteredTicketDetail[0];
  }

  public static async buyTicket(param: { id: string; name: string; }): Promise<void> {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    ticket.isLoading = true;

    try {
      const { purchaseDetail: {email, count} } = ticket
      const restaurentTicketResponse = await TicketsServices.buyRestaurentTicket({...param, email, count});
      ticket.purchaseDetail.email="";
      ticket.purchaseDetail.count=0;
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
