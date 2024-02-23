import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

interface CarouselProps {
  images: string[];
}

const CarouselComponent: React.FC<CarouselProps> = ({ images }) => {
  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.slide}>
      <View style={{ width: screenWidth, height: 200 }}>
        <View style={{ flex: 1, backgroundColor: 'grey' }}>
          <Image
            source={{ uri: item }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 0,
  },
  slide: {
    width: '100%', 
  },
});

export default CarouselComponent;
