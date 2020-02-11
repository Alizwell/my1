import React from "react";
import { connect } from "react-redux";
import { Accordion, List, Checkbox, ActivityIndicator } from "antd-mobile";
import { getProject } from "../../service/project.service";
import { projectInfoFormat } from "../../adaptor/projectInfo.adaptor";
import {
  addBuGUID,
  addProjGUID,
  delBuGUID,
  delProjGUID
} from "../../redux/action/project";
import { Helmet } from "react-helmet";
import { setTitle } from "../../utils/title";
import styles from "./Self.module.scss";

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
    renderData: {
      children: []
    }
  };
  componentDidMount() {
    getProject({}).then(data => {
      this.setState({
        renderData: data.data.HttpContent[0]
      });
    });
  }

  render() {
    const { addBuGUID, addProjGUID, delBuGUID, delProjGUID } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <Helmet>
          <title>我的</title>
        </Helmet>
        {this.state.renderData.ProjGUID ? (
          <List renderHeader={() => "请选择项目"}>
            {projectTree(this.state.renderData, {
              addBuGUID,
              addProjGUID,
              delBuGUID,
              delProjGUID
            })}
          </List>
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
})(Self);
