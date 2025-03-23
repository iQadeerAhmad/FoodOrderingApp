import { View, Text, StyleSheet, TextInput, Platform, Image } from 'react-native'
import { useState } from 'react'
import Button from '@/src/components/Button'
import * as Device from 'expo-device';
import { defaultPizzaImage } from '@/src/components/ProductListItems';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';


const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState('')
    const [image, setImage] = useState<string | null>(null);

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

    const onCreate = () => {
        if (!validateInput()) {
            return
        }


        console.warn(`OS: ${Platform.OS}`)
        // console.log('Device Name:', Device.deviceName);
        // console.log('Model:', Device.modelName);
        // console.log('Brand:', Device.brand);
        // console.log('OS:', Device.osName);
        // console.log('OS Version:', Device.osVersion);

        console.log('Name:', name)
        console.log('Price:', price)

        resetFields()

    }

    const resetFields = () => {
        setName('')
        setPrice('')
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


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Create Product' }} />
            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput keyboardType='numeric' value={price} onChangeText={setPrice} placeholder="9.99" style={styles.input} />

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onCreate} text="Create" />
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