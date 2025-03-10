import { View, FlatList, Platform } from 'react-native';


import products from '@assets/data/products';
import { ProductListItems } from '@components/ProductListItems';
import { StatusBar } from 'expo-status-bar';






export default function MenuScreen() {
  return (
    <View>
      {/* <ProductListItems product={products[0]} />
      <ProductListItems product={products[4]} /> */}
      <FlatList data={products} renderItem={({ item }) => <ProductListItems product={item} />} numColumns={2} contentContainerStyle={{ gap: 10, padding: 10, }} columnWrapperStyle={{ gap: 10 }} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

