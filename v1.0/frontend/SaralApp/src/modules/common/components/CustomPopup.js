import React, { Component } from 'react';
import { ScrollView, View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import AppTheme from '../../../utils/AppTheme';
const {  width } = Dimensions.get('window');
import C from '../../../flux/actions/constants';
import Strings from '../../../utils/Strings';
import { monospace_FF } from '../../../utils/CommonUtils';

const CustomPopup = ({
    params,
    title,
    customModalStatus,
    message,
    customStyle,
    customPopStyle,
    cancel_button,
    ok_button=true,
    customTitleTextStyle,
    customMessageTxtStyle,
    bgColor,
    modalMessage
}) => {

    //Hooks
    const dispatch = useDispatch();


    //Functions
    const dispatchModalStatus = (value) => {
        return ({
            type: C.CUSTOM_MODAL_STATUS,
            payload: value
        })
    }

    const setModalVisible = () => {
        dispatch(dispatchModalStatus(!customModalStatus));
    }

    const onOkBtnPress = () => {
        dispatch(dispatchModalStatus(false));
    }

    return (
        <Modal
            visible={customModalStatus}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
                setModalVisible()
            }}
            statusBarTranslucent={true}
        >
            <View style={[{
                flex: 1,
                shadowColor: "black",
                shadowOpacity: .2,
                backgroundColor: "#000000A6",
                shadowOffset: { height: 3, width: 3 },
                shadowRadius: 10,

            }, customStyle]}>
                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View
                        style={[{
                            elevation: 4,
                            backgroundColor: AppTheme.WHITE,
                            marginHorizontal: 10,
                            borderRadius: 6,
                            padding: 14

                        }, customPopStyle]}>
                        <Text style={[styles.titleTextStyle, customTitleTextStyle]}>{modalMessage.title}</Text>
                        <Text style={[styles.messageTextStyle, customMessageTxtStyle]}>{modalMessage.message}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingVertical: .03,
                                justifyContent: "flex-end",
                                marginRight: width * .04,
                                marginTop: 20
                            }}>
                            {cancel_button ?
                                <TouchableOpacity
                                    onPress={onCancelPress}
                                    activeOpacity={0.7}
                                    style={{
                                        paddingHorizontal: width * .03,
                                        justifyContent: "center"
                                    }}>
                                    <Text style={[styles.TextStyle]}> {Strings.cancel_button} </Text>
                                </TouchableOpacity> : null}

                            {ok_button ?
                                <TouchableOpacity
                                    onPress={modalMessage.isOkAvailable ? modalMessage.okFunc : onOkBtnPress}
                                    style={{
                                        paddingHorizontal: "6%",
                                        justifyContent: "center",
                                        backgroundColor: bgColor,
                                        borderRadius: 20,
                                        paddingVertical: "2%"
                                    }}
                                    activeOpacity={0.7}>
                                    <Text style={[styles.TextStyle]}> {Strings.ok_button} </Text>
                                </TouchableOpacity> : null}

                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = {

    titleTextStyle: {
        fontSize: AppTheme.HEADER_FONT_SIZE_SMALL,
        color: AppTheme.BLACK,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: '2%',
        fontFamily: 'monospace'
    },

    messageTextStyle: {
        lineHeight: 25,
        fontSize: AppTheme.FONT_SIZE_REGULAR + 2,
        color: AppTheme.DIM_GREY,
        height: 'auto',
        textAlign: 'left',
        marginVertical: '.5%',
        marginBottom: 10,
        fontFamily: 'monospace'
    },

    TextStyle: {
        color: AppTheme.WHITE,
        textAlign: 'center',
        fontSize: AppTheme.FONT_SIZE_REGULAR,
        fontWeight: "bold",
        fontFamily : monospace_FF
    }

};

const mapStateToProps = (state) => {
    return {
        customModalStatus: state.customModalStatus,
        modalMessage: state.modalMessage
    }
}



export default (connect(mapStateToProps, null)(CustomPopup));
