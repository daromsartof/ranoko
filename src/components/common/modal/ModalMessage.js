import React from 'react'
import { Text, View, Modal, ImageBackground, Pressable } from 'react-native'
import styles from './styles/style'
import CustomButton from '../../CustomButton'
import { PRIMARY_COLOR, SECONDARY_COLOR, imageAssets } from '../../../config'
import Icon from 'react-native-vector-icons/AntDesign'

/**
 * @param {{
 * status: 'success' | 'warning' | 'danger'
 * }}
 */
const ModalMessage = ({
    modalVisible,
    message,
    setModalVisible,
    status
}) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={[styles.centeredView, {
                    backgroundColor: modalVisible ? "#3e3e3e82": "white"
                }]}>
                    <View style={[styles.modalView, { justifyContent: 'flex-end' }]}>
                        <ImageBackground style={{ width: 400, height: 400 }} source={imageAssets.message} resizeMode="cover" imageStyle={{ opacity: 1 }}>
                            <View style={{ display: "flex", justifyContent: "flex-end", position: 'relative', height: "100%" }}>
                               {/* <View style={{ position: "absolute", top: 8, right: 8, backgroundColor: "red", borderRadius: 5 }}>
                                    <Pressable onPress={setModalVisible}>
                                        <Icon name="close" size={30} color="#fff" />
                                    </Pressable>
            </View>*/}
                                <View style={{ height: 260, width: "100%",paddingHorizontal: 40, position: "absolute", right: 0, top:30, display: "flex", justifyContent: "center" }}>
                                    <Text style={[styles.modalText]}>{message}</Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <CustomButton
                                        customStyles={{
                                            backgroundColor: SECONDARY_COLOR
                                        }}
                                        text={"OK"}
                                        onPress={setModalVisible}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalMessage