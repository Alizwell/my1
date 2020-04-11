import React from "react";
import { connect } from "react-redux";
import { Accordion, List, Checkbox, ActivityIndicator, WhiteSpace, Modal } from "antd-mobile";
import { getProject, getProject2 } from "../../service/project.service";
import { projectInfoFormat } from "../../adaptor/projectInfo.adaptor";
import {
  setBuGUID,
  setProjGUID
} from "../../redux/action/project";
import { Helmet } from "react-helmet";
import styles from "./Self.module.scss";
import cx from 'classnames';
import { ReactComponent as Logout } from '../../assets/imgs/icon-logout.svg';
import { logoutCookie, setProjectInfo } from '../../utils/cookie'; 
import { withRouter } from 'react-router';
import { getBuGUIDFromCookie, getProjGUIDFromCookie, getUserCodeFromCookie } from "../../redux/selectors/project.selector";
import { useHistory } from "react-router-dom";

const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

const LeafItem = (
  { formatData, actions, projectInfo, className }
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
      className={className}
      onChange={e => onCheckboxChange(e, buguid, projGUID)}
      checked={projGUID === selectedProject}
    >
      {projName}
    </CheckboxItem>
  );
};

const ProjectTree = (renderData, actions, projectInfo, index, level) => {
  const formatData = projectInfoFormat(renderData);
  const subItem =
    formatData.children && formatData.children.length > 0 ? (
      <Accordion key={formatData.projGUID} className={cx(styles.accordionItem, {[styles.bgDark]: index % 2 === 0 })}>
        <Accordion.Panel header={formatData.projName} className={styles.accordionHeader}>
          {formatData.children.map((item, index) => {
            return (
              <div key={index} className={cx('item', ('padding'+ level))}>
                <div className={cx(styles.treeItem, 'treeItem')}>
                  {ProjectTree(item, actions, projectInfo, index, level + 1)}
                </div>
              </div>
            );
          })}
        </Accordion.Panel>
      </Accordion>
    ) : (
      <div className={cx(styles.leafItemWrapper, 'leafItemWrapper')}>
        <span className={cx(styles.space,`leafPadding${level}`)}></span>
        <LeafItem
          formatData={formatData}
          actions={actions}
          projectInfo={projectInfo}
          className={cx(styles.leafItem, {[styles.bgDark]: index % 2 === 0 })}
        />
      </div>
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
    // getProject({bUGUID: bUGUID.length > 0 ? bUGUID.join(",") : '*' , projGUID: projGUID.length > 0 ? projGUID.join(',') : '*'}).then(data => {
    //   this.setState({
    //     isLoading: false,
    //     renderData: data.data.HttpContent.length > 0 ? data.data.HttpContent : null
    //   });
    // });
    const userCode = getUserCodeFromCookie()
    getProject2( { userCode: userCode } ).then( data => {
      this.setState( {
        isLoading: false,
        renderData: data.data.HttpContent.length > 0 ? data.data.HttpContent : null
      } );
    } );
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
    const dataTree = this.state.renderData;
    return (
      <div className={styles.selfContent}>
        <Helmet>
          <title>我的</title>
        </Helmet>
        { !this.state.isLoading ? (
          <>
            <List renderHeader={() => "请选择项目"}>
              {
                dataTree
                  ? dataTree.map((item, index) =>{
                    return ProjectTree( { ...item }, {
                      setBuGUID,
                      setProjGUID
                    }, { selectedProject: this.props.selectedProject }, index, 0 ) 
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
