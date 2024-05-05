import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import ListUserScreen from '../../screens/ListUserScreen'
import HomeScreen from '../../screens/HomeScreen'
import SignInScreen from '../../screens/SignInScreen'
import SplashScreen from '../../screens/SplashScreen'

import Header from '../Header'
import TakeWaterScreen from '../../screens/TakeWaterScreen'
import BoitindrakitraScreen from '../../screens/BoitindrakitraScreen'
import HistorySreen from '../../screens/HistorySreen'
import UserProfileScreen from '../../screens/UserProfileScreen/UserProfileScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext)
  const [userPersonnalization, setUserPersonnalization] = useState({})

  useEffect(() => {
    if (userInfo) {
      const { personnalization } = userInfo
      if (personnalization) {
        const { primaryColor, secondaryColor } = personnalization
        setUserPersonnalization({ primaryColor, secondaryColor })
      }
    }
  }, [userInfo])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: userPersonnalization.primaryColor ? { backgroundColor: userPersonnalization.primaryColor, margin:0, padding:0 } : {},
          headerTintColor: userPersonnalization.secondaryColor ? userPersonnalization.secondaryColor : {},
          header : (props) => <Header {...props} />,
          headerTitleStyle: {
            fontFamily: 'Fontastique',
            color: userPersonnalization.secondaryColor ? userPersonnalization.secondaryColor : {}
          }
        }}>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo.token ? (
          <>

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ListUserScreen"
              component={ListUserScreen}
              options={{ title: "Lisitrin'ny mpampiasa rano" }}
            />
            <Stack.Screen
              name="TakeWaterScreen"
              component={TakeWaterScreen}
              options={{ title: "Haka Rano" }}
            />
             <Stack.Screen
              name="BoitindrakitraScreen"
              component={BoitindrakitraScreen}
              options={{ title: "Boitindrakitra" }}
            />
            <Stack.Screen
              name="HistorySreen"
              component={HistorySreen}
              options={{ title: "Historika" }}
            />
             <Stack.Screen
              name="UserProfileScreen"
              component={UserProfileScreen}
              options={{ title: "Profile" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
