import React, { FC, useState } from "react";
import { Button, Checkbox, FormControlLabel, Paper } from "@mui/material";
import s from "./styles.module.scss";
import { topics } from "../../../utils/topics";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/ProfileReducer";

interface IProps {
  profileInterests: string[];
}

export const InterestsSettingCard: FC<IProps> = ({ profileInterests }) => {
  const [interests, setInterests] = useState<string[]>(profileInterests);
  const dispatch = useDispatch();

  const saveDataHandler = () => {
    dispatch(updateProfile({ interests: interests }));
  };
  return (
    <Paper className={s.interestsCard}>
      <div className={s.inner}>
        <h5 className={s.title}>Выбор интересов</h5>
        <div className={s.checkboxes}>
          {topics.map((topic, index) => {
            return (
              <FormControlLabel
                value={topic}
                checked={interests && interests.includes(topic.value)}
                control={
                  <Checkbox
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setInterests([...interests, topic.value]);
                        console.log(interests);
                      } else {
                        setInterests(
                          interests.filter((f) => f !== topic.value)
                        );
                        console.log(interests);
                      }
                    }}
                  />
                }
                label={
                  <div
                    style={
                      interests.includes(topic.value)
                        ? { backgroundColor: "#E96344" }
                        : { backgroundColor: "#F0927C" }
                    }
                    className={s.inputLabel}
                  >
                    {topic.label}
                  </div>
                }
                labelPlacement="end"
              />
            );
          })}
        </div>
        <Button disabled={profileInterests==interests} variant={"contained"} className={s.applyButton} onClick={saveDataHandler}>
          Сохранить интересы
        </Button>
      </div>
    </Paper>
  );
};
