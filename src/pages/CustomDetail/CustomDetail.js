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
          <p className={"textEllipsis"}>{buildingNo}</p>
          <p>{customName}</p>
        </Flex.Item>
        {/* <Flex.Item className={styles.headerTail}>
          <p>逾期{overDueDays}天</p>
        </Flex.Item> */}
      </Flex>
      <Tabs tabs={tabs} swipeable={false} className={styles.tabsContent}>
        {saleServiceGUID ? (
          <Processing saleServiceGUID={saleServiceGUID} />
        ) : (
          <NoData />
        )}
        <CustomInfo serviceType={''}/>
      </Tabs>
    </div>
  );
};

CustomDetail.defaultProps = {
  buildingNo: "5栋test",
  customName: "黄先生test",
  customPhone: "1368***test",
  overDueDays: 0,
  saleServiceGUID: ""
};

const mapStateToProps = (state)=>({
  buildingNo: state.detail.房号,
  customName: state.detail.客户姓名,
  customPhone: state.detail.customPhone,
  overDueDays: state.detail.overDueDays,
  saleServiceGUID: state.detail.SaleServiceGUID
})

export default withRouter(connect(mapStateToProps)(CustomDetail));
