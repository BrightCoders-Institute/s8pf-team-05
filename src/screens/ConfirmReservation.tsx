import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Header from '../components/ConfirmReservation/Header';
import Ranking from '../components/ConfirmReservation/Ranking';
import DetailsReservation from '../components/ConfirmReservation/DetailsReservation';
import HostInfo from '../components/ConfirmReservation/HostInfo';
import CommentBox from '../components/ConfirmReservation/CommentBox';
import Button from '../components/ConfirmReservation/Button';
import LoadingComponent from '../components/LoadingComponent';
import {useNavigation} from '@react-navigation/native';

export default function ConfirmReservation() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <LoadingComponent />}
      <View style={styles.container}>
        <Header />

        <ScrollView>
          <View style={styles.informationPropertyContainer}>
            <Image
              style={styles.imgProperty}
              source={{
                uri: 'https://i.pinimg.com/564x/d6/18/18/d618188c4722ca5cc938ee3dde7b09cc.jpg',
              }}
            />
            <View style={styles.textInformationPropertyContainer}>
              <Text style={styles.nameProperty}>
                Casa rustica cerca del centro
              </Text>
              <Text style={styles.locationProperty}>
                Ixtlahuacan, Colima, México
              </Text>
              <Ranking />
            </View>
          </View>

          {/* Line */}
          <View style={styles.line1} />

          <Text style={styles.title}>Your Trip</Text>
          <DetailsReservation
            title="Date"
            info="21-23 de mar"
            btnEditar={() => console.log('Se presiono el boton')}
          />
          <DetailsReservation
            title="Guests"
            info="1 huésped"
            btnEditar={() => console.log('Se presiono el boton 2')}
          />

          {/* Line */}
          <View style={styles.line1} />

          <Text style={styles.title}>Write to the host</Text>
          <Text style={styles.writeDescrption}>Tell him why you are traveling, who is accompanying you and what you like most about the place</Text>
          <HostInfo
            hostName="Fransisco"
            hostImage={
              'https://www.infobae.com/new-resizer/6_ShVi7_Ps8JOa8jdGKI06ofW80=/1440x1440/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/UERNNO3H7RGNPEJKE2STAUGWXM.jpg'
            }
          />
          <CommentBox placeholder="Write a comment here..." />

          <Button
            style={styles.button}
            text="Request Reservation"
            onPress={() => {
              navigation.navigate('ReservationCompleted');
            }}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  informationPropertyContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  imgProperty: {
    width: 143,
    height: 106,
    borderRadius: 20,
  },
  textInformationPropertyContainer: {
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nameProperty: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  locationProperty: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  line1: {
    marginTop: 25,
    height: 2,
    paddingHorizontal: -100,
    backgroundColor: '#CDCDCD',
  },
  title: {
    marginTop: 25,
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    marginTop: 45,
    marginBottom: 20,
  },
  writeDescrption: {
    color: '#999898',
  },
});
