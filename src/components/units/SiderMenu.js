import Link             from 'umi/link';
import styles           from 'Styles/layout/sider.less';
import { connect }      from 'dva';
import { Layout,Menu }  from 'antd';

import {
  getNavMenuItems,
  getFlatMenuKeys,
  handleOpenChange,
  getSelectedMenuKeys } from 'Actions/layout/menu';

const SideMenu = ({
  dispatch,collapsed,
  logo,menu,menuProps,selectedKeys,
  Authorized,pathname,isMobile,onCollapse }) =>

  <Layout.Sider
    trigger={ null }
    collapsible
    collapsed={ collapsed }
    breakpoint="lg"
    onCollapse={ onCollapse }
    width={256}
    className={styles.sider}>
    <div className={styles.logo} key="logo">
      <Link to="/">
        <img src={logo} alt="logo"/>
        <h1>Eurooo stock</h1>
      </Link>
    </div>
    <Menu
      key="Menu"
      theme="dark"
      mode="inline"
      { ...menuProps }
      onOpenChange={ handleOpenChange.bind(null,dispatch,menu) }
      selectedKeys={ selectedKeys }
      style={{padding: '16px 0', width: '100%'}}>
      { getNavMenuItems(menu,Authorized,pathname,isMobile) }
    </Menu>
  </Layout.Sider>;

function mapStateToProps(state,props){
  const { collapsed } = props;
  const { menu,openKeys,selectedKeys,flatMenuKeys,pathname } = state.sideMenu;
  const menuProps = collapsed ? {} : { openKeys };
  return { menuProps,menu,flatMenuKeys,selectedKeys,pathname }
}

export default connect(mapStateToProps)(SideMenu)
