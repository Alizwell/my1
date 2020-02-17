import React from "react";
import { Accordion, Flex } from "antd-mobile";
import MortgageListItem from "../MortgageListItem";
import { unhandledMortgageFormat } from "../../adaptor/mortgage.adaptor";
import styles from "./AccordionList.module.scss";

const HeaderContent = ({ header, extraText }) => {
  return (
    <Flex justify="between">
      <Flex.Item><b>{header}</b></Flex.Item>
      <Flex.Item className={styles.headerText}>{extraText}</Flex.Item>
    </Flex>
  );
};

const AccordionList = props => {
  const { data: handlingData, followUpHandle } = props;
  return (
    <div>
      <Accordion>
        {handlingData.map((data, index) => {
          return (
            <Accordion.Panel
              header={HeaderContent({
                header: data.MortgageLoanProcess,
                extraText: (Number(data.TotalMoney) / 10000).toFixed(0) + " 万"
              })}
              key={index}
            >
              {data.List.map((val, idx) => {
                const item = unhandledMortgageFormat(val);
                const props = {
                  ...item,
                  overDueDays: item.mortgageOverdueDays,
                  isDataComplete: item.isNoInformationReceived,
                  followUpHandle: followUpHandle,
                  data: item
                };
                return <MortgageListItem key={idx} {...props} />;
              })}
            </Accordion.Panel>
          );
        })}
      </Accordion>
    </div>
  );
};

AccordionList.defaultProps = {
  data: []
};

export default AccordionList;
