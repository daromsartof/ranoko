import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Pressable } from 'react-native'
import { Text, Card, Button } from '@rneui/themed'
import useColor from '../../../hooks/useColor'
import Icon from 'react-native-vector-icons/AntDesign'
import { imageAssets } from '../../../config';

const TabView = ({ items, children, data }) => {
    const [primaryColor] = useColor(true)
    const [index, setIndex] = useState(items.length + 1)
    const defaultIndex = items.length + 1
    const RenderLandingPage = () => {
        return (
            <>
                <Image
                    style={{ padding: 0, borderBottomRightRadius: 20, height: 250 }}
                    source={imageAssets.echeance}
                />
                <View style={{ margin: 10, paddingVertical: 8 }}>
                    <Text style={{
                        textAlign: "left",
                        fontSize: 16
                    }}>
                        Suivez l'evolution de votre
                    </Text>
                    <Text style={{
                        fontWeight: 'bold',
                        textAlign: "left",
                        fontSize: 30,
                        marginTop: 5,
                    }}>{data.libelle}</Text>
                </View>
                <View style={{
                    margin: 10,
                    marginTop: 0
                }}>
                    {items.map((item, i) => (
                        <View key={i}>
                            <Button
                                color={primaryColor.frontColor}
                                onPress={() => setIndex(i)}
                                buttonStyle={{
                                    borderRadius: 20,
                                    margin: 0
                                }}
                                title={item}
                            />
                            {i !== (items.length - 1) && (
                                <Text style={{ textAlign: 'center', marginVertical: 5 }}>OU</Text>
                            )}
                        </View>
                    ))}
                </View>

            </>
        )
    }
    return (
        <Card containerStyle={{ margin: 5, padding: 0, marginBottom: 20, borderRadius: 20}}>
            {(defaultIndex !== index) && (
                <View>
                    <Pressable
                        onPress={() => setIndex(defaultIndex)}
                    ><Icon name="left" size={15} color="#900" style={{
                        padding: 10
                    }} /></Pressable>
                </View>
            )}

            <View style={styles.container}>
                {Array.isArray(children) ? (
                    <>
                        {children[index] ?? <RenderLandingPage />}
                    </>
                ) : children}
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
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
});

export default TabView;