import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RequestStatusType } from "../../redux/appReducer";
import { AppRootType } from "../../redux/redux-store";
import { useHistory } from "react-router-dom";
import { Preloader } from "../../components/preloader/Preloader";
import s from "./styles.module.scss";

export const Channels = () => {
  const isAuth = useSelector<AppRootType, boolean>((state) => state.app.isAuth);
  const history = useHistory();
  if (!isAuth) {
    history.push("/login");
  }
  const status = useSelector<AppRootType, RequestStatusType>(
    (state) => state.app.status
  );
  if (status === "loading") {
    return <Preloader />;
  }

  return (
    <>
      <div className={s.chatBlock}>
        <div className={s.chatCardList}>Список всех чатов</div>
        <div className={s.chatMessageList}>Отображение чата после выбора из списка чатов</div>
      </div>
    </>
  );
};
