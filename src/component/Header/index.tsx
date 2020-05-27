// import * as styles from '../styles.scss';
import * as React from 'react';
import { useObserver } from 'mobx-react-lite';
import history from  '../../utils/history'

export const Header: React.FC = (): JSX.Element => {
  
  const onLogoutClicked = (): void => {
    if(localStorage.getItem('token'))
    localStorage.clear();
    history.push('/login')
};

    return useObserver(() => {
        return (
         <div>
           <button onClick={onLogoutClicked}>Logout</button>
         </div>
        );
    });

};
