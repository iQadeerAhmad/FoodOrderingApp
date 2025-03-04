import { View } from 'react-native';


import products from '../../../assets/data/products';
import { ProductListItems } from '@/src/components/ProductListItems';





export default function MenuScreen() {
  return (
    <View>
      <ProductListItems product={products[0]} />
      <ProductListItems product={products[4]} />
    </View>
  );
}

