import { FC } from 'react';

import { useAppSelector } from 'hooks';
import { getAuthStatus } from 'slice/authSlice';
import { AuthNav } from './AuthNav';
import { NoAuthNav } from './NoAuthNav';
import { BlanketSpinner } from 'components/ui';

const Navigation: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);

    if (isAuth === 'not_verified') {
        return <BlanketSpinner />;
    }

    return isAuth ? <AuthNav /> : <NoAuthNav />;
};

export { Navigation };
