import Link             from 'umi/link';
import styles           from 'Styles/layout/sider.less';
import { connect }      from 'dva';
import { Layout,Menu }  from 'antd';
import intl from 'react-intl-universal';
import {
  getMenuData,
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
  const { openKeys,selectedKeys,flatMenuKeys,pathname } = state.sideMenu;
  const menuProps = collapsed ? {} : { openKeys };
  const menuData = {
    index:[{
      name: intl.get('HOME'),
      icon: 'home',
      path: '/',
      children: []
    }],
    spots:[{
      name: intl.get('HOME'),
      icon: 'home',
      path: 'main',
      children: []
    },{
      name: intl.get('SHOP'),
      icon: 'shop',
      path: 'shop',
      children: [{
        name:intl.get('SHOPINFO'),
        path:'info'
      },{
        name:intl.get('SHOPADMIN'),
        path:'admin'
      }]
    },{
      name: 'Pages',
      icon: 'dashboard',
      path: 'dashboard',
      children: [
        {
          name: '分析页',
          path: 'analysis',
        },
        {
          name: '监控页',
          path: 'monitor',
        },
        {
          name: '工作台',
          path: 'workplace',
          // hideInBreadcrumb: true,
          // hideInMenu: true,
        },
      ],
    },],
    futures:[{
      name: 'Home',
      icon: 'home',
      path: '/',
      children: []
    }],
  };
  const menu = getMenuData(pathname,menuData);
  return { menuProps,menu,flatMenuKeys,selectedKeys,pathname }
}

export default connect(mapStateToProps)(SideMenu)
