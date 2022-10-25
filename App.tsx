import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import { Navigation } from 'modules/navigation/Navigation';
import { AuthModule } from 'modules/auth/AuthModule';

export default function App() {
    return (
        <Provider store={store}>
            <AuthModule />
            <Navigation />
            <StatusBar />
        </Provider>
    );
}
