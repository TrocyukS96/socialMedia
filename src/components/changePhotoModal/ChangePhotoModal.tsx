import Modal from "@mui/material/Modal/Modal"
import {Box, Button, TextField} from "@mui/material";
import s from './styles.module.scss';
import {ChangeEvent, FC, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {updateProfileImage} from "../../redux/ProfileReducer";

interface IProps {
    image: string
    handleClose: () => void
    isOpen: boolean
    changeImage: (value: string) => void
}

export const ChangePhotoModal: FC<IProps> = ({
                                                 image,
                                                 handleClose,
                                                 isOpen,
                                                 changeImage
                                             }) => {
    const inRef = useRef<HTMLInputElement>(null);
    const [code, setCode] = useState(true);
    const [base64, setBase64] = useState(true); // base64 - true, text - false
    const [text, setText] = useState('');
    const [file, setFile] = useState<any>();
    const [fileURL, setFileURL] = useState<any>();
    const [file64, setFile64] = useState<any>();
    const [fileData, setFileData] = useState<any>();
    const dispatch = useDispatch()

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        // e.preventDefault();
        const reader = new FileReader();
        const formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0];  //достаем из таргета файлы, если файлы есть - прилетает массив, откуда достаем 0


        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));  //спецовая функция Window, так мы можем отобразить newFile в img, эта функция генерит спец ссылку, которая видна только внутри этого проекта
            formData.append('myFile', newFile, newFile.name);
            setFileData(formData);

            if (code) { // reader
                reader.onloadend = () => {
                    setFile64(reader.result);
                };

                if (base64) reader.readAsDataURL(newFile);
                else reader.readAsText(newFile);
            }
        }
    };
    const saveDataHandler = () => {
        dispatch(updateProfileImage({avatar: file64.split(',')[1]}))
    }
    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box className={s.modalBlock}>
                <div className={s.top}>
                    <h2 className={s.title}>Редактировать изображение профиля
                        <button className={s.cancelBtn} onClick={() => {
                            handleClose()
                        }}>
                            <svg width="14" fill={'red'} height="14" viewBox="0 0 14 14"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                                />
                            </svg>
                        </button>
                    </h2>

                </div>
                <div className={s.content}>
                    <div className={s.imgWrap}>
                        <h6>Аватар</h6>
                        <img src={file64 ? file64 : image} alt="profile image"/>
                        <div className={s.changeImgInput}>
                            <TextField
                                type="file"
                                name="image"
                                onChange={upload}
                                ref={inRef}
                            />
                        </div>
                    </div>
                    <div className={s.btnWrap}>
                        <Button variant={'contained'} onClick={saveDataHandler}>Сохранить</Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}