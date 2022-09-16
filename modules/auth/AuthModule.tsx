import { useEffect } from 'react';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { setAuthStatus } from 'slice/authSlice';
import { useCheckAuthQuery } from 'api/authApi';

const AuthModule = () => {
    const { data, isError, isSuccess } = useCheckAuthQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        isSuccess && dispatch(setAuthStatus(data.validate));
        isError && dispatch(setAuthStatus(false));
    }, [isSuccess, isError]);

    return null;
};

export { AuthModule };
