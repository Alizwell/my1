import React from "react";
import { SearchBar, Tabs, List } from "antd-mobile";
import MortgageListItem from "../../components/MortgageListItem";
import styles from "./CommonFound.module.scss";

const tabs = [{ title: "未办理" }, { title: "受理中" }, { title: "已放款" }];

class CommonFound extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <SearchBar
          placeholder="请输入客户姓名、电话(后四位或全号)或置业顾问姓名"
          ref={ref => (this.autoFocusInst = ref)}
        />
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "#fff"
            }}
          >
            <List className={styles.list}>
              {tabs.map(item => (
                <MortgageListItem />
              ))}
            </List>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff"
            }}
          >
            Content of second tab
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "250px",
              backgroundColor: "#fff"
            }}
          >
            Content of third tab
          </div>
        </Tabs>
      </div>
    );
  }
}

export default CommonFound;
