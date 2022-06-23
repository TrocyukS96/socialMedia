import { Preloader } from "../../components/preloader/Preloader";
import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootType } from "../../redux/redux-store";
import { RequestStatusType } from "../../redux/appReducer";
import { useHistory } from "react-router-dom";
import s from "./styles.module.scss";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import { ProfileResponse } from "../../api/types/profile";
import { useFormik } from "formik";
import {
  changeProfilePassword,
  updateProfile,
} from "../../redux/ProfileReducer";
import SHA256 from "crypto-js/sha256";
import { topics } from "../../utils/topics";
import { ProfileSettingsCard } from "./profileSettingsCard/ProfileSettingsCard";
import { InfoSettingsCard } from "./infroSettingsCard/InfoSettingsCard";
import { InterestsSettingCard } from "./interestsSettingCard/InterestsSettingCard";
import { PasswordSettingCard } from "./passwordSettingCard/PasswordSettingCard";

interface InitialValuesType {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  // interests: string[],
}

export const Settings = () => {
  const status = useSelector<AppRootType, RequestStatusType>(
    (state) => state.app.status
  );
  const isAuth = useSelector<AppRootType, boolean>((state) => state.app.isAuth);
  const history = useHistory();
  const profile = useSelector<AppRootType, ProfileResponse>(
    (state) => state.profilePage.profile
  );

  if (!isAuth) {
    history.push("/login");
  }

  if (status === "loading") {
    return <Preloader />;
  }
  console.log(profile);
  return (
    <div className={s.settings}>
      <Container>
        <div className={s.inner}>
          <div className={s.top}>
            <h1>Настройки пользователя</h1>
          </div>
          <div className={s.content}>
            <ProfileSettingsCard
              image={profile?.avatar?.url}
              firstName={profile?.first_name}
              lastName={profile?.last_name}
              username={profile?.username}
            />
            <InfoSettingsCard
              firstName={profile?.first_name}
              lastName={profile?.last_name}
            />
            <InterestsSettingCard profileInterests={profile?.interests} />
            <PasswordSettingCard />
          </div>
        </div>
      </Container>
    </div>
  );
};
