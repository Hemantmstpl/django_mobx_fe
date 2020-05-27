import * as React from 'react';
import { AuthLoginActions } from './actions';
import { useObserver } from 'mobx-react-lite';

export const AuthLoginPage: React.FC = (): JSX.Element => {

    // const {store} = React.useContext(storeContext);
    // const login: AuthLoginStoresInterface = store.authStore.login;

    const onChangeFormHandler = (event: { currentTarget: { id: string; value: string; }; }): void => {
        AuthLoginActions.setAuthorizationsData({[event.currentTarget.id]: event.currentTarget.value});
    };

    const onSubmitAuthLoginFormHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        AuthLoginActions.authorize()
    };

    return useObserver(() => {
        return (
          <form onSubmit={onSubmitAuthLoginFormHandler}>
              <label>Email address</label>
              <input type="text" placeholder="Enter email" name={'username'} id={'username'} onChange={onChangeFormHandler} />
          
              <label>Password</label>
              <input type="password" placeholder="Password"  name={'password'} id={'password'} onChange={onChangeFormHandler} />
            
            <button type="submit">
              Submit
            </button>
        </form>
        );
    });

};
