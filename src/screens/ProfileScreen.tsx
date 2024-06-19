import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig'
import useStore from '../store/store'

export default function ProfileScreen() {
	const user = useStore(state => state.user);
	const [email, setEmail] = useState(user.email);
	const [avatar, setAvatar] = useState(user.avatar);
	const [loading, setLoading] = useState(false);
	
	const handleSave = async () => {
		setLoading(true);
		try {
			const userDoc = doc(db, 'users', user.uid);
			await updateDoc(userDoc, {
				email,
				avatar,
			});
			useStore.setState({ user: { ...user, email, avatar } });
			Alert.alert('Profile updated successfully');
			console.log('Profile updated successfully');
		} catch (error) {
			console.error('Error updating profile:', error);
			Alert.alert('Error updating profile:', error.message);
		} finally {
			setLoading(false);
		}
	};
	
	return (
		<SafeAreaView className='flex-1 p-4'>
			<Text className='text-2xl font-bold text-center mb-4'>Профиль</Text>
			{avatar ? <Image source={{ uri: avatar }} className='w-24 h-24 rounded-full mb-4 self-center' /> : null}
			<Text className='text-xl font-bold mb-4'>Почта: {useStore(state => state.user.email)}</Text>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				className='border border-gray-300 p-2 mb-4 rounded'
			/>
			<TextInput
				placeholder="Avatar URL"
				value={avatar}
				onChangeText={setAvatar}
				className='border border-gray-300 p-2 mb-4 rounded'
			/>
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<Button title="Save" onPress={handleSave} />
			)}
		</SafeAreaView>
	);
}