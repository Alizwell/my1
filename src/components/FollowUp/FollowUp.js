import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal } from "antd-mobile";
import styles from "./Follow.module.scss";

const prompt = Modal.prompt;

const FollowUp = () => {
  const appRoot = document.getElementById("root");

  const showToast = title => {
    prompt(
      title,
      null,
      [
        { text: "取消" },
        { text: "提交", onPress: val => console.log(`${val}`) }
      ],
      "secure-text"
    );
  };
  const content = (
    <div className={styles.fllowUp}>
      <Button
        type="primary"
        inline
        style={{ width: "50%" }}
        onClick={() => showToast("跟进银行")}
      >
        跟进银行
      </Button>
      <Button
        type="primary"
        inline
        style={{ width: "50%" }}
        onClick={() => showToast("跟进进程")}
      >
        跟进进程
      </Button>
    </div>
  );
  return ReactDOM.createPortal(content, appRoot);
};

export default FollowUp;
