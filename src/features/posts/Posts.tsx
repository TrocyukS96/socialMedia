import React, { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootType } from "../../redux/redux-store";
import { useHistory } from "react-router-dom";
import { addPost, changeLikesStatus, getPosts } from "../../redux/PostsReducer";
import { AddPostParams, Post } from "../../api/types/post";
import { ProfilePost } from "../profile/post/ProfilePost";
import { Button } from "@mui/material";
import { PostModal } from "../../components/postModal/PostModal";
import { Preloader } from "../../components/preloader/Preloader";
import { RequestStatusType } from "../../redux/appReducer";

export const Posts = () => {
  const isAuth = useSelector<AppRootType, boolean>((state) => state.app.isAuth);
  const posts = useSelector<AppRootType, Post[]>(
    (state) => state.postsReducer.posts
  );
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector<AppRootType, RequestStatusType>(
    (state) => state.app.status
  );
  useEffect(() => {
    dispatch(getPosts({ limit: 10, offset: 0 }));
  }, []);

  const changeIsLikedStatus = (id: number, likedStatus: boolean) => {
    dispatch(changeLikesStatus(id, likedStatus));
  };

  if (!isAuth) {
    history.push("/login");
  }
  const handleClose = () => setOpen(false);
  const addPostHandler = (params: AddPostParams) => {
    dispatch(addPost(params));
  };

  if (status === "loading") {
    return <Preloader />;
  }
  return (
    <div className={s.postsBlock}>
      <div className={s.inner}>
        <h1>Все посты</h1>
        <div className={s.addPostWrap}>
          <Button onClick={() => setOpen(true)}>Добавить пост</Button>
        </div>
        <div className={s.postsWrap}>
          {posts.map((card, index) => {
            return (
              <ProfilePost
                key={index}
                firstName={card?.author?.first_name}
                lastName={card?.author?.last_name}
                image={card?.author?.avatar?.url}
                text={card?.text}
                postImage={card?.image?.url}
                topic={card?.topic}
                time={card?.publish_time}
                isLiked={card?.is_user_liked}
                likesCount={card?.likes_count}
                changeIsLikedStatus={changeIsLikedStatus}
                id={card?.id}
                commentsCount={card?.comments_count}
                comments={card?.comments}
                isPostsPage={true}
                userId={card?.author.id}
              />
            );
          })}
        </div>
      </div>

      <PostModal
        title={"Добавление нового поста"}
        handleClose={handleClose}
        isOpen={open}
        addPost={addPostHandler}
      />
    </div>
  );
};
