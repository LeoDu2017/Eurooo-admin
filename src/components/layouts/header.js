import { connect }    from 'dva';
import { Icon,List }  from 'antd';
import intl           from 'react-intl-universal';

import Svg            from 'Components/Svg';
import DropdownMeanu  from 'Components/Dropdown';
import AdminInfoForm  from 'Components/modal/change-admin-info-form';
import AdminPWDForm   from 'Components/modal/change-admin-password-form';

import { handleToggleOpen,handleMouseLeave }                                      from 'Actions/layout';
import { toggleHandler,changePasswordHandeler,changeInfoHandeler,logoutHandeler } from 'Actions/layout';
import { _toggleBtn,toggleBtn,current,header_wrap,header_item,W240,avatar }       from 'Styles/layouts.less';

const HeaderLayout = ({ dispatch,collapsed,systemOperations,currentIndex }) => (
  <header className={ header_wrap }>
    <Icon
      className={ _toggleBtn }
      type={ collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={ toggleHandler.bind(null,dispatch,!collapsed) }/>
    <List
      dataSource={ systemOperations }
      renderItem={ item => (
        <List.Item
          onClick={ handleToggleOpen.bind(null,dispatch,item.index,currentIndex) }
          style={{'float':'left'}}
          className={ header_item }>
          <a
            className={ currentIndex === item.index ? `${current} ${toggleBtn}` : toggleBtn }
            href="javascript:">
            { item.avatar &&
              <img
                className={ avatar }
                src={ item.avatar }
                alt="user avatar"/>
            }
            { item.svg && <Svg type={ item.svg } className={ avatar }/> }
            { item.title }
          </a>
          <DropdownMeanu
            list={ item.source }
            type={ item.index }
            dispatch={ dispatch }
            toggle={ currentIndex === item.index }>
          </DropdownMeanu>
        </List.Item>
      )}/>
    <AdminPWDForm   id="adminPassword"/>
    <AdminInfoForm  id="adminInfo"/>
  </header>
);

function mapStateToProps(state){
  const { collapsed,currentIndex,administrator } = state.app;
  const { username,avatar } = administrator;
  const { languages } = state.lang;
  const options = [
    {
      index: 2,
      name: intl.get('PWD'),
      type: 'xiugaimima',
      action: changePasswordHandeler
    },{
      index: 2,
      name: intl.get('INO'),
      type: 'zhanghu',
      action: changeInfoHandeler
    },{
      index: 2,
      name: intl.get('OUT'),
      type: 'tuichu',
      action: logoutHandeler
    }
  ];
  const systemOperations = [
    {
      index: 1,
      title: username ? username : 'username',
      avatar: avatar ? avatar : require('Assets/user-avatar.png'),
      svg: null,
      source: options
    },{
      index: 2,
      title: intl.get('LANG'),
      avatar: null,
      svg: 'language',
      source: languages
    }
  ];
  return { collapsed,systemOperations,currentIndex }
}

export default connect(mapStateToProps)(HeaderLayout)
