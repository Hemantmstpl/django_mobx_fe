import { createStore } from '../../store';
import { toJS } from 'mobx';
import { RestaurentServices } from './services';
import history from '../../utils/history';
import { TicketStoresInterface, RestaurentGetData } from '../Ticket/stores'
// import { AuthLoginStoresInterface } from '../Login/stores';
// import AuthTokenResponse = AuthApi.AuthTokenResponse;

export class RestaurentsActions {

  public static getHeaders = (): any => {
    return {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}};
};

  public static async getRestaurent(): Promise<any> {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    ticket.isLoading = true;

    try {
        const headers = this.getHeaders();
        console.log('token is', headers);
        const restaurentResponse: any = await RestaurentServices.getRestaurent(headers);
        console.log(restaurentResponse, '11111#####');
        ticket.restaurentData = restaurentResponse.data;
        ticket.selectedRestaurent = restaurentResponse.data[0];
        RestaurentsActions.getRestaurentTickets();
    } catch (error) {
        console.log(error);
    }
    ticket.isLoading = false;
}

  public static async getRestaurentTickets(): Promise<any> {
    const headers = this.getHeaders();
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    ticket.isLoading = true;
    console.log('heyy', toJS(ticket.selectedRestaurent));
    try {
      const restaurentTicketResponse: any = await RestaurentServices.getRestaurentTicket({id: ticket.selectedRestaurent.id , headers});
      console.log(restaurentTicketResponse, '99999');
      ticket.ticketData = restaurentTicketResponse.data.results;
      console.log(toJS(ticket), 'abcd123');
    } catch (error) {
        console.log(error);
    }
  ticket.isLoading = false;
  }

  public static setRestaurentData(selectedRestaurentData: Partial<RestaurentGetData>): void {
    const { store } = createStore();
    const ticket: TicketStoresInterface = store.appStore.ticket;
    console.log(selectedRestaurentData, '00000', toJS(ticket.restaurentData));
    const selectedRestarentDetail = ticket.restaurentData.filter(obj => {
      console.log(obj, '1212')
      return +obj.id === +selectedRestaurentData
    })
    console.log(selectedRestarentDetail[0], 'res detail')
    ticket.selectedRestaurent = { ...selectedRestarentDetail[0] };
    history.push({pathname: '/tickets', state: {data: {...ticket.selectedRestaurent}}});
  }
}
