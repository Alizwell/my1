import React from "react";
import { SearchBar, Tabs, List } from "antd-mobile";
import { PayTraceList } from "../../components/PayTraceList";
import { PayTraceListItem } from "../../components/PayTraceListItem";
import {
  unSignedPayTrace,
  notMortgagePayTrace,
  mortgagePayTrace
} from "../../service/payTrace.service";

import {
  unSignedPayTraceFormat,
  notMortgagePayTraceFormat,
  mortgagePayTraceFormat
} from "../../adaptor/payTrace.adaptor";

// import { HandlingMortgage } from "../../components/HandlingMortgage";

import styles from "./PayTrace.module.scss";

const tabs = [{ title: "未签约" }, { title: "非按揭" }, { title: "按揭" }];

class PayTrace extends React.Component {
  state = {
    dataTab0: [],
    dataTab1: [],
    dataTab2: []
  };

  componentDidMount() {
    this.loadTab0();
  }

  tabChange = (tab, index) => {
    switch (index) {
      case 0: {
        return this.loadTab0();
      }
      case 1: {
        return this.loadTab1();
      }
      case 2: {
        return this.loadTab3();
      }
      default:
        return "";
    }
  };

  loadTab0 = () => {
    unSignedPayTrace({}).then(data => {
      console.log("data: ", data);
      if (data.data.StatusCode === 200) {
        this.setState({
          dataTab0: data.data.HttpContent
        });
      }
    });
  };

  loadTab1 = () => {
    notMortgagePayTrace({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          dataTab1: data.data.HttpContent.map(unSignedPayTraceFormat)
        });
      }
    });
  };

  loadTab3 = () => {
    mortgagePayTrace({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          dataTab2: data.data.HttpContent.map(unSignedPayTraceFormat)
        });
      }
    });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <SearchBar
          placeholder="请输入客户姓名、电话(后四位或全号)或置业顾问姓名"
          ref={ref => (this.autoFocusInst = ref)}
        />
        <Tabs
          tabs={tabs}
          initialPage={0}
          animated={false}
          useOnPan={false}
          onChange={this.tabChange}
        >
          <div className={styles.listWrapper}>
            <List className={styles.list}>
              <PayTraceList data={this.state.dataTab0} />
            </List>
          </div>
          <div className={styles.listWrapper}>
            <List className={styles.list}>
              {this.state.dataTab1.map(item => {
                const props = {
                  ...item,
                  unpaidMoney: item.money
                };
                return <PayTraceListItem {...props} />;
              })}
            </List>
          </div>
          <div className={styles.listWrapper}>
            <List className={styles.list}>
              {this.state.dataTab2.map(item => {
                const props = {
                  ...item,
                  unpaidMoney: item.money
                };
                return <PayTraceListItem {...props} />;
              })}
            </List>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default PayTrace;
