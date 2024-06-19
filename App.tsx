import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebaseConfig'
import useStore from './src/store/store'

import Navigation from './src/navigation/Navigation'

export default function App() {
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    
    return () => unsubscribe()
  }, [])
  
  return <Navigation user={user} />
}
