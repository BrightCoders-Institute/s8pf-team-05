import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';

interface CategoryButtonProps {
    name: string;
    icon: string;
    onPress: (category: string) => void;
    isSelected: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ name, icon, onPress, isSelected }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(name)}
            style={[
                styles.categoryButton,
                isSelected && styles.selectedCategoryButton,
            ]}
        >
            <View style={styles.categoryContent}>
                <Icon name={icon} size={24} color="black" style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    categoryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 15,
    },
    selectedCategoryButton: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',    
    },
    categoryContent: {
        alignItems: 'center',
    },
    categoryIcon: {
        marginRight: 5,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default CategoryButton;
