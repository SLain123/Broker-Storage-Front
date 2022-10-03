import React, { FC, useState, useCallback } from 'react';
import { FormikProps } from 'formik';

import { CalendarContext } from './ContextCalendar';
import { ModalCalendar } from './ModalCalendar';
import { InputCalendar } from './InputCalendar';

export interface IFormCalendar {
    formik: FormikProps<any>;
    field: string;
    selectedDate?: string;
    placeholder?: string;
}

const FormCalendar: FC<IFormCalendar> = ({
    formik,
    field,
    selectedDate,
    placeholder,
}) => {
    const [isVisbleModal, setVisibleModal] = useState(false);

    const toggleModal = useCallback(() => {
        setVisibleModal((prev) => !prev);
    }, []);

    return (
        <CalendarContext.Provider
            value={{
                formik,
                field,
                selectedDate,
                isVisbleModal,
                toggleModal,
                placeholder,
            }}
        >
            {isVisbleModal ? <ModalCalendar /> : <InputCalendar />}
        </CalendarContext.Provider>
    );
};

export { FormCalendar };
