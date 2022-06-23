import React, { FC, useState } from "react";
import { Button, Paper } from "@mui/material";
import s from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { ChangePhotoModal } from "../../../components/changePhotoModal/ChangePhotoModal";
import { updateProfileImage } from "../../../redux/ProfileReducer";

interface IProps {
  image: string;
  firstName: string;
  lastName: string;
  username: string;
}
export const ProfileSettingsCard: FC<IProps> = ({
  image,
  username,
  lastName,
  firstName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setIsOpen(false);
  const changeImage = (value: string) => {
    dispatch(updateProfileImage({ avatar: value }));
  };

  return (
    <Paper className={s.profileCard}>
      <div className={s.inner}>
        <div className={s.imgBlock}>
          <h5>Профиль</h5>
          <img src={image} alt="" />
        </div>
        <div className={s.textBlock}>
          <h5>{firstName + " " + lastName}</h5>
          <span>@{username}</span>
          <Button
            className={s.applyButton}
            variant={"contained"}
            onClick={() => setIsOpen(true)}
          >
            Изменить фотографию
          </Button>
        </div>
      </div>

      <ChangePhotoModal
        image={image}
        handleClose={handleClose}
        isOpen={isOpen}
        changeImage={changeImage}
      />
    </Paper>
  );
};
