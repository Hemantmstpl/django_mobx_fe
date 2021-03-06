import { createStore } from '../../store';
import { RestaurentServices } from './services';
import history from '../../utils/history';
import { TicketStoresInterface, headerInterface } from '../Ticket/stores'

export class RestaurentsActions {

  public static getHeaders = (): Partial<headerInterface> => {
    return {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}};
};

  public static async getRestaurent(): Promise<void> {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    ticket.isLoading = true;

    try {
        const headers = this.getHeaders();
        const restaurentResponse = await RestaurentServices.getRestaurent(headers);
        ticket.restaurentData = restaurentResponse.data;
        ticket.selectedRestaurent = restaurentResponse.data[0];
        RestaurentsActions.getRestaurentTickets();
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
      const restaurentTicketResponse = await RestaurentServices.getRestaurentTicket({id: ticket.selectedRestaurent.id , headers});
      ticket.ticketData = restaurentTicketResponse.data.results;
    } catch (error) {
        console.log(error);
    }
  ticket.isLoading = false;
  }

  public static setRestaurentData(selectedRestaurentData: string): void {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    const selectedRestarentDetail = ticket.restaurentData.filter(obj => {
      return +obj.id === +selectedRestaurentData
    })
    ticket.selectedRestaurent = { ...selectedRestarentDetail[0] };
    history.push({pathname: '/tickets', state: {data: {...ticket.selectedRestaurent}}});
  }
}
