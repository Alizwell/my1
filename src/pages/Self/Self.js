import React from "react";
import { connect } from "react-redux";
import { Accordion, List, Checkbox, ActivityIndicator, WhiteSpace, Modal } from "antd-mobile";
import { getProject } from "../../service/project.service";
import { projectInfoFormat } from "../../adaptor/projectInfo.adaptor";
import {
  setBuGUID,
  setProjGUID
} from "../../redux/action/project";
import { Helmet } from "react-helmet";
import styles from "./Self.module.scss";
import { ReactComponent as Logout } from '../../assets/imgs/icon-logout.svg';
import { logoutCookie, setProjectInfo } from '../../utils/cookie'; 
import { withRouter } from 'react-router';
import { getBuGUIDFromCookie, getProjGUIDFromCookie } from "../../redux/selectors/project.selector";
import { useHistory } from "react-router-dom";

const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

const LeafItem = (
  { formatData, actions, projectInfo }
) => {
  let { projName, buguid, projGUID } = formatData;
  let { setBuGUID, setProjGUID } = actions;
  let { selectedProject } = projectInfo;
  let history = useHistory();

  function onCheckboxChange(e, buguid, projGUID) {
    const { checked } = e.target;
    if (checked) {
      setBuGUID(buguid);
      setProjGUID(projGUID);
      setProjectInfo({buGUID: buguid, projGUID});
      history.push(
        { 
          pathname:'/home/service',
        }
      );
    }
  }

  return (
    <CheckboxItem
      key={projGUID}
      onChange={e => onCheckboxChange(e, buguid, projGUID)}
      checked={projGUID === selectedProject}
    >
      {projName}
    </CheckboxItem>
  );
};

const ProjectTree = (renderData, actions, projectInfo) => {
  const formatData = projectInfoFormat(renderData);
  const subItem =
    formatData.children.length > 0 ? (
      <Accordion key={formatData.projGUID}>
        <Accordion.Panel header={formatData.projName}>
          {formatData.children.map((item, index) => {
            return (
              <div className={styles.headerSpace} key={index}>
                {ProjectTree(item, actions, projectInfo)}
              </div>
            );
          })}
        </Accordion.Panel>
      </Accordion>
    ) : (
      <LeafItem  
        formatData={formatData}
        actions={actions}
        projectInfo={projectInfo}
      />
      // LeafItem(formatData, actions, projectInfo)
    );
  return subItem;
};

class Self extends React.Component {
  constructor(props){
    super(props);
    this.checkedRef = React.createRef();
  }
  state = {
    isLoading: true,
    renderData: null
  };
  componentDidMount() {
    const bUGUID = getBuGUIDFromCookie();
    const projGUID = getProjGUIDFromCookie();
    getProject({bUGUID: bUGUID.length > 0 ? bUGUID.join(",") : '*' , projGUID: projGUID.length > 0 ? projGUID.join(',') : '*'}).then(data => {
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
    const { setBuGUID, setProjGUID } = this.props;
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
                ProjectTree({...this.state.renderData}, {
                  setBuGUID,
                  setProjGUID
                }, {selectedProject: this.props.selectedProject}) 
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

const mapStateToProps = (state)=>({
  selectedProject: state.project.projGUID[0]
})


Self.defaultProps = {
  selectedProject: []
}


export default connect(mapStateToProps, {
  setBuGUID,
  setProjGUID
})(withRouter(Self));
