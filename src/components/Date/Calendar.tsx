/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import ClearButton from './ClearButton'

type DisabledDates = {
    from: Date;
    to: Date
}

interface CalendarProps {
    start: Date | null;
    end: Date | null;
    disabledDays: DisabledDates[];
    onDateChange: (date : Date, type: string) => void;
    clearDates: () => void;
}

const Calendar: React.FC<CalendarProps> = ({start, end, disabledDays, onDateChange}) => {
    const minDate = new Date();
    const selectedStartDate = start ? start : undefined;
    const selectedEndDate = end ? end : undefined;

    const isDisabled = (day: Date) => {
        for (const range of disabledDays) {
          if (day >= range.from && day <= range.to) {
            return true;
          }
        }
        return false;
      };

  return (
    <View style={styles.calendar_container}>
        <CalendarPicker 
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S' ]}
            allowRangeSelection={true}
            selectedDayColor="#000"
            selectedDayTextColor="#fff"
            todayBackgroundColor='#fff'
            todayTextStyle={styles.todayTextStyle}
            textStyle={styles.textStyle}
            horizontal={true}
            scrollable={true}
            width={350}
            height={380}
            previousTitle=" "
            nextTitle=" "
            dayLabelsWrapper={styles.dayLabelsWrapper}
            headerWrapperStyle={styles.headerWrapperStyle}
            monthTitleStyle={styles.monthTitleStyle}
            yearTitleStyle={styles.yearTitleStyle}
            minDate={minDate}
            onDateChange={onDateChange}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            disabledDates={isDisabled}
            disabledDatesTextStyle={styles.disabledDays}
        />
        {/* <View>
          <Text style={styles.date_txt}>START DATE:{start ? start.toDateString() : null}</Text>
          <Text style={styles.date_txt}>END DATE:{end ? end.toDateString() : null}</Text>
        </View> */}
    </View>
  )
}


const styles = StyleSheet.create({
    calendar_container:{
        marginTop: 40,
        paddingTop: 10,
    },
    headerWrapperStyle:{
        justifyContent: 'flex-start',
    },
    dayLabelsWrapper:{
        color: '#D8D6D6',
        borderTopWidth: 0,
        //borderBottomWidth: 0,
        borderColor: '#D8D6D6',
    },
    monthTitleStyle: {
        color: '#000000',
        fontSize: 18, 
        fontWeight:'500'
    },
    yearTitleStyle: {
        color: '#000000',
        fontSize: 18, 
        fontWeight:'500',
        marginLeft: 10,
    },
    disabledDays: {
        fontWeight: '300',
    },
    todayTextStyle: {
        color: '#32C2DF',
    },
    textStyle: {
        fontWeight: 'bold',
    },
})

export default Calendar
