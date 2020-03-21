import React from "react";
import { connect } from "react-redux";
import { Accordion, List, Checkbox, ActivityIndicator, WhiteSpace, Modal } from "antd-mobile";
import { getProject } from "../../service/project.service";
import { projectInfoFormat } from "../../adaptor/projectInfo.adaptor";
import {
  addBuGUID,
  addProjGUID,
  delBuGUID,
  delProjGUID
} from "../../redux/action/project";
import { Helmet } from "react-helmet";
import styles from "./Self.module.scss";
import { ReactComponent as Logout } from '../../assets/imgs/icon-logout.svg';
import { logoutCookie } from '../../utils/cookie'; 
import { withRouter } from 'react-router';
import { getProjectInfo } from "../../redux/selectors/project.selector";

const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

const leafItem = (
  { projName, buguid, projGUID },
  { addBuGUID, addProjGUID, delBuGUID, delProjGUID }
) => {
  function onCheckboxChange(e, buguid, projGUID) {
    const { checked } = e.target;
    if (checked) {
      addBuGUID(buguid);
      addProjGUID(projGUID);
    } else {
      delBuGUID(buguid);
      delProjGUID(projGUID);
    }
  }
  return (
    <CheckboxItem
      key={projGUID}
      onChange={e => onCheckboxChange(e, buguid, projGUID)}
    >
      {projName}
    </CheckboxItem>
  );
};

const projectTree = (renderData, actions) => {
  const formatData = projectInfoFormat(renderData);
  const subItem =
    formatData.children.length > 0 ? (
      <Accordion key={formatData.projGUID}>
        <Accordion.Panel header={formatData.projName}>
          {formatData.children.map((item, index) => {
            return (
              <div className={styles.headerSpace} key={index}>
                {projectTree(item, actions)}
              </div>
            );
          })}
        </Accordion.Panel>
      </Accordion>
    ) : (
      leafItem(formatData, actions)
    );
  return subItem;
};

class Self extends React.Component {
  state = {
    isLoading: true,
    renderData: null
  };
  componentDidMount() {
    const { buGUID: bUGUID } = getProjectInfo();
    getProject({bUGUID: bUGUID.join(","), projGUID: null}).then(data => {
      this.setState({
        isLoading: false,
        renderData: data.data.HttpContent.length > 0 ? data.data.HttpContent[0] : null
      });
    });
  }

  onLogout = () =>{
    alert('退出', '是否需要退出?', [
      { text: '取消' },
      { text: '确定', onPress: () => {
        logoutCookie();
        this.props.history.replace('/login');
      } },
    ])
  }

  render() {
    const { addBuGUID, addProjGUID, delBuGUID, delProjGUID } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <Helmet>
          <title>我的</title>
        </Helmet>
        { !this.state.isLoading ? (
          <>
            <List renderHeader={() => "请选择项目"}>
              {
                this.state.renderData ? 
                projectTree(this.state.renderData, {
                  addBuGUID,
                  addProjGUID,
                  delBuGUID,
                  delProjGUID
                }) 
                : <List.Item>无</List.Item>
              }
            </List>
            <WhiteSpace />
            <List.Item className={styles.logout} thumb={<Logout />} onClick={()=>this.onLogout()}>
              退出
            </List.Item>
          </>
        ) : (
          <ActivityIndicator
            className="loading"
            size="large"
            animating={true}
          />
        )}
      </div>
    );
  }
}
export default connect(null, {
  addBuGUID,
  addProjGUID,
  delBuGUID,
  delProjGUID
})(withRouter(Self));
