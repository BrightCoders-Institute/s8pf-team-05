import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CloseButton from '../Date/CloseButton';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeLine from './TimeLine';
import firestore from '@react-native-firebase/firestore';

type Reservations = {
  propertyName: string;
  images: string;
  propertyAdress: string;
  propertyCity: string;
  hostId: string;
  price: number;
  date_of_arrival: Date;
  departure_date: Date;
  guestAdults: number;
  guestKids: number;
};

export default function ModalReservationDetails({
  data,
  onPressClose,
}: {
  data: Reservations | undefined;
  onPressClose: () => void;
}) {
  const [dataHost, setDataHost] = useState({
    name: '',
    photo: '',
    age: 0,
  });
  const [numberOfNights, setNumberOfNights] = useState<number>();

  useEffect(() => {
    async function getDataUser() {
      const query = await firestore()
        .collection('users')
        .doc(data?.hostId)
        .get();

      setDataHost({
        name: query.data()?.name + ' ' + query.data()?.lastname,
        photo: query.data()?.profileImage,
        age: calculateAge(query.data()?.birthday),
      });
    }

    getDataUser();

    let diff = data?.departure_date.getTime() - data?.date_of_arrival.getTime();
    setNumberOfNights(diff / (1000 * 60 * 60 * 24));
  }, []);

  function calculateAge(birthday: string) {
    var birthday_arr = birthday.split('/');
    var birthday_date = new Date(
      birthday_arr[2],
      birthday_arr[1] - 1,
      birthday_arr[0],
    );
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <View style={styles.headerModal}>
          <CloseButton onPress={onPressClose} />
          <Text style={styles.titleModal}>Reservation details</Text>
        </View>

        <Section subTitle="Host Information">
          <View style={styles.sectionRowContainer}>
            <Image
              style={styles.imgUser}
              source={
                dataHost.photo === ''
                  ? require('../../source/defaultUserImage.jpg')
                  : {uri: dataHost.photo}
              }
            />
            <View>
              <Text style={styles.nameHost}>{dataHost.name}</Text>
              <Text style={styles.ageHost}>{dataHost.age} years</Text>
            </View>
          </View>
        </Section>

        <Section subTitle="Property Information">
          <View style={styles.sectionRowContainer}>
            <Image style={styles.imgProperty} source={{uri: data?.images}} />
            <View>
              <Text style={styles.textName}>{data?.propertyName}</Text>
              <Text style={styles.textLocation}>{data?.propertyAdress}</Text>
              <Text style={styles.textCity}>{data?.propertyCity}</Text>
            </View>
          </View>
        </Section>

        <Section subTitle="Reservation Details">
          <View>
            <View style={styles.sectionRowContainer}>
              <View>
                <Text style={styles.txtArrival}>Arrival Date</Text>
                <Text>{data?.date_of_arrival.toDateString()}</Text>
              </View>

              <TimeLine />

              <View>
                <Text style={styles.txtDeparture}>Departure Date</Text>
                <Text>{data?.departure_date.toDateString()}</Text>
              </View>
            </View>

            <View style={styles.cardsContainer}>
              <Card titleCard="Guests">
                <View style={styles.infoContainer}>
                  <Icon name="person" size={20} color={'black'} />
                  <Text style={styles.txtGuest}>Adults: </Text>
                  <Text style={styles.numberGuest}>{data?.guestAdults}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Icon name="person-circle" size={20} color={'black'} />
                  <Text style={styles.txtGuest}>Kids: </Text>
                  <Text style={styles.numberGuest}>{data?.guestKids}</Text>
                </View>
              </Card>

              <Card titleCard="Nights / Price">
                <Text style={styles.priceText}>${data?.price} /night</Text>
                <Text style={styles.priceText}>X{numberOfNights}</Text>
                <View style={styles.line3} />
                <Text style={styles.totalText}>
                  ${numberOfNights * data?.price}
                </Text>
              </Card>
            </View>
          </View>
        </Section>
      </View>
    </View>
  );
}

function Section({children, subTitle}: {children: any; subTitle: string}) {
  return (
    <>
      <View style={styles.subTitleModalContainer}>
        <View style={styles.line1} />
        <Text style={styles.subTitleModal}>{subTitle}</Text>
        <View style={styles.line2} />
      </View>
      {children}
    </>
  );
}

function Card({children, titleCard}: {children: any; titleCard: string}) {
  return (
    <View style={styles.cardView}>
      <Text style={styles.txtTitleCard}>{titleCard}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    marginTop: '30%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModal: {
    flexDirection: 'row',
  },
  titleModal: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subTitleModalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitleModal: {
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  line1: {
    width: 60,
    height: 1,
    marginTop: 3,
    backgroundColor: '#CDCDCD',
  },
  line2: {
    flex: 1,
    height: 1,
    marginTop: 3,
    backgroundColor: '#CDCDCD',
  },
  line3: {
    backgroundColor: 'black',
    width: 100,
    height: 2,
    marginLeft: 10,
    marginVertical: 2,
  },
  cardView: {
    backgroundColor: '#F0F0F0',
    width: '47%',
    borderRadius: 5,
    elevation: 1,
  },

  //----------------------
  sectionRowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imgUser: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  imgProperty: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  nameHost: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 10,
  },
  ageHost: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 10,
  },
  textName: {
    maxWidth: '85%',
    color: '#444444',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 15,
    marginLeft: 10,
  },
  textLocation: {
    fontSize: 12,
    color: '#7C7C7C',
    textAlign: 'justify',
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  textCity: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'justify',
    paddingLeft: 10,
  },
  txtArrival: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  txtDeparture: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  txtTitleCard: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 3,
    justifyContent: 'center',
  },
  txtGuest: {
    color: 'black',
    marginLeft: 5,
  },
  numberGuest: {
    fontWeight: 'bold',
  },
  priceText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  totalText: {
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
  },
});
