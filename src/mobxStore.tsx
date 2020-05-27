import * as React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { createStore, TStore } from './store';

export const storeContext = React.createContext<TStore | any>(null);

export const StoreProvider: React.FC = ({ children }): JSX.Element => {
    const store = useLocalStore(createStore);
    return (
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreProvider;