import React from "react";
import { SearchBar, Tabs, List } from "antd-mobile";
import MortgageListItem from "../../components/MortgageListItem";
import {
  unHandleMortgageLoan,
  handlingMortgageLoan,
  handledMortgageLoan
} from "../../service/mortgageLoan";
import {
  unhandledMortgageFormat,
  handlingMortgageFormat,
  handledMortgageFormat
} from "../../adaptor/mortgage.adaptor";
import { AccordionList } from "../../components/AccordionList";
import styles from "./Mortgage.module.scss";

const tabs = [{ title: "未办理" }, { title: "受理中" }, { title: "已放款" }];

class Mortgage extends React.Component {
  state = {
    notHandled: [],
    handling: [],
    handled: []
  };

  componentDidMount() {
    unHandleMortgageLoan({}).then(data => {
      console.log("data: ", data);
      if (data.data.StatusCode === 200) {
        this.setState({
          notHandled: data.data.HttpContent.map(unhandledMortgageFormat)
        });
      }
    });
  }

  tabChange = (tab, index) => {
    console.log(`index: ${index}`);
    switch (index) {
      case 0: {
        return this.loadUnhandled();
      }
      case 1: {
        return this.loadHandling();
      }
      case 2: {
        return this.loadHandled();
      }
      default:
        return "";
    }
  };

  loadUnhandled = () => {
    unHandleMortgageLoan({}).then(data => {
      console.log("data: ", data);
      if (data.data.StatusCode === 200) {
        this.setState({
          notHandled: data.data.HttpContent.map(handledMortgageFormat)
        });
      }
    });
  };

  loadHandling = () => {
    handlingMortgageLoan({}).then(data => {
      if (data.data.StatusCode === 200) {
        this.setState({
          handling: data.data.HttpContent
        });
      }
    });
  };

  loadHandled = () => {
    return;
    handledMortgageLoan({}).then(data => {
      console.log("loadHandled data: ", data);
      if (data.data.StatusCode === 200) {
        this.setState({
          handled: data.data.HttpContent.data.map(handledMortgageFormat)
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
              {this.state.notHandled.map(item => {
                const props = {
                  ...item,
                  overDueDays: item.mortgageOverdueDays,
                  isDataComplete: item.isNoInformationReceived
                };
                return <MortgageListItem {...props} />;
              })}
            </List>
          </div>
          <div className={styles.listWrapper}>
            <List className={styles.list}>
              <AccordionList data={this.state.handling} />
            </List>
          </div>
          <div className={styles.listWrapper}>
            <List className={styles.list}>
              {this.state.handled.map(item => {
                const props = {
                  ...item,
                  overDueDays: item.mortgageOverdueDays,
                  isDataComplete: item.isNoInformationReceived
                };
                return <MortgageListItem {...props} />;
              })}
            </List>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Mortgage;
