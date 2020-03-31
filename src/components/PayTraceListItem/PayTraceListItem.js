import React from "react";
import { Flex, Checkbox, List, WhiteSpace } from "antd-mobile";
import styles from "./PayTraceListItem.module.scss";
import { moneyFormat, timeFormat } from '../../utils/utils';
import OverDueDays from '../OverDueDays';

const CheckboxItem = Checkbox.CheckboxItem;

const Item = List.Item;
const PayTraceListItem = props => {
  let {
    buildingNo,
    customName,
    paymentMethod,
    overdueDays,
    endDate,
    subscribeDate,
    expectPayDate,
    unPaidReason,
    estimatedSigningTime,
    unpaidMoney,
    data,
    followUpHandle,
    tabIndex
  } = props;

  const onChange = e => {
    e.stopPropagation();
    const { checked } = e.target;
    if (checked) {
      followUpHandle &&
        followUpHandle({ ...data, key: data.tradeGUID }, "push");
    } else {
      followUpHandle && followUpHandle(data.tradeGUID, "del");
    }
  };
  // let history = useHistory();

  // const handleItemClk = e => {
  //   history.push({ pathname: "/detail", state: { saleServiceGUID: null } });
  // };

  return (
    <div>
      <Item className={styles.item}>
        <CheckboxItem className={styles.agreeItem} multipleLine onChange={onChange}>
          <div className={"listItemContent"}>
            <Flex justify="between">
              <Flex.Item>
                <span>{buildingNo}</span>
              </Flex.Item>
              <Flex.Item className={"rightText"}>
                <span>未回款: {moneyFormat(unpaidMoney)}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <Flex.Item>
                <span>{`${customName} 付款方式: ${paymentMethod}`}</span>
              </Flex.Item>
              { tabIndex !== 2 &&
                <Flex.Item className={"rightText"}>
                  <OverDueDays days={overdueDays} />
                </Flex.Item>
              }
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <Flex.Item style={{ overflow: "hidden" }}>
                <span>认购日期: {timeFormat(subscribeDate)}</span>
              </Flex.Item>
            </Flex>
            { tabIndex === 0 &&
              <>
                <WhiteSpace />
                <Flex>
                  <Flex.Item>
                    <span>预计签约日期: {timeFormat(estimatedSigningTime)}</span>
                  </Flex.Item>
                </Flex>
              </>
            }
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <span>预计回款日期: {timeFormat(expectPayDate)}</span>
              </Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <Flex.Item className={styles.endDate}>
                <span>闭合时间: {timeFormat(endDate)}</span>
              </Flex.Item>
            </Flex>
            { tabIndex === 2 &&
              <>
                <WhiteSpace />
                <Flex>
                    <Flex.Item>
                      <span>未回款原因: {unPaidReason}</span>
                    </Flex.Item>
                </Flex>
              </>
            }
          </div>
        </CheckboxItem>
      </Item>
    </div>
  );
};

PayTraceListItem.defaultProps = {
  buildingNo: "test",
  customName: "test",
  paymentMethod: "测试",
  overdueDays: 0,
  estimatedSigningTime: null,
  subscribeDate: null,
  endDate: ''
};

export default PayTraceListItem;
