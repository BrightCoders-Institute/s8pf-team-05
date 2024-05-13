import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CarouselComponent from '../components/PropertyDetails/Carousel';
import RatingBox from '../components/PropertyDetails/RatingBox';
import HostInfo from '../components/PropertyDetails/HostInfo';
import PropertyBottomTab from '../components/PropertyDetails/PropertyBottomTab';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import LikesDetails from '../components/likes/LikesDetails';
import auth from '@react-native-firebase/auth'
import HeaderNavigation from '../navigation/HeaderNavigation';

const PropertyDetails: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const {property} = route.params;

  const [hostInfo, setHostInfo] = useState<{
    name: string;
    lastname: string;
    profileImage: string | null;
  }>({
    name: '',
    lastname: '',
    profileImage: null,
  });

  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [isHostCurrentUser, setIsHostCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchHostInfo = async () => {
      try {
        const hostId = property.hostId;

        if (hostId) {
          const userDoc = await firestore()
            .collection('users')
            .doc(hostId)
            .get();

          const userData = userDoc.data();

          if (userData) {
            const {name, lastname, profileImage} = userData;
            setHostInfo({name, lastname, profileImage});
          }
        }
      } catch (error) {
        console.error('Error fetching host info: ', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsSnapshot = await firestore()
          .collection('properties')
          .doc(property.id)
          .collection('reviews')
          .get();
        let totalRating = 0;
        let totalReviewsCount = 0;

        reviewsSnapshot.forEach(doc => {
          const reviewData = doc.data();
          totalRating += reviewData.rating;
          totalReviewsCount++;
        });

        const avgRating =
          totalReviewsCount > 0 ? totalRating / totalReviewsCount : 0;
        setAverageRating(avgRating);
        setTotalReviews(totalReviewsCount);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };

    fetchHostInfo();
    fetchReviews();
    const currentUser = auth().currentUser;
    if (currentUser && property.hostId === currentUser.uid) {
      setIsHostCurrentUser(true);
    }
  }, [property.hostId, property.id]);

  const handleReservePress = () => {
    navigation.navigate('DateSelect', {
      property: {
        id: property.id,
        hostId: property.hostId,
        name: property.propertyName,
        location: property.propertyAdress,
        images: property.images,
        price: property.price,
        guests: property.guests,
        startDate: null,
        endDate: null,
        guestAdults: null,
        guestKids: null,
      }
    });
  };

  const handleRatingPress = () => {
    navigation.navigate('ReviewScreen', {property});
  };

  return (
    <>
    <HeaderNavigation style={styles.goBackButton} />

    <View style={styles.container}>
      
      <ScrollView>
        <View>
          <CarouselComponent images={property.images} />
        </View>
        <View style={styles.propertyInfo}>
          <View style={styles.heart}>
          <Text style={styles.propertyName}>{property.propertyName}</Text>
            <LikesDetails  idProperty={property.id}/>
          </View>
          <Text style={styles.propertyLocation}>{property.propertyAdress}, {property.city}</Text>
          <Text style={styles.propertyDetails}>
            Guests: {property.guests} · Bedrooms: {property.bedrooms} · Beds: {property.beds} · Bathrooms: {property.bathrooms}
          </Text>
          <TouchableOpacity onPress={handleRatingPress}>
            <RatingBox
              averageRating={averageRating}
              totalReviews={totalReviews}
            />
          </TouchableOpacity>
          <HostInfo
            hostName={`${hostInfo.name} ${hostInfo.lastname}`}
            hostImage={hostInfo.profileImage !== null ? hostInfo.profileImage : 'https://static-cse.canva.com/blob/698516/FunnyQuotesMX28.png'}
            />
        </View>
        <View style={styles.propertyDescription}>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.descriptionText}>{property.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <PropertyBottomTab
          pricePerNight={property.price}
          onReservePress={handleReservePress}
          isHostCurrentUser={isHostCurrentUser}
        />
      </View>
      
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  propertyInfo: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  propertyName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#444444',
  },
  propertyLocation: {
    fontSize: 15,
    color: 'gray',
  },
  propertyDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#7C7C7C',
    fontWeight: '600',
  },
  propertyDescription: {
    margin: 20,
    marginBottom: 100,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
    color: '#444444',
  },
  descriptionText: {
    fontSize: 13,
    color: '#7C7C7C',
  },
  bottomTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  heart:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  goBackButton: {
    backgroundColor: '#ffffff',
    width: 40,
    height: 40,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 15,
    left: 15,
    zIndex: 100,
  },
});

export default PropertyDetails;
