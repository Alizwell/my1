import React from 'react';
import { Accordion, List, Checkbox, Flex } from 'antd-mobile';
import { getProject } from '../../service/project.service';
import { projectInfoFormat } from '../../adaptor/projectInfo.adaptor';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

const leafItem = ({projName})=>{
  return (
    <CheckboxItem>
      {projName}
    </CheckboxItem>
  )
}

const projectTree = (renderData)=>{
  debugger;
  const formatData = projectInfoFormat(renderData);
  const subItem = formatData.children.length > 0 
    ? (
      <Accordion>
        <Accordion.Panel header={formatData.projName}>
          {formatData.children.map(item=>{
            return projectTree(item)
          })}
        </Accordion.Panel>
      </Accordion>)
    : leafItem(formatData)
  return subItem;
}



class Self extends React.Component {
  state = {
    renderData: {
      children: []
    }
  }
  componentDidMount(){
    getProject({}).then(data=>{
      console.log(data);
      this.setState({
        renderData: data.data.HttpContent[0]
      })
    })
  }

  onChange = (val) => {
    console.log(val);
  }
  render() {
    // const data = [
    //   { value: 0, label: 'Ph.D.' },
    //   { value: 1, label: 'Bachelor' },
    //   { value: 2, label: 'College diploma' },
    //   { value: 3, label: 'College diploma1' },
    //   { value: 4, label: 'College diploma2' },
    // ];
    return (<div>
      <List renderHeader={() => '请选择项目'}>
        {projectTree(this.state.renderData)}
        {/* {data.map(i => (
          <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
            {i.label}
          </CheckboxItem>
        ))}
        <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
          Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
        </CheckboxItem> */}
      </List>
    </div>);
  }
}
export default Self;