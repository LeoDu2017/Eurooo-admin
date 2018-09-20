import { connect } from 'dva';
import { Icon } from 'antd';
import { toggleHandler } from 'Actions/layout';
import { _toggleBtn } from 'Styles/layouts.less';
const HeaderLayout = ({ dispatch,collapsed }) => (<header style={{ background: '#fff', padding: 0 }}>
  <Icon
    className={ _toggleBtn }
    type={ collapsed ? 'menu-unfold' : 'menu-fold'}
    onClick={ toggleHandler.bind(null,dispatch,!collapsed) }
  />
</header>);

function mapStateToProps(state){
  const { collapsed } = state.app;
  return { collapsed }
}

export default connect(mapStateToProps)(HeaderLayout)
