import React from 'react';
import cx from 'classnames';
import styles from './OverDueDays.module.scss';

export const OverDueDays = ({days})=>{
  return (
    <span className={cx({[styles.redColor]: (Number(days) > 0)})}>逾期天数: {days}</span>
  )
}