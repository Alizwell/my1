import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { Flex, Checkbox, List, WhiteSpace } from "antd-mobile";
import styles from "./MortgageListItem.module.scss";
import moment from 'moment';
import cx from 'classnames';
import { setDetail } from '../../redux/action/detail';
import { afterSaleFormat } from '../../adaptor/mortgage.adaptor';
import OverDueDays from '../OverDueDays';

const momentFormat = time => moment(time).format('YYYY-MM-DD HH:mm')
const AgreeItem = Checkbox.AgreeItem;
const Item = List.Item;
const MortgageListItem = props => {
  let {
    buildingNo,
    customName,
    remark,
    lastProcessingDate,
    overDueDays,
    isDataComplete,
    SaleServiceGUID,
    data,
    followUpHandle,
    noCheck,
    setDetail,
    hideOverdue,
    selectedItem
  } = props;

  const onChange = (e)=>{
    e.stopPropagation();
    const { checked } = e.target;
    if (checked) {
      followUpHandle && followUpHandle({...data, key: data.tradeGUID}, 'push')
    }else{
      followUpHandle && followUpHandle(data.tradeGUID, 'del')
    }
  }

  let history = useHistory();
  const pathname = history.location.pathname;
  const serviceType = pathname.includes('commonFound') 
                      ? 'commonFound'
                      : pathname.includes('contract')
                        ? 'contract'
                        : 'mortgage'; 
  const handleItemClk = (e)=>{
    history.push(
      { 
        pathname:'/detail',
        state:{
          saleServiceGUID: SaleServiceGUID
        }
      }
    );
    setDetail({...afterSaleFormat(props), serviceType})
  }

  const isChecked = Array.isArray(selectedItem) && selectedItem.findIndex( item => item.SaleServiceGUID === SaleServiceGUID) > -1

  return (
      <Item className={styles.item}>
        <AgreeItem className={cx(styles.agreeItem, {[styles.hideCheckBox]: noCheck})} onChange={onChange} checked={isChecked}>
          <div className={'listItemContent'} onClick={handleItemClk}>
            <Flex justify="between">
              <Flex.Item className={"textEllipsis"}>
                <span>{buildingNo}</span>
              </Flex.Item>
              <Flex.Item className={"rightText"}>
                <span>资料是否齐全：{isDataComplete}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <Flex.Item>
                <span>{customName}</span>
              </Flex.Item>
              { !hideOverdue && 
                <Flex.Item className={"rightText"}>
                  {/* <span style={{ color: "red" }}>逾期天数: {overDueDays}</span> */}
                  <OverDueDays days={overDueDays} />
                </Flex.Item>
              }
            </Flex>
            <WhiteSpace />
            <Flex justify="start">
              <Flex.Item>
                <span>最后一次跟进：{momentFormat(lastProcessingDate)}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="start">
              <Flex.Item>
                <p className={styles.remarkText}>备注：{remark}</p>
              </Flex.Item>
            </Flex>
          </div>
        </AgreeItem>
      </Item>
  );
};

MortgageListItem.defaultProps = {
  buildingNo: "6栋301test",
  customName: "黄先生test",
  customPhone: "1368***1254",
  remark: "test",
  lastProcessingDate: "test",
  overDueDays: 0,
  isDataComplete: true,
  SaleServiceGUID: ''
};

export default connect(null, { setDetail })(MortgageListItem);
