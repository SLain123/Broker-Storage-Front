import { Navigation } from 'modules/navigation/Navigation';
import { NoAuthNavigation } from 'modules/navigation/NoAuthNavigation';
import { store } from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
    const isAuth = false;

    return (
        <Provider store={store}>
            {isAuth ? <Navigation /> : <NoAuthNavigation />}
        </Provider>
    );
}
