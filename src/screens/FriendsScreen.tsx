import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../services/firebaseConfig'
import useStore from '../store/store'

export default function FriendsScreen() {
	const user = useStore(state => state.user);
	const friends = useStore(state => state.friends);
	const setFriends = useStore(state => state.setFriends);
	
	useEffect(() => {
		const q = query(collection(db, 'friends'), where('userId', '==', user.uid));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const friends = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setFriends(friends);
		});
		return () => unsubscribe();
	}, [user]);
	
	return (
		<SafeAreaView>
			<Text>Friends</Text>
		</SafeAreaView>
	);
}