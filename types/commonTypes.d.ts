import { NavigationProp } from '@react-navigation/native';

export type StatusType = 'active' | 'inactive';

export interface IResponseError {
    errors?: { msg: string }[];
    message?: string;
    status?: string;
}

export interface IScreenProps {
    navigation: NavigationProp<any, any>;
}

export interface ICurrencySelect {
    dropdownRef: React.MutableRefObject<SelectDropdown>;
    formik: FormikConfig;
    isDisabled?: boolean;
    defaultBtnText?: string;
    formikFieldName?: string;
}
