import Modal from "@mui/material/Modal/Modal";
import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";

import s from "./styles.module.scss";
import React, {ChangeEvent, FC, useRef, useState} from "react";
import {FormikErrors, useFormik} from "formik";
import {topics} from "../../utils/topics";
import {useDispatch, useSelector} from "react-redux";
import {createChannel} from "../../redux/ChatReducer";
import {AppRootType} from "../../redux/redux-store";

interface IProps {
    title: string;
    handleClose: () => void;
    isOpen: boolean;

}

interface InitialValuesType {
    name: string;
}


export const AddChannelModal: FC<IProps> = ({
                                                title,
                                                handleClose,
                                                isOpen,
                                                children,
                                            }) => {

    const inRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any>();
    const authId = useSelector<AppRootType,number | null>(state=>state.profilePage.userId)
    const dispatch = useDispatch()
    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0]; //достаем из таргета файлы, если файлы есть - прилетает массив, откуда достаем 0
        if (newFile) {
            setFile(newFile);
        }
    };
    const formik = useFormik({
        initialValues: {
            name: "",
        } as InitialValuesType,
        validate: (values: InitialValuesType) => {
            let errors: FormikErrors<InitialValuesType> = {};
            if (!values.name) {
                errors.name = 'Заполните поле';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(createChannel({
                create_params:{
                    name:values.name,
                    type:"GROUP",
                    members_ids:[authId ? authId : 67]
                },
                image:file
            }))
            handleClose();
        },
    });
    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box className={s.modalBlock}>
                <div className={s.top}>
                    <h2 className={s.title}>
                        {title}
                        <button
                            className={s.cancelBtn}
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            <svg
                                width="14"
                                fill={"red"}
                                height="14"
                                viewBox="0 0 14 14"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/>
                            </svg>
                        </button>
                    </h2>
                </div>
                <div className={s.content}>
                    <form onSubmit={formik.handleSubmit} className={s.form}>
                        <div className={s.inputWrap}>
                            <h6>Введите название чата</h6>
                            <TextField
                                className={s.input}
                                placeholder={"Введите текст"}
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                style={formik.errors.name ? {border: '2px solid red'} : {}}
                            />
                            {formik.errors.name && <span style={{color:'red', marginLeft:'5px'}}>{formik.errors.name}</span>}

                        </div>
                        <div className={s.inputWrap}>
                            <h6>Выберите изображение</h6>
                            <TextField
                                className={`${s.imageInput}  ${s.input}`}
                                type="file"
                                name="image"
                                onChange={upload}
                                ref={inRef}
                            />
                        </div>
                        <div className={s.btnWrap}>
                            <Button variant={"contained"} type="submit">
                                Создать чат
                            </Button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};