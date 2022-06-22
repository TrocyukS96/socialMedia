import {Preloader} from "../../components/preloader/Preloader";
import React, {ChangeEvent, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../redux/redux-store";
import {RequestStatusType} from "../../redux/appReducer";
import {useHistory} from "react-router-dom";
import s from './styles.module.scss';
import {Button, Checkbox, Container, FormControlLabel, TextField} from "@mui/material";
import {ProfileResponse} from "../../api/types/profile";
import {useFormik} from "formik";
import {changeProfilePassword, updateProfile} from "../../redux/ProfileReducer";
import SHA256 from "crypto-js/sha256";
import {login} from "../../redux/AuthReducer";

const topics = 'WEB_DEVELOPMENT,DATA_SCIENCE,ANDROID_DEVELOPMENT,IOS_DEVELOPMENT,QUALITY_ASSISTANCE,DESIGN'.split(',')

interface InitialValuesType {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    image: string,
    // interests: string[],
}

export const Settings = () => {
    const status = useSelector<AppRootType, RequestStatusType>(state => state.app.status)
    const isAuth = useSelector<AppRootType, boolean>(state => state.app.isAuth)
    const history = useHistory()
    const profile = useSelector<AppRootType, ProfileResponse>(state => state.profilePage.profile);
    const inRef = useRef<HTMLInputElement>(null);
    const [code, setCode] = useState(true);
    const [base64, setBase64] = useState(true); // base64 - true, text - false
    const [text, setText] = useState('');
    const [file, setFile] = useState<any>();
    const [fileURL, setFileURL] = useState<any>();
    const [file64, setFile64] = useState<any>();
    const [fileData, setFileData] = useState<any>();
    const dispatch = useDispatch()
    const [interests, setInterests] = useState<string[]>(profile.interests)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const formik = useFormik({
        initialValues: {
            username: profile.username,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            image: ''
        } as InitialValuesType,
        onSubmit: values => {
            debugger
            dispatch(updateProfile({
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                email: values.email,
                interests: interests,
            }, file64.split(',')[1]))
            console.log(file64)
        },
    });

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

    const savePasswordHandler = () => {
        dispatch(changeProfilePassword({
            new_password_hash: SHA256(newPassword).toString(),
            old_password_hash: SHA256(oldPassword).toString()
        }))
    }


    if (!isAuth) {
        history.push('/login')
    }

    if (status === 'loading') {
        return <Preloader/>
    }
    console.log(profile)
    return (
        <div className={s.settings}>
            <Container>
                <div className={s.inner}>
                    <div className={s.top}>
                        <h1>Настройки пользователя</h1>
                    </div>
                    <div className={s.content}>
                        <h2>Основные настройки</h2>
                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <div className={s.imgWrap}>
                                <h6>Аватар</h6>
                                <img src={file64 ? file64 : profile?.avatar?.url} alt="profile image"/>
                                <div className={s.changeImgInput}>
                                    <TextField
                                        type="file"
                                        name="image"
                                        onChange={upload}
                                        ref={inRef}
                                    />
                                </div>
                            </div>
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
                                                    value={topic}
                                                    checked={interests && interests.includes(topic)}
                                                    control={<Checkbox
                                                        onChange={(e) => {
                                                            if (e.currentTarget.checked) {
                                                                setInterests([...interests, topic])
                                                                console.log(interests)
                                                            } else {
                                                                setInterests(interests.filter(f => f !== topic))
                                                                console.log(interests)
                                                            }
                                                        }}/>}
                                                    label={topic}
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
                    <div className={s.passwordBlock}>
                        <h2>Смена пороля</h2>
                        <div className={s.inputWrap}>
                            <h6>Старый пороль</h6>
                            <TextField type={'password'} onChange={(e) => setOldPassword(e.currentTarget.value)}/>
                        </div>
                        <div className={s.inputWrap}>
                            <h6>Новый пороль</h6>
                            <TextField type={'password'} onChange={(e) => setNewPassword(e.currentTarget.value)}/>
                        </div>

                        <div className={s.btnWrap}>
                            <Button variant={'contained'} onClick={savePasswordHandler}>Изменить пороль</Button>
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    )
}