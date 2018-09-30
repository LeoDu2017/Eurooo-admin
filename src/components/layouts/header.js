import { connect }          from 'dva';
import {
  Icon,Avatar,Divider,
  Tooltip,Dropdown }        from 'antd';
import Link                 from 'umi/link';
import Svg                  from 'Components/Svg';

import {
  getNoticeData,
  getAdminOperations,
  getLanguageOperations }   from 'Actions/layout/header'
import {
  logo_style,
  header,trigger,right,
  action,search,account,
  avatar_style,name,
  lang_icon,f_l,f_r }       from 'Styles/layout/header.less';
import HeaderSearch         from 'Components/layouts/header-search';
import HeaderNotice         from 'Components/layouts/header-notice';
import AdminInfoForm        from 'Components/modal/change-admin-info-form';
import AdminPWDForm         from 'Components/modal/change-admin-password-form';

const HeaderLayout = ({
  logo,onCollapse,
  username,collapsed,
  dispatch,isMobile,avatar,
  notifyCount,onNoticeClear,
  fetchingNotices,adminOperations,
  onNoticeVisibleChange,languageOperations }) => (
  <div className={ header }>
    {isMobile ? [
      <Link to="/" className={ logo_style } key="logo">
        <img src={ logo } alt="logo" width="32" />
      </Link>,
      <Divider type="vertical" key="line" />,
    ] : <Icon className={ trigger } onClick={ onCollapse.bind(null,!collapsed) }
      type={ collapsed ? 'menu-unfold' : 'menu-fold'}/>
    }

    <div className={ right }>
      <HeaderSearch
        className={`${action} ${search}`}
        placeholder="站内搜索"
        dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
        onSearch={value => {
          console.log('input', value); // eslint-disable-line
        }}
        onPressEnter={value => {
          console.log('enter', value); // eslint-disable-line
        }}/>
      <Tooltip
        placement="bottom"
        title="使用文档">
        <a
          target="_blank"
          href="http://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={ action }
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      <HeaderNotice
        className={ action }
        count={ notifyCount }
        onItemClick={(item, tabProps) => {
          console.log(item, tabProps); // eslint-disable-line
        }}
        onClear={onNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        loading={fetchingNotices}
        popupAlign={{ offset: [20, -16] }}>
        <HeaderNotice.Tab
          list={getNoticeData['通知']}
          title="通知"
          emptyText="你已查看所有通知"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        />
        <HeaderNotice.Tab
          list={getNoticeData['消息']}
          title="消息"
          emptyText="您已读完所有消息"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        />
        <HeaderNotice.Tab
          list={getNoticeData['待办']}
          title="待办"
          emptyText="你已完成所有待办"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
        />
      </HeaderNotice>
      {
        username ?
          <Dropdown
            overlay={ adminOperations }>
            <span className={`${action} ${account} ${f_r}`}>
              <Avatar size="small" className={`${avatar_style} ${f_l}`} src={avatar} />
              <span className={name}>{username}</span>
            </span>
          </Dropdown> :
          <Spin size="small" style={{ marginLeft: 8 }} />
      }
      <Dropdown
        overlay={ languageOperations }>
        <span className={`${action} ${account} ${f_r}`}>
          <Svg type="lang" className={ lang_icon }/>
        </span>
      </Dropdown>
    </div>
    <AdminPWDForm   id="adminPassword"/>
    <AdminInfoForm  id="adminInfo"/>
  </div>
);

function mapStateToProps(state){
  const { collapsed,administrator } = state.app;
  const { username,avatar,notifyCount } = administrator;
  const { languages } = state.lang;

  return {
    collapsed,
    avatar,
    username,
    notifyCount,
    adminOperations:getAdminOperations(),
    languageOperations:getLanguageOperations(languages)
  }
}

export default connect(mapStateToProps)(HeaderLayout)
