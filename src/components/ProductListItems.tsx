import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@components/Themed';
import Colors from '@/constants/Colors';
import { Product } from '../types';

type ProductListItemsProps={
    product:Product;
}


export const ProductListItems= ({product}: ProductListItemsProps)=>{
  
  return(
    <View style={styles.container}>
      <Image source={{uri:product.image || "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"}} style={styles.image}/>
     <Text style={styles.title}>{product.name}</Text>
     <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding:10,
    borderRadius:20,
    
    
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical:10,
  },
 
  price:{
    color:Colors.light.tint,
    fontWeight:'bold',

  },
  image:{
    width:'100%',
    aspectRatio:1,
  }
});
