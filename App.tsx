import React from 'react';
import { Navigation } from 'modules/navigation/Navigation';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { AuthModule } from 'modules/auth/AuthModule';

export default function App() {
    return (
        <Provider store={store}>
            <AuthModule />
            <Navigation />
        </Provider>
    );
}
