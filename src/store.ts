// import { myAccountStore, MyAccountStoreInterface } from '@modules/my-account/stores';
import { AuthLoginStores, AuthLoginStoresInterface } from './module/Login/stores';
import { TicketStores, TicketStoresInterface } from './module/Ticket/stores';
export interface AuthStoreInterface {
    login: AuthLoginStoresInterface;
}

export interface AppStoreInterface {
  ticket: TicketStoresInterface;
}

export interface CreateStoreInterface {
    store: {
        authStore: AuthStoreInterface;
        appStore: AppStoreInterface;
    };
}

export const createStore = (): CreateStoreInterface => {

    const store = {
        get authStore(): AuthStoreInterface {
            return {
                login: AuthLoginStores,
            };
        },
        get appStore(): AppStoreInterface{
          return {
            ticket: TicketStores,
          }
        }
    };

    return { store };
};

export type TStore = ReturnType<typeof createStore>;