import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text } from '@rneui/themed'
import useColor from '../../hooks/useColor'

const styles = StyleSheet.create({
  block: {
    marginBottom: 5,
    marginTop: 5
  },
  Text:{
    paddingVertical: 3,
  }
})
const RenderIfExist = ({content, children}) => {
  if (!content) return null
  if (children) return children
  return (
    <Text style={styles.Text}>{content}</Text>
  ) 
}
const CustomImageBox = ({ image }) => {
  const { name, category, subCategory, date, dateScan, ttc } = image
  const [primaryColor] = useColor(true)
  return (
    <Card containerStyle={{margin: 0, padding: 10, borderRadius: 10, borderColor: primaryColor.gradientColor}}>
      <View style={styles.content}>
        <View style={styles.block}>
          <RenderIfExist content={category} >
            <Text  style={[styles.Text]}>{category ? category.replace(/(.{20})..+/, "$1…") : 'En cours'}</Text>
          </RenderIfExist>
          <RenderIfExist content={subCategory} >
            <Text style={styles.Text}>
              {subCategory ?  subCategory.replace(/(.{20})..+/, "$1…") : ''}
            </Text>
          </RenderIfExist>
          <RenderIfExist content={dateScan}>
            <Text  style={styles.Text}>{`Date Envoi: `}<Text style={{
              fontWeight: 'bold'
            }}>{`${dateScan ? moment(dateScan).format('DD/MM/YYYY') : ''}`}</Text></Text>
          </RenderIfExist>
          <RenderIfExist content={date}>
            <Text  style={styles.Text}>{`Date Pièce: `}<Text style={{
              fontWeight: 'bold'
            }}>
              {`${date ? moment(date).format('DD/MM/YYYY') : ''}`}
              </Text> </Text>
          </RenderIfExist>
          <RenderIfExist content={date}>
            <Text  style={[styles.Text, {
              fontWeight: 'bold'
            }]}>{`TTC: ${ttc ? new Intl.NumberFormat('fr-FR').format(ttc) : '0'}`}</Text>
          </RenderIfExist>
          <RenderIfExist content={name} />
        </View>
      </View>

    </Card>
  )
}

export default CustomImageBox
