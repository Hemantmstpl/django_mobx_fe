import React from 'react';
import StoreProvider from './mobxStore';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthLoginPage } from './module/Login';
import { TicketsPage } from './module/Ticket';
import { RestaurentPage } from './module/Restaurent'
import { PurchasePage } from './module/Purchase'

const redirect = (): JSX.Element => {
    return <Redirect from="*" to='/' />;
};

export const App: React.FC = (): JSX.Element => (
    <StoreProvider>
        <Switch>
            <Route
                path='/login'
                component={AuthLoginPage}
            />
            <Route
                path='/tickets'
                component={(props: any) => <TicketsPage {...props}/>}
            />
            <Route
                path='/restaurent'
                component={RestaurentPage}
            />
            <Route
                path='/purchase'
                component={PurchasePage}
            />
            {redirect()}
        </Switch>
    </StoreProvider>
);
