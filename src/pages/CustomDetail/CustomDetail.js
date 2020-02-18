import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Flex, Tabs } from "antd-mobile";
import { CustomInfo } from "../../components/CustomInfo";
import { Processing } from "../../components/Processing";
import NoData from "../../components/NoData";

import styles from "./CustomDetail.module.scss";

const tabs = [{ title: "办理进度" }, { title: "资料信息" }];

const CustomDetail = ({
  buildingNo,
  customName,
  customPhone,
  overDueDays,
  saleServiceGUID
}) => {
  return (
    <div className={styles.detail}>
      <Flex justify="start" className={styles.wrapper}>
        <Flex.Item className={styles.headerAvator}>
          <b className={styles.avator}>头像</b>
        </Flex.Item>
        <Flex.Item className={styles.headerDesc}>
          <p>{buildingNo}</p>
          <p>
            {customName} <b>{customPhone}</b>
          </p>
        </Flex.Item>
        <Flex.Item className={styles.headerTail}>
          <p>逾期{overDueDays}天</p>
        </Flex.Item>
      </Flex>
      <Tabs tabs={tabs} swipeable={false} className={styles.tabsContent}>
        {saleServiceGUID ? (
          <Processing saleServiceGUID={saleServiceGUID} />
        ) : (
          <NoData />
        )}
        <CustomInfo />
      </Tabs>
    </div>
  );
};

CustomDetail.defaultProps = {
  buildingNo: "5栋803",
  customName: "黄先生test",
  customPhone: "1368***1254",
  overDueDays: 4,
  saleServiceGUID: ""
};

const mapStateToProps = (state)=>({
  buildingNo: state.detail.buildingNo,
  customName: state.detail.customName,
  customPhone: state.detail.customPhone,
  overDueDays: state.detail.overDueDays,
  saleServiceGUID: state.detail.SaleServiceGUID
})

export default withRouter(connect(mapStateToProps)(CustomDetail));
