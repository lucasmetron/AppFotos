import fs from 'react-native-fs'
import { Alert } from 'react-native';
import { NetworkService } from './NetworkService';

export const PictureService = {


    async save(filepath) {
        if (filepath.startsWith('http')) {
            filepath = await PictureService.saveRemote(filepath);
        }
        return filepath
    },

    async saveToCamera(filepath) {
        const url = await CameraRoll.saveToCameraRoll(filepath, 'photo');
        return url
    },

    async saveRemote(fromURL) {
        const toFile = `${fs.DocumentDirectoryPath}/${Date.now()}.png`;
        const result = await fs.downloadFile({
            fromUrl: fromURL,
            toFile: toFile,
        });
        return 'file://' + toFile;
    },

    async selectPicture(item, onRemoveCallback) {
        Alert.alert(
            'Minha imagem',
            `ID: ${item.id}`,
            [
                {
                    text: 'Compartilhar',
                    onPress: () => PictureService.onShare(item),
                },
                {
                    text: 'Apagar',
                    onPress: () => onRemoveCallback(item)
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                }
            ],
            {
                cancelable: false
            }
        )
    },

    async onShare(item) {
        const response = await NetworkService.share(item.url)
    },
}