import { View, Text, StyleSheet, TextInput, Platform, Image, Alert, InteractionManager } from 'react-native'
import { useEffect, useState } from 'react'
import Button from '@/src/components/Button'
import * as Device from 'expo-device';
import { defaultPizzaImage } from '@/src/components/ProductListItems';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products';


const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState('')
    const [image, setImage] = useState<string | null>(null);
    const [deleted, setDeleted] = useState(false);



    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
    const isUpdating = !!id

    const { mutate: insertProduct } = useInsertProduct()
    const { mutate: updateProduct } = useUpdateProduct()
    const { data: updatingProduct } = useProduct(id, isUpdating && !deleted)
    const { mutate: deleteProduct } = useDeleteProduct()

    const router = useRouter()

    useEffect(() => {
        setName(updatingProduct?.name)
        setPrice(updatingProduct?.price.toString())
        setImage(updatingProduct?.image)
    }, [updatingProduct])



    const resetFields = () => {
        setName('')
        setPrice('')
    }

    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors('Name is required')
            return false
        }
        if (!price) {
            setErrors('Price is required')
            return false
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price must be a number')
            return false
        }
        return true;

    }
    const onSubmit = () => {
        if (isUpdating) {
            onUpdateCreate()
        } else {
            onCreate()
        }
    }

    const onCreate = () => {
        if (!validateInput()) {
            return
        }



        console.warn("Create Product", name)
        insertProduct({ name, price: parseFloat(price), image }, {
            onSuccess: () => {
                resetFields()
                router.back()
            }
        })



    }
    const onUpdateCreate = () => {
        if (!validateInput()) {
            return
        }
        updateProduct({
            id,
            name,
            price: parseFloat(price),
            image,


        },
            {
                onSuccess: () => {
                    resetFields()
                    router.back()
                }
            })




        console.warn("Update Product", name)


    }



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });



        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onDelete = () => {
        console.warn("DELETE!!!")
        deleteProduct(id, {
            onSuccess: () => {
                setDeleted(true);
                InteractionManager.runAfterInteractions(() => {
                    router.replace('/(admin)/menu');
                });

            }
        })
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {
                text: "Cancel",
            },
            {
                text: "Delete",
                style: 'destructive',
                onPress: onDelete,
            }
        ])
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? "Update Product" : 'Create Product' }} />
            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput keyboardType='numeric' value={price} onChangeText={setPrice} placeholder="9.99" style={styles.input} />

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,

    },
    image: {
        width: "50%",
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,

    },
    label: {
        color: 'gray',
        fontSize: 16,
    }
})

export default CreateProductScreen