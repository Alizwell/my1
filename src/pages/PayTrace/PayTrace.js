import React from "react";
import { SearchBar, Tabs, List, ActivityIndicator } from "antd-mobile";
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

import { setTitle } from '../../utils/title';

import styles from "./PayTrace.module.scss";

const tabs = [{ title: "未签约" }, { title: "非按揭" }, { title: "按揭" }];

class PayTrace extends React.Component {
  state = {
    dataTab0: [],
    dataTab1: [],
    dataTab2: [],
    showLoading: true
  };

  componentDidMount() {
    setTitle("回款跟进");
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
        return this.loadTab2();
      }
      default:
        return "";
    }
  };

  loadTab0 = async () => {
    this.setState({
      showLoading: true
    })
    await unSignedPayTrace({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          dataTab0: data.data.HttpContent
        });
      }
    });
    this.setState({
      showLoading: false
    })
  };

  loadTab1 = async () => {
    this.setState({
      showLoading: true
    })
    await notMortgagePayTrace({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          dataTab1: data.data.HttpContent[0].List.map(notMortgagePayTraceFormat)
        });
      }
    });
    this.setState({
      showLoading: false
    })
  };

  loadTab2 = async () => {
    this.setState({
      showLoading: true
    })
    await mortgagePayTrace({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          dataTab2: data.data.HttpContent[0].List.map(mortgagePayTraceFormat)
        });
      }
    });
    this.setState({
      showLoading: false
    })
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
          { this.state.showLoading 
            ? <ActivityIndicator className="loading" size="large" animating={this.state.showLoading} />
            : <List className={styles.list}>
                {this.state.dataTab1.map((item, index)=> {
                  const props = {
                    ...item,
                    endDate: item.lastDate,
                    unpaidMoney: item.money
                  };
                  return <PayTraceListItem key={index} {...props} />;
                })}
              </List>
            }
          </div>
          <div className={styles.listWrapper}>
          { this.state.showLoading 
            ? <ActivityIndicator className="loading" size="large" animating={this.state.showLoading} />
            : <List className={styles.list}>
                {this.state.dataTab2.map((item, index) => {
                  const props = {
                    ...item,
                    endDate: item.lastDate,
                    unpaidMoney: item.money
                  };
                  return <PayTraceListItem key={index} {...props} />;
                })}
              </List>
            }
          </div>
        </Tabs>
      </div>
    );
  }
}

export default PayTrace;
