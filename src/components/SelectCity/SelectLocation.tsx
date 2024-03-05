
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import city from '../../data/city.json'

const SelectLocation = () => {
    const [selected, setSelected] = React.useState("");
    return (
  
      <View>
        <SelectList 
            setSelected={(val:any) => {
              setSelected(val)
            }} 
            data={city} 
            save="value"
            placeholder='Select a city'
            boxStyles={{borderColor: '#B4B2B2', }}
            inputStyles={{color: '#444444',}}
            dropdownStyles={{borderColor: '#B4B2B2',}}
            dropdownTextStyles={{color: '#444444',}}
            />
            <Text>{selected}</Text>
      </View>
    )
  }
  

export default SelectLocation

const styles = StyleSheet.create({

  
})