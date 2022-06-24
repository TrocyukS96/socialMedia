import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RequestStatusType } from "../../redux/appReducer";
import { AppRootType } from "../../redux/redux-store";
import { useHistory } from "react-router-dom";
import { Preloader } from "../../components/preloader/Preloader";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import s from "./styles.module.scss";
import { getChannels } from "../../redux/ChatReducer";

export const Channels = () => {
  const isAuth = useSelector<AppRootType, boolean>((state) => state.app.isAuth);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  if (!isAuth) {
    history.push("/login");
  }
  const status = useSelector<AppRootType, RequestStatusType>(
    (state) => state.app.status
  );

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  const handleClose = () => setOpen(false);
  const createChannelHandler = () => {
    console.log('create channel')
  }

  if (status === "loading") {
    return <Preloader />;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Создать чат</Button>
      <div className={s.chatBlock}>
        <Paper variant="outlined">
          <div className={s.chatCardList}>Список всех чатов</div>
        </Paper>
        <Paper variant="outlined">
          <div className={s.chatMessageList}>
            Отображение чата после выбора из списка чатов
          </div>
        </Paper>
      </div>
    </>
  );
};
