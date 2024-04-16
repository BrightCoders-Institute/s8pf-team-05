/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import Calendar from '../components/Date/Calendar';
import CloseButton from '../components/Date/CloseButton';
import Options from '../components/Date/Options';
import ClearButton from '../components/Date/ClearButton';
import SaveButton from '../components/Date/SaveButton';
import HeaderNavigation from '../navigation/HeaderNavigation';
import { useNavigation } from '@react-navigation/native';


const DateSelect = ({route}: any) => {
    const navigation = useNavigation();
    const {property} = route.params;

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [routeNavigate, setRouteNavigate] = useState('GuestSelect');
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        if (property.startDate !== null && property.endDate !== null ) {
            console.log("Viene del Confirm")
            setRouteNavigate('ConfirmReservation')
            setStartDate(property.startDate);
            setEndDate(property.endDate);
        }
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [startDate, endDate]);

    const clearDates = () => {
        setStartDate(null);
        setEndDate(null);
    }

    function confirmDates () {
        if (startDate && endDate) {
            property.startDate = startDate.toDateString();
            property.endDate = endDate.toDateString();
            navigation.navigate(routeNavigate, {property});
        } else {
            console.log('Todavia no seleccionas las dos fechas');
        }
        
    };

  return (
    <>
    <HeaderNavigation />
    <View style={styles.container}>
        
        <View>
            <View style={styles.date_container}>
                <Text style={styles.date_txt}>When's your trip?</Text>
                <Calendar start={startDate} end={endDate} onDateChange={(start, end) => {setStartDate(start); setEndDate(end);}} clearDates={clearDates}/>
            </View>
            <View style={styles.confirm_container}>
                <ClearButton clearDates={clearDates}/>
                <SaveButton onPress={confirmDates} disabled={btnDisabled}/>
            </View>
        </View>
    </View>
    </>
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
        marginTop: 40,
        marginBottom: 10,
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