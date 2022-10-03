import { createContext } from 'react';
import { IFormCalendar } from './FormCalendar';

interface ICalendarContext extends IFormCalendar {
    isVisbleModal: boolean;
    toggleModal: () => void;
}

const CalendarContext = createContext<Partial<ICalendarContext>>({});

export { CalendarContext };
