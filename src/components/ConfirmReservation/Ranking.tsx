import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

export default function Ranking({idProperty}: {idProperty: string}) {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    async function getRanking() {
      const query = await firestore()
        .collection('reviews')
        .where('propertyId', '==', idProperty)
        .get();

      let totalRating = 0;
      let totalReviewsCount = 0;

      query.forEach(doc => {
        const reviewData = doc.data();
        totalRating += reviewData.rating;
        totalReviewsCount++;
      });

      const avgRating =
        totalReviewsCount > 0 ? totalRating / totalReviewsCount : 0;
      setAverageRating(avgRating);
      setTotalReviews(query.size);
    }
    getRanking();
  }, []);

  return (
    <View style={styles.container}>

      <Icon name="star" color={'black'} />
      <Text style={styles.text}>{averageRating.toFixed(1)}</Text>
      <Text style={styles.textCount}>({totalReviews})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#444444',
    fontWeight: 'bold',
    paddingLeft: 4,
  },
  textCount: {
    marginLeft: 5,
    color: '#7C7C7C',
  },
});
