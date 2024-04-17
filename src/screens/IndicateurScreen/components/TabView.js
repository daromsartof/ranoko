import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Pressable, } from 'react-native'
import { Card, Button } from '@rneui/themed'
import useColor from '../../../hooks/useColor'
import Icon from 'react-native-vector-icons/AntDesign'
import { imageAssets } from '../../../config';
import { isLandingPage } from '../services/indicateur.service';

const TabView = ({ items = [], children, data }) => {
    const [primaryColor] = useColor(true)
    const [index, setIndex] = useState(items.length + 1)
    
    return (
        <Card containerStyle={[styles.cardContainer, {
            borderColor: primaryColor.frontColor
        }]}>
            {!isLandingPage(index, items) && (
                <View>
                    <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10
                }}>
                    <Pressable
                        onPress={() => setIndex(items.length + 1)}
                    >
                       
                      <Text style={{
                            textAlign: "center",
                            color: primaryColor.frontColor,
                            fontWeight: 'bold'
                        }}>
                             <Icon name="left" size={15} color={primaryColor.frontColor} style={{
                     
                     }} />
                            Retour
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setIndex(index === 0 ? 1 : 0)}
                    >
                      <Text style={{
                            textAlign: "center",
                            color: primaryColor.frontColor,
                            fontWeight: 'bold',
                        }}>
                            {index === 0 ? "Chiffre" : "Graphique"}
                            <Icon name="right" size={15} color={primaryColor.frontColor} style={{padding: 10}} />
                        </Text>
                    </Pressable>
                </View>
                <View style={{
                    borderBottomColor: "#a4a4a48f",
                    borderBottomWidth: 1
                }} >
                  <Text style={{textAlign: "center",color: primaryColor.frontColor,fontWeight: 'bold', paddingBottom: 2}}>
                        {data.libelle}
                    </Text>
                </View>
                    
                </View>
                
            )}
            {isLandingPage(index, items) ? (
                <>
                    <View style={{
                        paddingVertical: 10,
                        borderBottomColor: "#a4a4a48f",
                        borderBottomWidth: 1
                    }}>
                        <Text style={{
                            textAlign: "center",
                            color: primaryColor.frontColor,
                            fontWeight: 'bold'
                        }}>
                            {data.libelle}
                        </Text>
                    </View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            {items.map((item, i) => (
                                <Button
                                    key={i}
                                    onPress={() => setIndex(i)}
                                    buttonStyle={styles.pressableStyle}
                                    containerStyle={{
                                        width: "48%"
                                    }}
                                    titleStyle={{
                                        color: 'black'
                                    }}
                                >
                                    {item}
                                </Button>
                            ))}
                        </View>
                        <View style={{ height:320 , justifyContent: "center", alignItems:"center" }}>
                            <Image style={{
                                height: 200,
                                width: 200,
                                objectFit: 'cover'
                            }} source={imageAssets[data.libelle] || imageAssets.bg} />
                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.container}>
                    { 
                        children.map((item, i) => {
                            return (
                                <View key={i} style={{display: index === i ? "flex" : "none"}}> 
                                    {item}
                                </View>  
                            )
                        })
                    }                 
                </View>
            )}
        </Card>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        margin: 5, 
        padding: 0,
        marginBottom: 20, 
        borderRadius: 20, 
        overflow: "hidden",
        borderWidth: 2,
    },
    container: {
        flex: 1,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
    btn: {
        textAlign: 'center',
    },
    pressableStyle: {
        flex: 1,
        padding: 10,
        color: "#000000",
        backgroundColor: "transparent",
        borderBottomWidth: 1,
        borderBottomColor: "#a4a4a48f",
    }
});

export default TabView;