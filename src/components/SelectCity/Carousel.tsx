
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';

const CarouselComponent = () => {
  const data = [
    { id: 1, uri: 'https://s3.amazonaws.com/gex.lifeandstyle/uploads/image/file/5991/flexhouse-0002.jpg' },
    { id: 2, uri: 'https://www.altonivel.com.mx/assets/images/arts/casa4.jpg' },
    { id: 3, uri: 'https://i.pinimg.com/originals/da/e2/23/dae223c71e4900fbb513f14f281b6de6.jpg' },
  ]
  const { width } = Dimensions.get('window');

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );
  return (
    <View>
      <Carousel
        data={data}
        renderItem ={renderItem}
        sliderWidth={width}
        itemWidth={width-40}
        loop
        autoplay
        autoplayInterval={3000}
      />
    </View>
  )
}

export default CarouselComponent

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 20
  },

});
