import Api from '../../utils/api';

export class PurchaseServices {

    public static getAllTicket = async (): Promise<any> => {
      return Api.get(`/tickets/`);
    };
  
  public static buyTicket = async (params: any): Promise<any> => {
    return Api.post(`/tickets/${params.selectedTicket.code}/purchase/`, {
      email: params.email,
      count: params.count
    });
};
}
