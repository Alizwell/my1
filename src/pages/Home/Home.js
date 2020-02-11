import React from "react";
import { TabBar } from "antd-mobile";
import PayTrace from "../PayTrace";
import Self from "../Self";
import Service from "../Service";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import CommonFound from "../CommonFound";
import Mortgage from "../Mortgage";
import Contract from "../Contract";

import "./home.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "tab0",
      hidden: false,
      fullScreen: true
    };
  }

  componentDidMount() {
    this.props.history.replace("/home/service");
  }

  render() {
    return (
      <div
        style={
          this.state.fullScreen
            ? { position: "fixed", height: "100%", width: "100%", top: 0 }
            : { height: 400 }
        }
      >
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            title="售后服务"
            key="Service"
            badge={"new"}
            selected={this.state.selectedTab === "tab0"}
            onPress={() => {
              this.props.history.replace("/home/service");
              this.setState({
                selectedTab: "tab0"
              });
            }}
            data-seed="logId1"
          >
            <Switch>
              <Route exact path="/home/service" children={<Service />} />
              <Route path="/home/service/mortgage" children={<Mortgage />} />
              <Route
                path="/home/service/commonFound"
                children={<CommonFound />}
              />
              <Route path="/home/service/contract" children={<Contract />} />
            </Switch>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background:
                    "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
                }}
              />
            }
            title="回款跟进"
            key="PayTrace"
            dot
            selected={this.state.selectedTab === "tab1"}
            onPress={() => {
              this.props.history.replace("/home/payTrace");
              this.setState({
                selectedTab: "tab1"
              });
            }}
          >
            <Switch>
              <Route exact path="/home/payTrace" children={<PayTrace />} />
            </Switch>
          </TabBar.Item>
          <TabBar.Item
            icon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"
            }}
            selectedIcon={{
              uri:
                "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"
            }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === "tab2"}
            onPress={() => {
              this.props.history.replace("/home/self");
              this.setState({
                selectedTab: "tab2"
              });
            }}
          >
            <Switch>
              <Route exact path="/home/self" children={<Self />} />
            </Switch>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(Home);
