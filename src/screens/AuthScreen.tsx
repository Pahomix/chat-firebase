import { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
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
			const  userCredential = await createUserWithEmailAndPassword(auth, email, password);;
			setUser(userCredential);
		} catch (error) {
			console.log(error);
		}
	}
	
	const handleSignIn = async () => {
		try {
			const userCredential =  await signInWithEmailAndPassword(auth, email, password);
			setUser(userCredential);
		} catch (error) {
			console.log(error);
		}
	}
	
	return (
		<SafeAreaView>
			<TextInput placeholder="Email" onChangeText={setEmail} value={email} />
			<TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
			<Button title="Sign Up" onPress={handleSignUp} />
			<Button title="Login" onPress={handleSignIn} />
		</SafeAreaView>
	);
}