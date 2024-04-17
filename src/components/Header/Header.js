import { Button, Header, Text } from '@rneui/themed';
import React from 'react'
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CustomHeader = (props) => {
    return (
        <Header
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={<View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ color: "#ffff" ,fontSize: 18,fontWeight: 'bold' }}>
                    {props.options.title.toLocaleUpperCase()}
                </Text>
            </View>}
            centerContainerStyle={{}}
            containerStyle={{ width: "auto", ...props.options.headerStyle }}
            leftComponent={
                <Button title="Clear" type="clear" onPress={props.navigation.goBack}>
                    <AntDesign name="left" size={18} color="#ffff" />
                </Button>
            }
            linearGradientProps={{}}
            placement="center"
            rightContainerStyle={{}}
            statusBarProps={{}}
        />
    )
}

export default CustomHeader