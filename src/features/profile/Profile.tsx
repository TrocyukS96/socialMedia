import React, {FC, useEffect, useState} from 'react';
import s from './styles.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getProfile, getProfileById, updateProfile} from "../../redux/ProfileReducer";
import {AppRootType} from "../../redux/redux-store";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {Card, Container, Divider, IconButton} from "@mui/material";
import {ProfileResponse, UpdateProfileParams} from "../../api/types/profile";
import profileIcon from './../../assets/images/profile/profileIcon.png';
import {Post} from "../../api/types/post";
import {ProfilePost} from './post/ProfilePost';
import {EditProfileModal} from "../../components/editProfileModal/EditProfileModal";
import EditIcon from "@mui/icons-material/Edit";
import {RequestStatusType} from "../../redux/appReducer";
import {Preloader} from "../../components/preloader/Preloader";

interface IPropsType {

}

export const Profile: FC<IPropsType> = () => {
    const dispatch = useDispatch()
    const profile = useSelector<AppRootType, ProfileResponse>(state => state.profilePage.profile);
    const posts = useSelector<AppRootType, Post[]>(state => state.profilePage.posts);
    const isAuth = useSelector<AppRootType, boolean>(state => state.app.isAuth)
    const history = useHistory()
    const {userId} = useParams<any>();
    const [open, setOpen] = useState(false)
    const status = useSelector<AppRootType, RequestStatusType>(state => state.app.status)
    const router=useRouteMatch()

    console.log(router.url)
    useEffect(() => {
        // if (!userId) {
        //     dispatch(getProfile())
        // }
        if (userId) {
            dispatch(getProfileById(userId))
        }
        if (router.url==='/profile') {
            dispatch(getProfile())
            console.log('dadada')
        }
    }, [router.url])

    if (!isAuth) {
        history.push('/login')
    }

    const renderInterests = () => {
        if (profile.interests) {
            return profile.interests.join(', ')
        }
    }
    const handleClose = () => setOpen(false)
    const editProfile = (params: UpdateProfileParams) => {
        dispatch(updateProfile(params))
    }

    if (status === 'loading') {
        return <Preloader/>
    }
    return (
        <main className={s.profile}>
            <Container>
                <Card className={s.inner}>
                    <div className={s.leftSide}>
                        <img src={profile?.avatar?.url ? profile.avatar.url : profileIcon} alt="userImage"/>
                    </div>
                    <div className={s.rightSide}>
                        <h1 className={s.title}>
                            <span>{profile.first_name} {profile.last_name}</span>
                            <IconButton onClick={() => setOpen(true)}><EditIcon/></IconButton>
                        </h1>
                        <div className={s.interests}><span>Мои интересы:</span> {renderInterests()}</div>
                    </div>
                </Card>
                <Divider/>
                <div className={s.posts}>
                    <h3 className={s.postsTitle}>Мои посты</h3>
                    <div className={s.postsWrap}>
                        {
                            posts.map((card, index) => {
                                return (
                                    <ProfilePost key={index}
                                                 firstName={card?.author?.first_name}
                                                 lastName={card?.author?.last_name}
                                                 image={card?.author?.avatar?.url}
                                                 text={card?.text}
                                                 postImage={card?.image?.url}
                                                 topic={card?.topic}
                                                 time={card?.publish_time}
                                                 isLiked={card?.is_user_liked}
                                                 likesCount={card?.likes_count}
                                                 changeIsLikedStatus={() => {
                                                 }}
                                                 id={card?.id}
                                                 userId={card?.author.id}
                                                 commentsCount={card?.comments_count}
                                                 comments={card?.comments}
                                    />
                                )
                            })
                        }


                    </div>
                </div>
            </Container>

            <EditProfileModal
                title={'Редактировать профиль'}
                handleClose={handleClose}
                isOpen={open}
                editProfile={editProfile}
                firstName={profile.first_name}
                lastName={profile.last_name}
                email={profile.email}
                userName={profile.username}
                profileInterests={profile.interests}

            />

        </main>
    );
}

export default Profile;

