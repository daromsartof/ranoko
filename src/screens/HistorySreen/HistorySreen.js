import {
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import useToken from '../../hooks/useToken'
import TransactionHistory from '../../components/TransactionHistory'
import HistoryService from './services/HistoryService'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

const HistorySreen = () => {
  const token = useToken()
  const [historys, setHistorys] = useState([])

  const handleGetMyHistory = async () => {
    setHistorys(await HistoryService.getMyHistory(token))
  }

  useEffect(() => {
    handleGetMyHistory()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View>
            <TransactionHistory
                data={historys}
            />
        </View>
    </SafeAreaView>
  )
}

export default HistorySreen
