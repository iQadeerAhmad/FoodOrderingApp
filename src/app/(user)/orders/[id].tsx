import orders from '@/assets/data/orders'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import OrderListItem from '@/src/components/OrderListItem'
import { useLocalSearchParams, Stack } from 'expo-router'
import { FlatList, Text, View } from 'react-native'

export default function OrdersDetailsScreen() {
    const { id } = useLocalSearchParams()

    const order = orders.find((o) => o.id.toString() === id)
    if (!order) {
        return <Text>Order not found</Text>
    }

    return (
        <View style={{ padding: 10, gap: 10 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
            <OrderListItem order={order} />
            <FlatList data={order.order_items} renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }} />
        </View>
    )
}