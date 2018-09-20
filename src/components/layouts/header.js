import intl from 'react-intl-universal';
import { connect } from 'dva';
import { Icon,List } from 'antd';
import { toggleHandler } from 'Actions/layout';
import { _toggleBtn,toggleBtn,header_wrap,header_item,W240 } from 'Styles/layouts.less';
import DropdownMeanu from 'Components/Dropdown';
const HeaderLayout = ({ dispatch,collapsed,systemOperations }) => (
  <header className={ header_wrap }>
    <Icon
      className={ _toggleBtn }
      type={ collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={ toggleHandler.bind(null,dispatch,!collapsed) }
    />
    <List
      dataSource={ systemOperations }
      grid={{ gutter: 16, column: 2 }}
      className={ W240 }
      renderItem={ item => (
        <List.Item
          className={ header_item }>
          <a
            className={ toggleBtn }
            href="javascript:;">
            { item.title }
          </a>
        </List.Item>
      )}/>
  </header>
);

function mapStateToProps(state){
  const { collapsed } = state.app;
  const { languages } = state.lang;
  const options = [
    {
      name: intl.get('PWD'),
      type:'xiugaimima'
    },
    {
      name:intl.get('INO'),
      type:'zhanghu'
    },
    {
      name:intl.get('OUT'),
      type:'tuichu'
    }
  ];

  const  systemOperations = [
    {
      index: 1,
      title: 'Username',
      source:options
    },{
      index: 2,
      title: intl.get('LANG'),
      source:languages
    }
  ];
  return { collapsed,systemOperations }
}

export default connect(mapStateToProps)(HeaderLayout)
