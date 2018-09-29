import { Layout } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from 'Styles/layout/sider.less';

const SiderMenu = ({ dispatch,collapsed,logo }) =>
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

  </Layout.Sider>;
function mapStateToProps(){
  return {}
}
export default connect(mapStateToProps)(SiderMenu)
