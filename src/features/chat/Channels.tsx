import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../../redux/appReducer";
import {ChannelMessage, ChannelsResponse} from "../../api/types/channels";
import {AppRootType} from "../../redux/redux-store";
import {useHistory} from "react-router-dom";
import {Preloader} from "../../components/preloader/Preloader";
import {Button, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import s from "./styles.module.scss";
import {getChannels, getMessagesById} from "../../redux/ChatReducer";
import {ChannelMessages} from "./channelMessages/ChannelMessages";
import {ChannelParams} from "../../api/types/post";

const messages=[
  {name:'Ivan',text:'loremaadadadadad'},
  {name:'Stepan',text:'lvk12222222'},
  {name:'John',text:'12345'},
]

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
  const channels = useSelector<AppRootType, ChannelsResponse[]>(
    (state) => state.chat.channels
  );
  const currentMessages = useSelector<AppRootType, ChannelMessage[]>(
      (state) => state.chat.messages
  );
  const [localId,setLocalId]=useState<number | null>(null)





  useEffect(() => {
    dispatch(getChannels());
    console.log(channels)

  }, []);

  const handleClose = () => setOpen(false);
  const createChannelHandler = () => {
    console.log("create channel");
  };

  if (status === "loading") {
    return <Preloader />;
  }

  const getMessagesHandler =(id:number)=>{
    dispatch(getMessagesById(id,{ limit: 10, offset: 0 }))
  }


  return (
    <div className={s.channelsBlock}>
      <Button onClick={() => setOpen(true)}>Создать чат</Button>
      <div className={s.chatBlock}>
        <Paper variant="outlined">
          <div className={s.chatCardList}>
            {channels.map((chanel,index)=>{
              return(
                  <div className={s.channel} onClick={()=> {
                    getMessagesHandler(chanel.id)
                    setLocalId(chanel.id)
                  }}>
                    <img src={chanel.image.url} alt="channel image"/>
                    <div className={s.channelName}>{chanel.name}</div>
                  </div>

              )
            })}
          </div>
        </Paper>
      <ChannelMessages messages={currentMessages} channelId={localId}/>
      </div>
    </div>
  );
};
