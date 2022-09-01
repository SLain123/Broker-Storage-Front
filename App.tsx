import { Navigation } from 'modules/navigation/Navigation';
import { Register } from 'screens/Register';

export default function App() {
    const isAuth = false;

    return isAuth ? <Navigation /> : <Register />;
}
