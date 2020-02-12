import React from "react";
import { PullToRefresh } from "antd-mobile";
import styles from "./NoData.module.scss";

const NoData = ({ refreshing, onRefresh, showRefresh }) => {
  const direction = "down";
  return (
    <PullToRefresh
      distanceToRefresh={window.devicePixelRatio * 25}
      direction={direction}
      refreshing={showRefresh && refreshing}
      onRefresh={onRefresh}
      style={{
        overflow: "auto"
      }}
      className={styles.noDataPull}
    >
      <div className={styles.nodataWrapper}></div>
    </PullToRefresh>
  );
};

NoData.defaultProps = {
  refreshing: false,
  onRefresh: () => {},
  showRefresh: false
};

export default NoData;
