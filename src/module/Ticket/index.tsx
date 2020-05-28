import React, { useEffect } from 'react';
import { TicketsActions } from './actions';
import { storeContext } from '../../mobxStore';
import { useObserver } from 'mobx-react-lite';
import { Header } from '../../component/Header'
import { TicketStoresInterface } from './stores'

export const TicketsPage: React.FC = (props: any): JSX.Element => {
  const {store} = React.useContext(storeContext);
  const ticket: TicketStoresInterface = store.appStore.ticket;
  
    useEffect(() => {
      if (ticket.selectedRestaurent.id === '') {
        const { location: {state: {data}} } = props
        ticket.selectedRestaurent = data;
      }
      TicketsActions.getRestaurentTickets();
    }, []);
    
    const onChangeFormHandler = (event: React.SyntheticEvent<HTMLInputElement>): void => {
      TicketsActions.setNewTicketData({[event.currentTarget.id]: event.currentTarget.value});
    };

    const onChangePurchaseHandler = (event: React.SyntheticEvent<HTMLInputElement>): void => {
      TicketsActions.setPurchaseDetail({[event.currentTarget.name]: event.currentTarget.value});
    };

    const onSubmitCreateTicketFormHandler = (event: React.FormEvent): void => {
      event.preventDefault();
      TicketsActions.createRestaurentTickets()
    };

    const editTicket = (param: string): void => {
      TicketsActions.setEditInfo(param);
    }

    const buyTicket = (param: { id: string; name: string; }): void => {
      TicketsActions.buyTicket(param)
    }
  
    return useObserver(() => {
        return (
          <div>
          <Header />
          <div>Tickets Page</div>
          <div>
            Available Tickets for selected restaurent.<br/><br />
            {ticket.ticketData.length > 0 && <div>
              <div>
                Purchase details<br/>
                <input type="email" placeholder="purchase email" name="email" value={ticket.purchaseDetail.email} onChange={onChangePurchaseHandler} />&nbsp;
                <input type="number" placeholder="quantity" name="count" value={ticket.purchaseDetail.count} onChange={onChangePurchaseHandler} />
              </div>
            <table>
              <th>
                <td>Name</td>
                <td>Quantity</td>
                <td>Action</td>
                </th>
            {ticket.ticketData.map((data) => {
              return (
                <tr>
                  <td>{data.name}</td>
                  <td>{data.available_quantity}</td>
                  <td>
                    <button onClick={() => editTicket(data.id)}>Edit</button>
                    <button onClick={() => buyTicket({id:data.code, name:data.name})}>Buy</button>
                    </td>
                </tr>
              )
            })}
            </table></div>}
          </div>
          <br/ >
          <br />
          <div>Create Ticket section</div>
          <form onSubmit={onSubmitCreateTicketFormHandler}>
              <label>Ticket Name</label>
              <input type="text" placeholder="Ticket name" name={'name'} id={'name'} value={ticket.newTicket.name} onChange={onChangeFormHandler} />
          
              <label>Max purchase count</label>
              <input type="number" placeholder="max count"  name={'max_purchase_count'} id={'max_purchase_count'} value={ticket.newTicket.max_purchase_count} onChange={onChangeFormHandler} />
            
            <button type="submit">
              Submit
            </button>
        </form>
          </div>
        );
    });

};
