import intl from 'react-intl-universal';
import { connect } from 'dva';
import { Icon,List } from 'antd';
import { toggleHandler,changeHandeler,toUcenter,logoutHandeler } from 'Actions/layout';
import { _toggleBtn,toggleBtn,header_wrap,header_item,W240,avatar } from 'Styles/layouts.less';
import DropdownMeanu from 'Components/Dropdown';
import { handleToggleOpen,handleMouseLeave} from 'Actions/layout';


const HeaderLayout = ({ dispatch,collapsed,systemOperations,currentIndex }) => (
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
          onClick={ handleToggleOpen.bind(null,dispatch,item.index,currentIndex) }
          className={ header_item }>
          <a
            className={ toggleBtn }
            href="javascript:">
            { item.avatar && <img className={ avatar } src={ item.avatar } alt="user avatar"/> }
            { item.title }
          </a>
          <DropdownMeanu
            list={ item.source }
            type={ item.index }
            dispatch={ dispatch }
            toggle={ currentIndex === item.index }/>
        </List.Item>
      )}/>
  </header>
);

function mapStateToProps(state){
  const { collapsed,currentIndex,administrator } = state.app;
  const { username,avatar } = administrator;
  const { languages } = state.lang;
  const options = [
    {
      name: intl.get('PWD'),
      type: 'xiugaimima',
      action: changeHandeler
    },{
      name:intl.get('INO'),
      type:'zhanghu',
      action: toUcenter
    },{
      name:intl.get('OUT'),
      type:'tuichu',
      action: logoutHandeler
    }
  ];

  const systemOperations = [
    {
      index: 1,
      title: username ? username : 'username',
      avatar: avatar ? avatar : require('Assets/user-avatar.png'),
      source: options
    },{
      index: 2,
      title: intl.get('LANG'),
      avatar: null,
      source: languages
    }
  ];
  return { collapsed,systemOperations,currentIndex }
}

export default connect(mapStateToProps)(HeaderLayout)
