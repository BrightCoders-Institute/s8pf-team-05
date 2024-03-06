/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Calendar from '../components/Date/Calendar';
import CloseButton from '../components/Date/CloseButton';
import Options from '../components/Date/Options';
import ClearButton from '../components/Date/ClearButton';
import SaveButton from '../components/Date/SaveButton';


const DateSelect = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const clearDates = () => {
        setStartDate(null);
        setEndDate(null);
    }

  return (
    <View style={styles.container}>
        <View>
            <CloseButton/>
            <View style={styles.date_container}>
                <Text style={styles.date_txt}>When's your trip?</Text>
                {/*<Options/>*/}
                <Calendar start={startDate} end={endDate} onDateChange={(start, end) => {setStartDate(start); setEndDate(end);}} clearDates={clearDates}/>
            </View>
            <View style={styles.confirm_container}>
                <ClearButton clearDates={clearDates}/>
                <SaveButton/>
            </View>
        </View>
    </View>
  )
}

export default DateSelect

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
    },
    date_txt: {
        fontSize: 25,
        color: '#444444',
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    date_container:{
        height: 460,
        marginVertical: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#DBDADA',
    },
    confirm_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        backgroundColor: '#FFFFFF',
    },
})