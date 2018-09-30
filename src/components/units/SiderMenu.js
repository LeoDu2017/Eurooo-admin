import { connect }      from 'dva';
import { Layout,Menu }  from 'antd';
import Link             from 'umi/link';
import {
  getMenuData,
  getNavMenuItems,
  getFlatMenuKeys,
  handleOpenChange,
  getSelectedMenuKeys } from 'Actions/layout/menu';
import styles           from 'Styles/layout/sider.less';

const SiderMenu = ({ dispatch,collapsed,logo,menuProps,pathname,selectedKeys,menu,Authorized,isMobile }) =>
  <Layout.Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    breakpoint="lg"
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
      {...menuProps}
      onOpenChange={ handleOpenChange.bind(null,dispatch,menu) }
      selectedKeys={ selectedKeys }
      style={{padding: '16px 0', width: '100%'}}>
      { getNavMenuItems(menu,Authorized,pathname,isMobile) }
    </Menu>
  </Layout.Sider>;
function mapStateToProps(state,props){
  const { location:{pathname},collapsed,Authorized,isMobile } = props;
  const { openKeys } = state.siderMenu;
  const menuProps = collapsed ? {} : { openKeys };
  const menu = getMenuData();
  const flatMenuKeys = getFlatMenuKeys(menu);
  let selectedKeys = getSelectedMenuKeys(pathname,flatMenuKeys);
  if (!selectedKeys.length) {
    selectedKeys = [openKeys[openKeys.length - 1]];
  }
  return { menuProps,menu,flatMenuKeys,selectedKeys,Authorized,pathname,isMobile }
}
export default connect(mapStateToProps)(SiderMenu)
