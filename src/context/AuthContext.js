import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { LOGIN_URL } from '../config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [splashLoading, setSplashLoading] = useState(false)

    const login = async ({ password, username }) => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                LOGIN_URL,
                { password, username },
                { headers: { 'Content-Type': 'application/json' } }
            )

            const info = {
                ...response.data
            }
            setUserInfo(info)
            AsyncStorage.setItem('userInfo', JSON.stringify(info))
            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)
            throw {
                err,
                status: err.response.status
            }
        }
    }


    const logout = () => {
        setIsLoading(true)
        AsyncStorage.removeItem('userInfo')
        setUserInfo({})
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true)

            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
                setUserInfo(userInfo)
            }

            setSplashLoading(false)
        } catch (e) {
            setSplashLoading(false)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}