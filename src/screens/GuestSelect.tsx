/* eslint-disable */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import ClearButton from '../components/Guest/ClearButton';
import SaveButton from '../components/Guest/SaveButton';
import NumericInput from '../components/HostMode/NumericInput';
import HeaderNavigation from '../navigation/HeaderNavigation';


const DateSelect = () => {
    const [numberAdults, setNumberAdults] = useState(0);
    const [numberKids, setNumberKids] = useState(0);
    
    const handleIncrease = (setState: React.Dispatch<React.SetStateAction<number>>) => {
        setState(prevValue => prevValue + 1);
      };
    const handleDecrease = (setState: React.Dispatch<React.SetStateAction<number>>) => {
    setState(prevValue => Math.max(0, prevValue - 1));
    };
    const clearNumbers = () => {
        setNumberAdults(0);
        setNumberKids(0);
    }
    const saveNumbers = () => {
        const totalGuest = numberAdults + numberKids;
        console.log(`${numberAdults} + ${numberKids} = ${totalGuest}`)
    }

  return (
    <View style={styles.container}>
        <HeaderNavigation whereNav='PropertyDetails'/>
        <View>
            <View style={styles.guest_container}>
                <Text style={styles.title}>How many guests?</Text>
                <NumericInput
                    label="Number of Adults"
                    value={numberAdults}
                    onIncrease={() => handleIncrease(setNumberAdults)}
                    onDecrease={() => handleDecrease(setNumberAdults)}
                />
                <NumericInput
                    label="Number of Kids"
                    value={numberKids}
                    onIncrease={() => handleIncrease(setNumberKids)}
                    onDecrease={() => handleDecrease(setNumberKids)}
                />
            </View>
            <View style={styles.confirm_container}>
                <ClearButton clearNumbers={clearNumbers}/>
                <SaveButton saveNumbers={saveNumbers}/>
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
    title: {
        fontSize: 25,
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 40,
        marginHorizontal: 10,
    },
    guest_container:{
        height: 300,
        marginTop: 40,
        marginBottom: 50,
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