import { FC, useState } from "react";
import s from "./styles.module.scss";
import { IconButton, Paper } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Comment } from "../../../components/comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostComment,
  getPostsComments,
  removePost,
  updatePost,
} from "../../../redux/PostsReducer";
import { AddPostParams, CommentType } from "../../../api/types/post";
import { AddComment } from "../../../components/addComment/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import { toCorrectTime } from "../../../utils/toCorrectTime";
import { PostModal } from "../../../components/postModal/PostModal";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import { NavLink } from "react-router-dom";
import { AppRootType } from "../../../redux/redux-store";
import { getProfilePostComments } from "../../../redux/ProfileReducer";
import Avatar from "./../../../assets/Avatar.svg";

interface IProps {
  firstName: string;
  lastName: string;
  image: string;
  text: string;
  postImage: string;
  topic: string;
  time: string;
  isLiked: boolean;
  likesCount: number;
  changeIsLikedStatus: (id: number, likedStatus: boolean) => void;
  id: number;
  commentsCount: number;
  comments?: CommentType[];
  isPostsPage?: boolean;
  userId: number;
}

export const ProfilePost: FC<IProps> = ({
  firstName,
  lastName,
  image,
  text,
  postImage,
  topic,
  time,
  isLiked,
  likesCount,
  changeIsLikedStatus,
  id,
  commentsCount,
  comments,
  isPostsPage,
  userId,
}) => {
  const [likedStatus, setLikedStatus] = useState(isLiked);
  const [openComments, setOpenComments] = useState(false);
  const [open, setOpen] = useState(false);
  const currentUserId = useSelector<AppRootType, number | null>(
    (state) => state.profilePage.userId
  );
  const dispatch = useDispatch();

  const changeStatusHandler = () => {
    setLikedStatus(!likedStatus);
    changeIsLikedStatus(id, !likedStatus);
  };
  const getCommentsHandler = () => {
    setOpenComments(!openComments);
    if (isPostsPage) {
      dispatch(getPostsComments(id, { limit: 100, offset: 0 }));
    }
    if (!isPostsPage) {
      dispatch(getProfilePostComments(id, { limit: 100, offset: 0 }));
    }
  };
  const addComment = (text: string) => {
    debugger;
    dispatch(addPostComment(id, text));
  };
  const remoPostHandler = () => {
    dispatch(removePost(id));
  };
  const handleClose = () => setOpen(false);

  const editPostHandler = (params: AddPostParams) => {
    dispatch(updatePost(id, params));
  };
  return (
    <Paper className={s.post}>
      <div className={s.inner}>
        <div className={s.top}>
          {isPostsPage ? (
            <NavLink to={`profile/${userId}`}>
              <img src={image ? image : Avatar} alt="userImage"/>{" "}
            </NavLink>
          ) : (
            <img src={image ? image : Avatar} alt="userImage"/>
          )}
          <div className={s.topText}>
            <h4 className={s.title}>
              {isPostsPage ? (
                <NavLink to={`profile/${userId}`}>
                  <span>
                    {firstName} {lastName}
                  </span>{" "}
                </NavLink>
              ) : (
                <span>
                  {firstName} {lastName}
                </span>
              )}
              {isPostsPage && userId === currentUserId && (
                <IconButton onClick={() => setOpen(true)}>
                  <EditIcon />
                </IconButton>
              )}
              {isPostsPage && userId === currentUserId && (
                <IconButton
                  size="large"
                  onClick={remoPostHandler}
                  className={s.removeBtn}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </h4>
            <div className={s.time}>{toCorrectTime(time, true)}</div>
            <span className={s.topic}>{topic}</span>
          </div>
        </div>
        <div className={s.content}>
          <p className={s.text}>{text}</p>
          {postImage && (
            <div className={s.postImageWrap}>
              <img className={s.postImage} src={postImage} alt="postImage" />
            </div>
          )}
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.favouriteBlock}>
          <IconButton onClick={changeStatusHandler} className={s.favouriteBtn}>
            {likedStatus ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          {likesCount > 0 ? <div>{likesCount}</div> : ""}
        </div>
        <div className={s.commentsView}>
          <CommentIcon
            className={s.commentBlock}
            onClick={getCommentsHandler}
          />
          <span>{commentsCount > 0 ? <div>{commentsCount}</div> : ""}</span>
        </div>
      </div>
      {openComments ? (
        <div>
          {comments && comments.length > 0
            ? comments.map((c, index) => {
                return (
                  <Comment
                    firstName={c?.author?.first_name}
                    lastName={c?.author?.last_name}
                    image={c?.author?.avatar?.url}
                    time={c?.send_time}
                    text={c?.text}
                  />
                );
              })
            : ""}
          <AddComment addComment={addComment} />
        </div>
      ) : (
        ""
      )}

      <PostModal
        title={"Редактировать пост"}
        handleClose={handleClose}
        isOpen={open}
        editPost={editPostHandler}
        postText={text}
        postTopic={topic}
      />
    </Paper>
  );
};
