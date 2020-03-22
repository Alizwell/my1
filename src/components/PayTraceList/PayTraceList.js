import React from "react";
import { Accordion, Flex } from "antd-mobile";
import { PayTraceListItem } from "../PayTraceListItem";
import { unSignedPayTraceFormat } from "../../adaptor/payTrace.adaptor";
import styles from "./PayTraceList.module.scss";
import cx from 'classnames';

const HeaderContent = ({ header, extraText }) => {
  return (
    <Flex justify="between">
      <Flex.Item><b>{header}</b></Flex.Item>
      <Flex.Item className={cx(styles.headerText, 'money')}>{extraText}</Flex.Item>
    </Flex>
  );
};

const PayTraceList = props => {
  const { data: renderData, followUpHandle } = props;
  return (
    <div>
      <Accordion>
        {renderData.map((data, idx) => {
          return (
            <Accordion.Panel
              header={HeaderContent({
                header: data.ArrearageReasonName
                  ? data.ArrearageReasonName
                  : "",
                extraText: (Number(data.TotalMoney) / 10000).toFixed(0) + " 万"
              })}
              key={`${data.ArrearageReasonName}_${data.TotalMoney}`}
            >
              {data.List.map((val) => {
                const item = unSignedPayTraceFormat(val);
                const props = {
                  ...item,
                  endDate: item.lastDate,
                  unpaidMoney: item.money,
                  followUpHandle: followUpHandle,
                  data: item
                };
                const key = `${props.orderGUID}_${props.FeeGUID}`;
                return <PayTraceListItem key={key} {...props} />;
              })}
            </Accordion.Panel>
          );
        })}
      </Accordion>
    </div>
  );
};

PayTraceList.defaultProps = {
  data: []
};

export default PayTraceList;
