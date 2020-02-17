import React from "react";
import { Accordion, Flex } from "antd-mobile";
import { PayTraceListItem } from "../PayTraceListItem";
import { unSignedPayTraceFormat } from "../../adaptor/payTrace.adaptor";
import styles from "./PayTraceList.module.scss";

const HeaderContent = ({ header, extraText }) => {
  return (
    <Flex justify="between">
      <Flex.Item><b>{header}</b></Flex.Item>
      <Flex.Item className={styles.headerText}>{extraText}</Flex.Item>
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
              key={idx}
            >
              {data.List.map((val, index) => {
                const item = unSignedPayTraceFormat(val);
                const props = {
                  ...item,
                  endDate: item.lastDate,
                  unpaidMoney: item.money,
                  followUpHandle: followUpHandle,
                  data: item
                };
                return <PayTraceListItem key={index} {...props} />;
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
