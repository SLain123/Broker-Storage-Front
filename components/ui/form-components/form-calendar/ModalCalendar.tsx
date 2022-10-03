import React, { FC, useContext, useState, useMemo } from 'react';
import { StyleSheet, Modal, View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';

import { CalendarContext } from './ContextCalendar';

const ModalCalendar: FC = () => {
    const { formik, field, selectedDate, isVisbleModal, toggleModal } =
        useContext(CalendarContext);

    const [date, setDate] = useState(selectedDate ? selectedDate : '');
    const currentDate = new Date();
    const maxDate = useMemo(
        () => String(new Date(currentDate.setDate(currentDate.getDate() + 1))),
        [],
    );

    return (
        <Modal animationType='fade' transparent visible={isVisbleModal}>
            <TouchableOpacity style={styles.blanket} onPress={toggleModal} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Calendar
                        markedDates={
                            date
                                ? {
                                      [format(new Date(date), 'yyyy-MM-dd')]: {
                                          selected: true,
                                          selectedColor: '#2756B1',
                                      },
                                  }
                                : null
                        }
                        minDate={'2000-01-01'}
                        maxDate={maxDate}
                        onDayPress={(day) => {
                            setDate(day.dateString);
                            formik.setFieldValue(field, day.dateString);
                        }}
                        monthFormat={'yyyy   MM'}
                        firstDay={1}
                        onPressArrowLeft={(subtractMonth) => subtractMonth()}
                        onPressArrowRight={(addMonth) => addMonth()}
                        enableSwipeMonths={true}
                        hideExtraDays={true}
                        style={{
                            minWidth: 310,
                        }}
                        theme={{
                            backgroundColor: 'black',
                            calendarBackground: 'black',
                            textSectionTitleColor: '#2756B1',
                            textSectionTitleDisabledColor: '#A30000',
                            selectedDayTextColor: 'red',
                            todayTextColor: 'orange',
                            dayTextColor: 'white',
                            textDisabledColor: 'brown',
                            arrowColor: 'orange',
                            monthTextColor: 'white',
                            textDayFontWeight: '400',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 18,
                            textMonthFontSize: 22,
                            textDayHeaderFontSize: 16,
                        }}
                    />
                    <TouchableOpacity
                        onPress={toggleModal}
                        activeOpacity={0.5}
                        style={styles.btn}
                    >
                        <Text style={styles.btnText}>Save Date</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blanket: {
        position: 'absolute',
        zIndex: 9,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 16,
        backgroundColor: 'black',
        borderRadius: 4,
        margin: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        zIndex: 10,
    },
    btn: {
        width: 280,
        padding: 16,
        marginTop: 16,
        borderRadius: 4,
        backgroundColor: '#2756B1',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    btnText: { color: 'white', textAlign: 'center' },
});

export { ModalCalendar };
