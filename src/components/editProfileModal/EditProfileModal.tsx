import Modal from "@mui/material/Modal/Modal"
import {Box, Button, Checkbox, FormControlLabel, SelectChangeEvent, TextField} from "@mui/material";
import s from './styles.module.scss';
import {FC, useState} from "react";
import {useFormik} from "formik";
import {topics} from "../../utils/topics";

interface IProps {
    title: string
    handleClose: () => void
    isOpen: boolean
    editProfile?: (params: any) => void
    firstName: string
    lastName: string
    email: string
    userName: string
    profileInterests: string[]
}

interface InitialValuesType {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    // interests: string[],
}


export const EditProfileModal: FC<IProps> = ({
                                                 title,
                                                 handleClose,
                                                 isOpen,
                                                 editProfile,
                                                 email,
                                                 lastName,
                                                 firstName,
                                                 userName, profileInterests
                                             }) => {
    const [interests, setInterests] = useState<string[]>(profileInterests)

    const formik = useFormik({
        initialValues: {
            username: userName,
            email: email,
            first_name: firstName,
            last_name: lastName,
        } as InitialValuesType,
        onSubmit: values => {
            if (editProfile) {
                editProfile({
                    username: values.username,
                    email: values.email,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    interests: interests,
                })
            }
            handleClose()
        },
    });
    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box className={s.modalBlock}>
                <div className={s.top}>
                    <h2 className={s.title}>{title}
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
                    <form onSubmit={formik.handleSubmit} className={s.form}>
                        <div className={`${s.inputWrap} ${s.userName}`}>
                            <h6>Никнэйм</h6>
                            <TextField
                                className={s.input}
                                placeholder={'Введите никнэйм'}
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                        </div>
                        <div className={`${s.inputWrap} ${s.email}`}>
                            <h6>Почта</h6>
                            <TextField
                                className={s.input}
                                placeholder={'Введите email'}
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        <div className={`${s.inputWrap} ${s.firstName}`}>
                            <h6>Имя</h6>
                            <TextField
                                className={s.input}
                                placeholder={'Введите имя'}
                                name="first_name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                            />
                        </div>
                        <div className={`${s.inputWrap} ${s.lastName}`}>
                            <h6>Фамилия</h6>
                            <TextField
                                className={s.input}
                                placeholder={'Введите фамилию'}
                                name="last_name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                            />
                        </div>
                        <div className={s.checkboxWrap}>
                            <h6>Выберите интересы</h6>
                            <div className={s.checkboxes}>
                                {
                                    topics.map((topic, index) => {
                                        return (
                                            <FormControlLabel
                                                value={topic.value}
                                                checked={interests && interests.includes(topic.value)}
                                                control={<Checkbox
                                                    onChange={(e) => {
                                                        if (e.currentTarget.checked) {
                                                            setInterests([...interests,topic.value])
                                                            console.log(interests)
                                                        } else {
                                                            setInterests(interests.filter(f=>f!==topic.value))
                                                            console.log(interests)
                                                        }
                                                    }}/>}
                                                label={topic.label}
                                                labelPlacement="end"

                                            />

                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={s.btnWrap}>
                            <Button variant={'contained'} type="submit">Отправить</Button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    )
}