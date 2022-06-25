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
import {ChangeEvent, FC, useRef, useState} from "react";
import {FormikErrors, useFormik} from "formik";
import {topics} from "../../utils/topics";

interface IProps {
    title: string;
    handleClose: () => void;
    isOpen: boolean;
    addPost?: (params: any) => void;
    editPost?: (params: any) => void;
    postText?: string;
    postTopic?: string;
}

interface InitialValuesType {
    text: string;
    topic: string;
}



export const PostModal: FC<IProps> = ({
                                          title,
                                          handleClose,
                                          isOpen,
                                          addPost,
                                          editPost,
                                          postText,
                                          postTopic,
                                          children,
                                      }) => {
    const [topic, setTopic] = useState("");
    const inRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any>();

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0]; //достаем из таргета файлы, если файлы есть - прилетает массив, откуда достаем 0
        if (newFile) {
            setFile(newFile);
        }
    };
    const handleChange = (event: SelectChangeEvent) => {
        setTopic(event.target.value as string);
    };

    const formik = useFormik({
        initialValues: {
            text: postText ? postText : "",
            topic: postTopic ? postTopic : "",
        } as InitialValuesType,
        validate: (values: InitialValuesType) => {
            let errors: FormikErrors<InitialValuesType> = {};
            if (!values.topic) {
                errors.topic = 'Required';
            }
            if (!values.text) {
                errors.text = 'Required';
            }
            return errors;
        },
        onSubmit: (values) => {
            debugger
            if (addPost) {
                addPost({
                    create_params: {
                        text: values.text,
                        topic: values.topic,
                    },
                    image: file
                });
            }
            if (editPost) {
                editPost({
                    create_params: {
                        text: values.text,
                        topic: values.topic,
                    },
                    // image: ''
                });
            }

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
                                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
                            </svg>
                        </button>
                    </h2>
                </div>
                <div className={s.content}>
                    {children ? (
                        children
                    ) : (
                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <div className={s.textAreaWrap}>
                                <h6>Введите текст поста</h6>
                                <TextField
                                    className={s.textArea}
                                    placeholder={"Введите текст"}
                                    name="text"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.text}
                                    style={formik.errors.text ? {border:'2px solid red'} : {}}
                                />

                        </div>
                            <div className={s.selectWrap}>
                                <h6>Выберите интерес</h6>
                                <Select
                                    className={s.select}
                                    placeholder={"Выберите интерес"}
                                    value={topic}
                                    name="topic"
                                    style={formik.errors.topic ? {border:'2px solid red'} : {}}
                                    onChange={(e) => {
                                        handleChange(e);
                                        formik.handleChange(e);
                                    }}
                                >
                                    {topics.map((topic, index) => {
                                        return (
                                            <MenuItem value={topic.value} key={index}>
                                                {topic.label}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div className={s.inputWrap}>
                                <TextField
                                    className={s.imageInput}
                                    type="file"
                                    name="image"
                                    onChange={upload}
                                    ref={inRef}
                                />
                            </div>
                            <div className={s.btnWrap}>
                                <Button variant={"contained"} type="submit">
                                    Отправить
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </Box>
        </Modal>
    );
};