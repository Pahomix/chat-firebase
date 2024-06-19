import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useStore from '../store/store'
import { auth } from '../services/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


export default function AuthScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const setUser = useStore((state) => state.setUser);
	
	const handleSignUp = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = {
				uid: userCredential.user.uid,
				email: userCredential.user.email,
				avatar: ''
			};
			setUser(user);
		} catch (error) {
			console.log(error);
		}
	}
	
	const handleSignIn = async () => {
		try {
			const userCredential =  await signInWithEmailAndPassword(auth, email, password);
			const user = {
				uid: userCredential.user.uid,
				email: userCredential.user.email,
				avatar: ''
			};
			setUser(user);
		} catch (error) {
			console.log(error);
		}
	}
	
	return (
		<SafeAreaView className='flex-1 justify-center p-4'>
			<Text className='text-2xl font-bold mb-4'>Добро пожаловать</Text>
			<TextInput
				placeholder="Email"
				onChangeText={setEmail}
				value={email}
				className='border border-gray-300 p-2 mb-4 rounded'
			/>
			<TextInput
				placeholder="Пароль"
				onChangeText={setPassword}
				value={password}
				secureTextEntry
				className='border border-gray-300 p-2 mb-4 rounded'
			/>
			<View className='mb-4'>
				<Button title="Зарегистирироваться" onPress={handleSignUp} />
			</View>
			<View className='mb-4'>
				<Button title="Войти" onPress={handleSignIn} />
			</View>
		</SafeAreaView>
	);
}