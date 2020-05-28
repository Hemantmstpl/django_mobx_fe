import React from 'react';
import StoreProvider from './mobxStore';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthLoginPage } from './module/Login';
import { TicketsPage } from './module/Ticket';
import { RestaurentPage } from './module/Restaurent'

const redirect = (): JSX.Element => {
    return <Redirect from="*" to='/login' />;
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
            {redirect()}
        </Switch>
    </StoreProvider>
);
