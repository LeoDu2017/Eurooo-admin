import { connect } from 'dva';
import { Layout } from 'antd';
import {
  layout,
  main,
  left_side,
  logo,
  right_side,
  reset } from "Styles/layouts.less";
import LeftLayout from 'Components/layouts/left';
import HeaderLayout from 'Components/layouts/header';
import { toggleHandler }    from 'Actions/layout';

const { Footer,Content } = Layout;

const BasicLayout = ({dispatch,children,collapsed,isMobile,location:{pathname}}) => (
  <Layout className={layout}>
    {
      pathname === '/login' ?
      <Content> { children } </Content> :
      <Layout>
        <LeftLayout
          isMobile={ isMobile }
          logo={ require('Assets/logo.svg') }
          onCollapse={ toggleHandler.bind(null,dispatch) }
          collapsed={collapsed}/>
        <Layout className={ right_side }>
          <header style={{'padding':0}}>
            <HeaderLayout
              logo={ require('Assets/logo.svg') }
              isMobile={ isMobile }
              collapsed={collapsed}
              onCollapse={ toggleHandler.bind(null,dispatch) }/>
          </header>
          <Content className={main}>
            { children }
          </Content>
          <Footer>
            底部
          </Footer>
        </Layout>
      </Layout>
    }
  </Layout>
);


function mapStateToProps(state){
  const { collapsed,isMobile } = state.app;

  return{ collapsed,isMobile }
}

export default connect(mapStateToProps)(BasicLayout);
