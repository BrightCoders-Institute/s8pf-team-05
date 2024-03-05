
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import InboxItem from '../components/Inbox/InboxItem'


const Inbox = () => {
  const img1 = 'https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg';
  const img2 = 'https://www.elitesingles.co.uk/wp-content/uploads/sites/59/2019/11/2b_en_articleslide_sm2-350x264.jpg';
  const img3 = 'https://superblog.supercdn.cloud/site_cuid_clilou76g4798113tmf1lw59vru/images/instagram-man-ideas-3-1687868963182-compressed.PNG';
  
  return (
    <View style={styles.first_container}>
      <View style={styles.second_container}>
        <Text style={styles.title}>Inbox</Text>
        <InboxItem image={img1}/>
        <InboxItem image={img2}/>
        <InboxItem image={img3}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  first_container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  second_container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  title: {
    fontSize: 40,
    color: '#444444',
    fontWeight: 'bold',
  },
})

export default Inbox
