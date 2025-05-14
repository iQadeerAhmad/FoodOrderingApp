import { Text, FlatList, SafeAreaView, ActivityIndicator } from "react-native"
import OrderListItem from "@/src/components/OrderListItem"
import { useAdminOrderLIst } from "@/src/api/orders"

export default function OrdersScreen() {
    const { data: orders, isLoading, error } = useAdminOrderLIst();

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </SafeAreaView>
        )
    }
    if (error) {
        return <Text>Failed to fetch</Text>
    }
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }} />
    )
}