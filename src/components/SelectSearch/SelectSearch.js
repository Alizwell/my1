import React, { useState } from 'react';
import { SearchBar, Popover } from 'antd-mobile';
import styles from './SelectSearch.module.scss';

const Item = Popover.Item;

const listData = [
  {
    value: '姓名',
    dataKey: 'customerName'
  },
  {
    value: '房号',
    dataKey:  'roomNumberWord'
  },
  {
    value: '银行',
    dataKey: 'bankName'
  },
]

const SelectSearch = ({loadFunc, setParams, list})=>{
  const [showPopover, setShowPopover] = useState(false);
  const [showPopoverContent, setShowPopoverContent] = useState(false);
  const [selectItem, setSelectItem] = useState({
     datakey: listData[list[0]].dataKey,
     value: listData[list[0]].value
  });
  const onFocus = () => {
    setShowPopover(true);
  }

  const onCancel = ()=>{
    setShowPopover(false);
  }

  const onSubmit = (value)=>{
    loadFunc({
      [selectItem.datakey]: value
    })
  }

  const onBlur = ()=>{
    // setShowPopover(false);
  }

  const onChange = (val)=>{
    setParams({
      [selectItem.datakey]: val
    })
  }

  const onPopoverClk = (e)=>{
    e.stopPropagation();
    setShowPopoverContent(!showPopoverContent)
  }

  const onPopoverSelect = (node, index)=>{
    setSelectItem({
      datakey: node.props.datakey,
      value: node.props.children
    })
  }

  const listContent = ()=>{
    return list.map((val, idx)=>{
      const item = listData[val];
      return <Item key={idx} value={idx} datakey={item.dataKey} className={styles.popoverItem}>{item.value}</Item>
    })
  }

  const placeholder = ()=>{
    const config = ["客户姓名","房号","贷款银行"];
    return '请输入' + list.map(val=>config[val]).join('、');
  }

  return (
    <div className={styles.searchBarWrapper}>
      <SearchBar
          placeholder={placeholder()}
          // ref={ref => (this.autoFocusInst = ref)}
          onFocus={onFocus}
          onBlur={onBlur}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onChange={onChange}
      />
      {showPopover && 
        <Popover
          visible={showPopoverContent}
          className={styles.popoverList}
          overlay={listContent()}
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [5, 0],
          }}
          onSelect={onPopoverSelect}
          placement={'bottomLeft'}
        >
          <div className={styles.popover} onClick={onPopoverClk}>
            <span>{selectItem.value}</span>
          </div>
        </Popover>
      }
    </div>
  )
}

SelectSearch.defaultProps = {
  list: [0, 1, 2]
}

export default SelectSearch;