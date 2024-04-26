/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import Calendar from '../components/Date/Calendar';
import ClearButton from '../components/Date/ClearButton';
import SaveButton from '../components/Date/SaveButton';
import HeaderNavigation from '../navigation/HeaderNavigation';
import { useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/firestore';

type DisabledDates = {
    from: Date;
    to: Date
}


const DateSelect = ({route}: any) => {
    const navigation = useNavigation();
    const {property} = route.params;

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [disabledDays, setDisabledDays] = useState<DisabledDates[]>([]);
    const [routeNavigate, setRouteNavigate] = useState('GuestSelect');
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        if (property.startDate !== null && property.endDate !== null ) {
            setRouteNavigate('ConfirmReservation')
            setStartDate(property.startDate);
            setEndDate(property.endDate);
        }

        //Getting available dates
        firebase()
        .collection('properties')
        .doc(property.id)
        .collection('reservations')
        .get()
        .then(query => {
            const disabledDaysTmp: DisabledDates[] = [];

            query.docs.map(doc => {
                const date_of_arrival = doc.data().date_of_arrival;
                const departure_date = doc.data().departure_date;

                disabledDaysTmp.push({
                    from: new Date(date_of_arrival.seconds * 1000),
                    to: new Date(departure_date.seconds * 1000)
                })
            });

            setDisabledDays(disabledDaysTmp);
            setBtnDisabled(true)
        })
    }, []);

    useEffect(() => {
        if (endDate) {
            setBtnDisabled(false);
         }
    }, [endDate]);

    const clearDates = () => {
        setStartDate(null);
        setEndDate(null);
    }

    function confirmDates () {
        try {
            if (startDate && endDate) {
                property.startDate = startDate.toISOString();
                property.endDate = endDate.toISOString();
                navigation.navigate(routeNavigate, {property});
            }
        } catch (error) {
            console.log(error, 'Todavia no seleccionas las dos fechas');
        }
    };

  return (
    <>
    <HeaderNavigation/>
    <View style={styles.container}>
        
        <View>
            <View style={styles.date_container}>
                <Text style={styles.date_txt}>When's your trip?</Text>
                <Calendar 
                    start={startDate} 
                    end={endDate} 
                    onDateChange={(date, type) => {
                        if (type === "START_DATE") {
                            setStartDate(date);
                        } else if (type === "END_DATE") {
                            setEndDate(date)
                        }
                    }} 
                    clearDates={clearDates}
                    disabledDays={disabledDays}/>
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