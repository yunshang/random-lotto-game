import React, { useState } from 'react';
import { NavBar, Icon, List, Accordion, Toast, Badge, Button } from 'antd-mobile'

export interface Props {
  title: string;
}

function My({title}: Props) {
  const handleGotoSup = () => {
    console.log(3434)
  };

  type BollRecord = {
    value: number[],
    type: string,
  }

  type DateRecod = {
    [key:string]: BollRecord[],
  }

  const localData =  localStorage.getItem('bolls')
  const initRecords: DateRecod = (localData !== null ? JSON.parse(localData) : [])
  const [records, setRecord] = useState(initRecords)

  const handleClone = (value: string) => {
    const oInput = document.createElement('input');
    oInput.value = value;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.remove();

    Toast.success(`${value} 复制成功`, 1);
  }

  return (
    <div>
      <NavBar mode="light" icon={<Icon type="left"/>} onLeftClick={handleGotoSup}>
        {title}
      </NavBar>
      <Accordion accordion openAnimation={{}} className="my-accordion">
        {Object.keys(records).map((key, index) => {
          return (
            <Accordion.Panel key={index} header={key}>
              <List key={index}>
                {records[key].map((val, inx) => {
                  return (<List.Item key={inx} extra={<Button inline size="small" style={{ marginTop: '10' }} onClick={() => handleClone(val.value.join(','))}>复制</Button>}>
                    {val.value.join(',')}
                      <Badge text={val.type} style={{ marginLeft: 12, padding: '0 3', backgroundColor: '#fff', borderRadius: 2, color: '#f19736', border: '1px solid #f19736', }} />
                    </List.Item>)
                })}
              </List>
            </Accordion.Panel>
          )
        })}
      </Accordion>
    </div>)
}

export default My;