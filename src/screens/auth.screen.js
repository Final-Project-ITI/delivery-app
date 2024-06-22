import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../App'; // Adjust the import based on your file structure

const AuthScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { setIsAuthenticated } = useAuth();

    const onSubmit = async data => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/api/v1/authentication/login', data);
            console.log(response.data)
            if (response.data.token) {
                setIsAuthenticated(true);
                navigation.navigate('Orders');
            } else {
                Alert.alert('Error', 'Invalid credentials');
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Log In</Text>

            <View style={styles.inputContainer}>
                <Text>Email</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Email"
                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.errorText}>This is not a valid email.</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text>Password</Text>
                <Controller
                    control={control}
                    rules={{ required: true, minLength: 6 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Password"
                            secureTextEntry
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={styles.errorText}>Password must be at least 6 characters.</Text>}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EFEA',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        color: '#D6453D',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D6453D',
        borderRadius: 25,
        padding: 10,
        width: '100%',
        backgroundColor: '#F5EFEA',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#D6453D',
        padding: 15,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AuthScreen;
