import React from "react";
import { Accordion, Flex } from "antd-mobile";
import MortgageListItem from "../MortgageListItem";
import { unhandledMortgageFormat } from "../../adaptor/mortgage.adaptor";
import styles from "./AccordionList.module.scss";

const HeaderContent = ({ header, extraText }) => {
  return (
    <Flex justify="between">
      <Flex.Item>{header}</Flex.Item>
      <Flex.Item className={styles.headerText}>{extraText}</Flex.Item>
    </Flex>
  );
};

const AccordionList = props => {
  const { data: handlingData } = props;
  return (
    <div>
      <Accordion>
        {handlingData.map(data => {
          return (
            <Accordion.Panel
              header={HeaderContent({
                header: data.MortgageLoanProcess,
                extraText: data.TotalMoney + "万"
              })}
            >
              {data.List.map(val => {
                const item = unhandledMortgageFormat(val);
                const props = {
                  ...item,
                  overDueDays: item.mortgageOverdueDays,
                  isDataComplete: item.isNoInformationReceived
                };
                return <MortgageListItem {...props} />;
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
