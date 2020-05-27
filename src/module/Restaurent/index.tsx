import React, { useEffect } from 'react';
import { RestaurentsActions } from './actions';
// import { AuthLoginActions } from '../Login/actions';
import { storeContext } from '../../mobxStore';
import { useObserver } from 'mobx-react-lite';
import { Header } from '../../component/Header'
import { TicketStoresInterface, RestaurentGetData } from '../Ticket/stores'

export const RestaurentPage: React.FC = (): JSX.Element => {

    useEffect(() => {
      RestaurentsActions.getRestaurent();
      // setInterval(AuthLoginActions.refreshTokens(), 3000);
    }, []);

    const {store} = React.useContext(storeContext);
    const ticket: TicketStoresInterface = store.appStore.ticket;

    const onRestaurentSelect = (event: any): void => {
      RestaurentsActions.setRestaurentData(event.currentTarget.value);
    }
    return useObserver(() => {
        return (
          <div>
          <Header />
          <div>Restaurent Page</div>
          <div>
            Select Restaurent:
            <select onChange={onRestaurentSelect}>
              {ticket.restaurentData.map((data: RestaurentGetData) => {
                return <option value={data.id}>{data.name}</option> 
              })}
            </select>
          </div>
          </div>
        );
    });

};
