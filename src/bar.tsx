import * as React from 'react';
import { TabBar } from 'antd-mobile';
import Lotto from './Lotto';
import My from './My';

interface IProps {
} 

interface IState {
  selectedTab?: string
}

class Bar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedTab: 'A',
    }
  }

  handleChangeBar = (key: string) => {
    this.setState({
      selectedTab: key
    })
  }

  render() {
    return(
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" tabBarPosition="bottom">
          <TabBar.Item title="game" 
           key="game"
           selected={this.state.selectedTab === 'game'}
           onPress={this.handleChangeBar.bind(this, 'game')}
           selectedIcon={ 
             <div style={{ 
                width: '22px', 
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
           }
           icon={ 
             <div style={{ 
                width: '22px', 
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
           }>
            <Lotto title="game"/>
          </TabBar.Item>
          <TabBar.Item title="history" 
            key="C"
            selected={this.state.selectedTab === 'C'}
            onPress={this.handleChangeBar.bind(this, 'C')}
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}/>
            }
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}/>
            }>
            <My title="history"/>
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

export default Bar

