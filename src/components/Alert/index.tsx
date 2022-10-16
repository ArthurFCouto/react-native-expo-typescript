import { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useAlert } from '../../context/alert';
import { ContainerAlert, Details, Message } from './styles';
import { getShadowProps } from '../../util';

const propsStyle = {
    primary: {
        color: '#004085',
        bgColor: '#cce5ff',
        borderColor: '#b8daff',
        Icon: () =>
            <Ionicons
                color={'#004085'}
                name='md-information-circle-outline'
                size={24}
                style={styles.icon}
            />,
    },
    danger: {
        color: '#721c24',
        bgColor: '#f8d7da',
        borderColor: '#f5c6cb',
        Icon: () =>
            <Ionicons
                color={'#721c24'}
                name='md-alert-circle-outline'
                size={24}
                style={styles.icon}
            />,
    },
    warning: {
        color: '#856404',
        bgColor: '#fff3cd',
        borderColor: '#ffeeba',
        Icon: () =>
            <Ionicons
                color={'#856404'}
                name='md-warning-outline'
                size={24}
                style={styles.icon}
            />,
    },
}

export default function Alert() {
    const [visible, setVisible] = useState<boolean>(false);
    const theme = useTheme();
    const { messageAlert, setMessageAlert, style } = useAlert();
    const props = propsStyle[style];
    const { Icon } = props;

    useEffect(() => {
        if (messageAlert.length > 0) {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
                setMessageAlert('', 'primary');
            }, 3500);
        }
    }, [messageAlert]);

    return (
        <Modal
            animationType='fade'
            transparent
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <ContainerAlert>
                    <Details
                        borderColor={props.borderColor}
                        bgColor={props.bgColor}
                        style={getShadowProps()}
                    >
                        {
                            Icon()
                        }
                        <Message
                            color={props.color}
                            ellipsizeMode='tail'
                            numberOfLines={4}
                        >
                            {messageAlert}
                        </Message>
                    </Details>
                </ContainerAlert>
            </TouchableWithoutFeedback>
        </Modal >
    )
}

const styles = StyleSheet.create({
    icon: {
        textAlign: 'center',
        marginBottom: 'auto',
        marginRight: 8,
        marginTop: 'auto',
    }
})