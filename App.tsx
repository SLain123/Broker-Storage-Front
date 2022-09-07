import { Navigation } from 'modules/navigation/Navigation';
import { Register } from 'screens/Register';
import { store } from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
    const isAuth = false;

    return (
        <Provider store={store}>
            {isAuth ? <Navigation /> : <Register />}
        </Provider>
    );
}
