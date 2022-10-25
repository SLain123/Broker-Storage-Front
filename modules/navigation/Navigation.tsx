import { FC, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'hooks';
import { getAuthStatus, setPin, getPin } from 'slice/authSlice';
import { AuthNav } from './AuthNav';
import { NoAuthNav } from './NoAuthNav';
import { LoadingPreview } from 'components/loading-preview/LoadingPreview';
import { getValueFromStore } from 'utils/secureStoreFuncs';
import { AuthPin } from 'modules/auth-pin/AuthPin';

const Navigation: FC = () => {
    const dispatch = useAppDispatch();

    const currentPin = getValueFromStore('pin');
    const isAuth = useAppSelector(getAuthStatus);
    const pin = useAppSelector(getPin);

    useEffect(() => {
        currentPin.then((pin) => {
            if (pin) {
                dispatch(setPin(pin.split('').map(Number)));
            }
        });
    }, []);

    if (isAuth === 'not_verified') {
        return <LoadingPreview />;
    }

    if (pin.length) {
        return <AuthPin />;
    }

    return isAuth ? <AuthNav /> : <NoAuthNav />;
};

export { Navigation };
