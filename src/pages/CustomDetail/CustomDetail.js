import React from 'react';
import { withRouter } from 'react-router';
import { Flex, Tabs } from 'antd-mobile';
import { CustomInfo } from '../../components/CustomInfo';
import { Processing } from '../../components/Processing';

import styles from './CustomDetail.module.scss';

const tabs = [{ title: "办理进度" }, { title: "资料信息" }];

const CustomDetail = ({buildingNo, customName, customPhone, overDueDays, location})=>{
    const { saleServiceGUID } = location.state;
    return (
        <div className={styles.detail}>
            <Flex justify="start" className={styles.wrapper}>
                <Flex.Item className={styles.headerAvator}>
                    <b className={styles.avator}>头像</b>
                </Flex.Item>
                <Flex.Item className={styles.headerDesc}>
                    <p>{buildingNo}</p>
                    <p>{customName} <b>{customPhone}</b></p>
                </Flex.Item>
                <Flex.Item className={styles.headerTail}>
                    <p>逾期{overDueDays}天</p>
                </Flex.Item>
            </Flex>
            <Tabs
                tabs={tabs}
                swipeable={false}
                className={styles.tabsContent}
            >
                <Processing saleServiceGUID={saleServiceGUID}/>
                <CustomInfo />
            </Tabs>
        </div>
    )
}

CustomDetail.defaultProps = {
    buildingNo: '5栋803',
    customName: "黄先生test",
    customPhone: "1368***1254",
    overDueDays: 4,
    saleServiceGUID: ''
}

export default withRouter(CustomDetail);