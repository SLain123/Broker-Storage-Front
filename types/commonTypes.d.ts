import { NavigationProp } from '@react-navigation/native';

export enum CommonStatus {
    active = 'active',
    closed = 'inactive',
}
export interface IResponseError {
    errors?: { msg: string }[];
    message?: string;
    status?: string;
}

export interface IScreenProps {
    navigation: NavigationProp<any, any>;
}

export interface ICommonSelect {
    dropdownRef: React.MutableRefObject<SelectDropdown>;
    formik: FormikConfig;
    isDisabled?: boolean;
    defaultBtnText?: string;
    formikFieldName?: string;
}