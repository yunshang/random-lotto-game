import React, { useState } from 'react';
import { NavBar, Icon, List, Radio, WingBlank, WhiteSpace, Card, Tag, Badge, Button } from 'antd-mobile'
import { RcRange } from './components/RcRange';
import CSS from 'csstype';
const RadioItem = Radio.RadioItem;

export interface Props {
  title: string;
}

const redStyles: CSS.Properties = {
  width: '30px',
  height: '30px',
  padding: '4px 3px',
  textAlign: 'center',
  border: '1px solid #FF0000',
  fontSize: '18px',
  marginLeft: '5px',
  backgroundColor: '#fff',
  borderRadius: '50%',
  color: 'black',
};

const blueStyles: CSS.Properties = {
  width: '30px',
  height: '30px',
  padding: '4px 3px',
  textAlign: 'center',
  border: '1px solid #0662ec',
  fontSize: '18px',
  backgroundColor: '#fff',
  borderRadius: '50%',
  color: 'black',
  marginLeft: '5px',
};

function Lotto({title}: Props) {
  const [bolls, setBolls] = useState<number[]>([]);
  const [game, setGame] = useState<string>('双色球');
  const marks: Record<number, string> = {
    1: '1',
    36: '36',
  }
  const [rangeTipDefault, setRangeTipDefault] = useState(marks);

  const rangeInitValue: number[] = [1, 36]
  const [rangeDefault, setRangeDefault] = useState(rangeInitValue);


  const handleGotoSup = () => {
    console.log(3434)
  };

  const rangeChange = (values:number[]) => {
    const valueObj = {...values};
    let result = Object.assign({}, ...Object.keys(valueObj).map((k: any)  => ({[valueObj[k]]: `${valueObj[k]}`})));
    setRangeTipDefault(result)
  };

  const rangeRandomNum = () => {
    return (
      <RcRange marks={rangeTipDefault} min={1} max={36} style={{ marginTop: 20 }} defaultValue={rangeDefault} onChange={rangeChange} />
    )
  };
  const onchangeType = (value: string) => {
    setGame(value);
  };
  
  const randomRange = (min: number, max: number, length: number) => {
    // if (max  min) {
    //     [min, max] = [min, max];
    // };
    let randomNumber:number = Number(Math.floor(Math.random() * max));
    while(randomNumber < min || bolls.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * max);
    }

    return randomNumber;
  }

  const handleClear = () => {
    setBolls([]);
  }
  type BollRecord = {
    value: number[],
    type: string,
  }

  type DateRecod = {
    [key:string]: BollRecord[],
  }

  const saveRecord = () => {
    const historyRecord = localStorage.getItem('bolls');
    let records: DateRecod = {};
    if (historyRecord !== null) {
      records = JSON.parse(historyRecord);
    }
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    const bollsJson: BollRecord = {value: bolls, type: game}
    if (!records[date]) records[date] = []
    records[date].push(bollsJson)
    localStorage.setItem('bolls', JSON.stringify(records))
    handleClear()
  }

  const gameRandInit = (key: string) => {
    const [min, max] = Object.keys(rangeTipDefault);
    const boll = randomRange(Number(min), Number(max), 1);
    const newBolls = [...bolls, boll];
    setBolls(newBolls);
  }

  const gameType = [
    {value: 'double', label: '双色球'},
    {value: 'lotto', label: '大乐透'},
  ]

  return (
    <div>
      <NavBar mode="light" icon={<Icon type="left"/>} onLeftClick={handleGotoSup}>
        {title}
      </NavBar>
      <List renderHeader={() => "游戏类型"}>
        {gameType.map(i => (
          <RadioItem key={i.label} checked={ game === i.label } onChange={() => onchangeType(i.label)}>
            {i.label}
          </RadioItem>
        ))}
      </List>
      <List renderHeader={() => '随机区间'}>
        <WingBlank size="lg">
          {rangeRandomNum()}
        </WingBlank>
      </List>
      <WhiteSpace size="lg" style={{ marginTop: 50 }}/>
      <Card>
        <Card.Header
          title={game}
          extra={<div><Button type="ghost" size="small" onClick={() => gameRandInit(game)}>刷新</Button></div>}
        />
        <Card.Body>
          <div>
            {bolls.map((boll, index) => (
              <Badge text={`${boll}`} key={index} style={index > 5 ? blueStyles : redStyles}/>
            ))}
          </div>
        </Card.Body>
        <Card.Footer content={<Button type="warning" style={{ marginTop: 10 }} size="small" onClick={() => handleClear()}>清空</Button>} 
                      extra={<div style={{ marginTop: 10 }}><Button type="primary" size="small" inline onClick={() => saveRecord()}>保存</Button></div>} />
      </Card>
      <WhiteSpace size="lg" />
    </div>
  );
}

export default Lotto;