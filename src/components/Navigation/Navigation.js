import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import GedScreen from '../../screens/GedScreen'
import HistoryScreen from '../../screens/HistoryScreen'
import HomeScreen from '../../screens/HomeScreen'
import PdfScreen from '../../screens/PdfScreen'
import SendingScreen from '../../screens/SendingScreen'
import SignInScreen from '../../screens/SignInScreen'
import SplashScreen from '../../screens/SplashScreen'
import TestScreen from '../../screens/TestScreen'
import InProgressScreen from '../../screens/InProgressScreen'
import IndicateurScreen from '../../screens/IndicateurScreen'
import PieceManquante from '../../screens/PieceManquante'
import Header from '../Header'

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
            {/* <Stack.Screen name= "test" component={IndicateurScreen}/> */}

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sending"
              component={SendingScreen}
              options={{ title: 'Envoi Image' }}
            />
            <Stack.Screen
              name="History"
              component={HistoryScreen}
              options={{ title: 'Images déjà envoyées' }}
            />
            <Stack.Screen
              name="Ged"
              component={GedScreen}
              options={{ title: 'GED' }}
            />
            <Stack.Screen
              name="Pdfscreen"
              component={PdfScreen}
              options={{ title: 'Image' }}
            />
            <Stack.Screen
              name="Indicateur"
              component={IndicateurScreen}
              options={{ title: 'Indicateur' }}

            />
            <Stack.Screen
              name="Piecemanquante"
              component={PieceManquante}
                options={
                  { 
                    title: 'Echéances et Pièces'
                  }
                }

            />
            <Stack.Screen
              name="InProgress"
              component={InProgressScreen}
              options={{ title: 'En cours ...' }}
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
