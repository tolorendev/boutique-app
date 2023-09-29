import {
  FaceSmileIcon,
  MessageMessengerIcon,
  PayperclipIcon,
  TelegramIcon,
} from "./Icons";
import classes from "./LiveChat.module.css";
import avatarImg from "../../images/avatar-img.png";
import React, { useEffect, useRef, useState } from "react";

function LiveChat(props) {
  const [userMessages, setUserMessages] = useState([]);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const messageInputRef = useRef();
  const windowChatRef = useRef();

  useEffect(() => {
    if (windowChatRef.current) {
      windowChatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [userMessages]);
  const addMessageHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    } else {
      return;
    }
    const enteredMessage = messageInputRef.current.value.trim();
    if (!enteredMessage) {
      return;
    }

    setUserMessages((prevMessages) => [...prevMessages, enteredMessage]);
    messageInputRef.current.value = "";
  };

  const toggleLiveChat = () => {
    setShowChatPopup((prevState) => !prevState);
  };
  return (
    <React.Fragment>
      {/* =======================
           Live chat Popup 
         =======================*/}
      {showChatPopup && (
        <div className={classes.liveChat}>
          <div className="card  ">
            <div className="card-header bg-white ">
              <div className="d-flex justify-content-between align-items-center py-2 ">
                <div className="fw-semibold fs-5">Customer support</div>
                <button className="btn btn-light  ">Let's chat app</button>
              </div>
            </div>
            <div className="card-body ">
              <div className={classes.chatWindow}>
                <div className="card-text pe-5" ref={windowChatRef}>
                  {/* ==========================
                     Starter Messages
                  ========================== */}

                  <div className={classes.adminChat}>
                    <div className="d-flex">
                      <div>
                        <img src={avatarImg} alt="avatar" />
                      </div>
                      <p>ADMIN: Chào bạn, chúc một ngày vui vẻ</p>
                    </div>
                  </div>
                  <div className={classes.adminChat}>
                    <div className="d-flex">
                      <div>
                        <img src={avatarImg} alt="avatar" />
                      </div>
                      <p>ADMIN: Chúng tôi có thể giúp gì cho bạn?</p>
                    </div>
                  </div>
                  {/* ==========================
                  Added messages
                  ========================== */}
                  {userMessages.map((msg, index) => (
                    <div className={classes.userChat} key={msg + index}>
                      <div className="d-flex justify-content-end">
                        <p>{msg}</p>
                      </div>
                    </div>
                  ))}
                  {/* ====================== */}
                </div>
              </div>
            </div>
            <div className="card-footer ">
              <div className="row align-items-center">
                <div className="col-8">
                  <div className="d-flex  align-items-center">
                    <div>
                      <img src={avatarImg} alt="avatar" />
                    </div>

                    <form action="">
                      <textarea
                        className="form-control"
                        cols="30"
                        rows="1"
                        placeholder="Enter Message!"
                        ref={messageInputRef}
                        onKeyDown={addMessageHandler}
                      ></textarea>
                    </form>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-flex">
                    <PayperclipIcon />
                    <FaceSmileIcon />
                    <TelegramIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* =======================
         Popup Toggler 
         =======================*/}
      <div onClick={toggleLiveChat} className={classes.chatIcon}>
        <MessageMessengerIcon />
      </div>
    </React.Fragment>
  );
}

export default LiveChat;
