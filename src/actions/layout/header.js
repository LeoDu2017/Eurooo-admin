import { Tag,Menu,Icon } from 'antd';
import Svg from 'Components/Svg';
import router from 'umi/router';
import { menu,selected,m_r_8,w_140 } from 'Styles/layout/header.less';
import intl from "react-intl-universal";
import {
  logoutHandeler,
  changeInfoHandeler,
  changePasswordHandeler }  from 'Actions/layout';

const onLangMenuClick = ({key}) => {
  router.push({
    pathname:'',
    query: {
      lang: key,
    },
  })
};

export function getNoticeData(notices) {

  if (notices.length === 0) {
    return {};
  }
  const newNotices = notices.map(notice => {
    const newNotice = { ...notice };
    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime).fromNow();
    }
    // transform id to item key
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      );
    }
    return newNotice;
  });
  return groupBy(newNotices, 'type');
}
export function getLanguageOperations(languages){
  return (
    <Menu
      className={ menu }
      selectedKeys={[]}
      onClick={onLangMenuClick}>
      {
        languages.map( lang =>
          <Menu.Item
            className={ lang.selected ?`${selected} ${w_140}` : w_140  }
            key={lang.value}>
            <Svg type={lang.type} className={ m_r_8 }/>
            { lang.name }
          </Menu.Item>
        )
      }
    </Menu>
  )
}
export function getAdminOperations() {
  return (
    <Menu
      className={ menu }
      selectedKeys={[]}>
      <Menu.Item onClick={ changeInfoHandeler } key="INO">
        <Icon type="setting" />{ intl.get('INO') }
      </Menu.Item>
      <Menu.Item onClick={ changePasswordHandeler } key="PWD">
        <Icon type="user" />{ intl.get('PWD') }
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={ logoutHandeler } key="logout">
        <Icon type="logout" />{ intl.get('OUT')}
      </Menu.Item>
    </Menu>
  )
}
