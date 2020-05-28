import React, { useEffect } from 'react';
import { PurchaseActions } from './action';
import { storeContext } from '../../mobxStore';
import { useObserver } from 'mobx-react-lite';
import { Header } from '../../component/Header'
import { PurchaseStoresInterface, TicketData } from './store'

export const PurchasePage: React.FC = (): JSX.Element => {

    useEffect(() => {
      PurchaseActions.getAllTickets();
    }, []);

    const {store} = React.useContext(storeContext);
    const buy: PurchaseStoresInterface = store.appStore.buy;

    const onTicketSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      PurchaseActions.setSelectedTicketData(event.currentTarget.value);
    }

    const onChangePurchaseHandler = (event: React.SyntheticEvent<HTMLInputElement>): void => {
      PurchaseActions.setPurchaseDetail({[event.currentTarget.name]: event.currentTarget.value});
    };

    const buyTicket = (): void => {
      PurchaseActions.buyTicket();
    }
    return useObserver(() => {
        return (
          <div>
            <Header />
            <div>Purchase Page</div>
            <div>
              Select Restaurent:
              <select onChange={onTicketSelect}>
                {buy.ticketData.map((data: TicketData) => {
                  return <option value={data.code}>{data.name}</option> 
                })}
              </select>
            </div>
              Selected Ticket Info Section<br />
            { buy.selectedTicket.code !== '' && <div>
              Name: {buy.selectedTicket.name}<br />
              Restaurent: {buy.selectedTicket.restaurant}<br />
              Available Qty: {buy.selectedTicket.available_quantity}<br/>
            </div>}
            <div>
              Purchase details<br/>
              <input type="email" placeholder="purchase email" name="email" value={buy.purchaseDetail.email} onChange={onChangePurchaseHandler} />&nbsp;
              <input type="number" placeholder="quantity" name="count" value={buy.purchaseDetail.count} onChange={onChangePurchaseHandler} />
              <button onClick={buyTicket}>Buy Ticket</button>
            </div>
          </div>
        );
    });

};
