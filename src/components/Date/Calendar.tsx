/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import ClearButton from './ClearButton'

interface CalendarProps {
    start: Date | null;
    end: Date | null;
    onDateChange: (start: Date | null, end: Date | null) => void;
    clearDates: () => void;
}

const Calendar: React.FC<CalendarProps> = ({start, end, onDateChange, clearDates}) => {
    const minDate = new Date();
    const selectedStartDate = start ? start : undefined;
    const selectedEndDate = end ? end : undefined;

    const onDateChanges = (date:Date, type:string) => {
        if(type === 'END_DATE'){
            onDateChange(start, date)
            //console.log(date)
        }else{
            onDateChange(date, end)
            //console.log(date)
        }
    }
  return (
    <View style={styles.calendar_container}>
        <CalendarPicker 
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S' ]}
            allowRangeSelection={true}
            todayBackgroundColor="#575757"
            selectedDayColor="#222222"
            selectedDayTextColor="#FFFFFF"
            horizontal={false}
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
            onDateChange={onDateChanges}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
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
    date_txt: {
        fontSize: 10,
        color: '#444444',
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 10,
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
    }
})

export default Calendar
