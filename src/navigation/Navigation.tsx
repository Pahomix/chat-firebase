import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen from '../screens/AuthScreen'
import FriendsScreen from '../screens/FriendsScreen'
import MessagesScreen from '../screens/MessagesScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthStack = () => (
	<Stack.Navigator
		screenOptions={{ headerShown: false }}
		initialRouteName="Auth"
	>
		<Stack.Screen name="Auth" component={AuthScreen} />
	</Stack.Navigator>
)

const AppTabs = () => (
	<Tab.Navigator
		screenOptions={{ headerShown: false }}
	>
		<Tab.Screen name="Сообщения" component={MessagesScreen} />
		<Tab.Screen name="Друзья" component={FriendsScreen} />
		<Tab.Screen name="Профиль" component={ProfileScreen} />
	</Tab.Navigator>
)

const Navigation = ({ user }) => {
	return (
		<NavigationContainer>
			{user ? <AppTabs /> : <AuthStack />}
		</NavigationContainer>
	)
}

export default Navigation