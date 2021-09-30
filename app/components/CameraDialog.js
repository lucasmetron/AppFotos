import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Modal,
    TouchableOpacity,
    Text,
    Button
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { PictureService } from "../services/PictureService";

export default function CameraDialog(props) {

    const [isOpen, setIsOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState('https://naminhapanela.com/wp-content/uploads/2020/07/cheesecake-de-chocolate-2.jpg')

    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props.isOpen])


    async function getImageFromClipboard() {

        const imageURL = await Clipboard.getString();
        const extensions = ['.png', '.jpg', '.jpeg'];
        const isImage = extensions.some(extension => imageURL.toLowerCase().includes(extension))

        if (isImage) {
            setCurrentImage(imageURL);
        }

    }

    async function save() {
        const result = await PictureService.save(currentImage);
        props.onClose(result);
    }

    function shot() {
        console.log('tirando foto')
    }


    return (
        <Modal
            transparent={false}
            animationType='slide'
            visible={isOpen}
        >
            <View style={styles.modalView}>

                <View style={styles.previewContainer}>
                    <Image source={{ uri: currentImage }} style={styles.preview} />
                    <TouchableOpacity onPress={props.onClose} >
                        <Text style={styles.closeButton}>X</Text>
                    </TouchableOpacity>
                </View>

                <View>

                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title='Salvar'
                        onPress={save}
                        color='#0062ac'
                    />
                    <Button
                        title='Tirar foto'
                        onPress={shot}
                        color='#0062ac'
                    />
                    <Button
                        title='Colar'
                        onPress={getImageFromClipboard}
                        color='#0062ac'
                    />
                </View>


            </View>

            <View>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
    },

    previewContainer: {
        backgroundColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    preview: {
        width: 100,
        height: 75,
        borderWidth: 2,
        borderColor: 'black'
    },

    closeButton: {
        padding: 15,
        backgroundColor: 'red',
        fontSize: 20,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        backgroundColor: 'gray'
    }
});