import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { testLogin } from "../../service/account.service";
import { setToken, setUserInfo } from "../../redux/action/user";
import { addBuGUID, addProjGUID } from "../../redux/action/project";
import styles from "./login.module.scss";
import { cookies } from "brownies";
import { setTitle } from '../../utils/title';

const Login = ({ setToken, setUserInfo }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    userName: "",
    passwd: ""
  });

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setCanSubmit(formData.userName && formData.passwd);
  }, [formData]);

  useEffect(()=>{
    setTitle("回款跟进");
  }, [])

  const changeFormdata = e => {
    let { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = () => {
    //清空cookie
    delete cookies.tokenInfo;
    setCanSubmit(false);
    Toast.loading(null, 0, null, true);
    testLogin({ name: formData.userName, password: formData.passwd })
      .then(res => {
        if (res && res.data && res.data.StatusCode === 200) {
          if (res && res.data && res.data.HttpContent) {
            const userInfo = res.data.HttpContent.UserInfo;
            if(res.data.HttpContent.TokenInfo){
              const token = res.data.HttpContent.TokenInfo.access_token;
              const username = res.data.HttpContent.TokenInfo.userName;
              setToken({
                username,
                token
              });
            }
            setUserInfo(userInfo);
          }

          Toast.hide();
          //need to redirect
          history.push("/home");
        } else {
          Toast.hide();
          Toast.info(res && res.data && res.data.HttpRequestMessage);
        }
      })
      .catch(e => {
        Toast.hide();
        Toast.info(e);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}></div>
      <section className={styles.content}>
        <div className={styles.inputItem}>
          <label>用户名</label>
          <input
            type="text"
            name="userName"
            onChange={e => changeFormdata(e)}
            placeholder={"请输入手机号码"}
          />
        </div>
        <div className={styles.inputItem}>
          <label>密码</label>
          <input
            type="password"
            name="passwd"
            onChange={e => changeFormdata(e)}
            placeholder={"请输入密码"}
          />
        </div>
        <Button className={styles.btn} disabled={!canSubmit} onClick={onSubmit}>
          登录
        </Button>
      </section>
      <footer className={styles.footer}>
        <span>融信集团 Powered by 明源云客</span>
      </footer>
    </div>
  );
};

export default connect(null, { setToken, setUserInfo })(Login);
