import { connect } from 'dva';
import { Layout } from 'antd';
import { layout,main,left_side,right_side,header_layout } from 'Styles/layouts.less';
import LeftLayout from 'Components/layouts/left';
import HeaderLayout from 'Components/layouts/header';

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout = ({children,collapsed,location:{pathname}}) => (
  <Layout className={layout}>
    {
      pathname === '/login' ?
      <Content> { children } </Content> :
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={ collapsed }
          className={ left_side }>
          <LeftLayout/>
        </Sider>
        <Layout className={ right_side }>
          <Header className={ header_layout }>
            <HeaderLayout/>
          </Header>
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
  const { collapsed } = state.app;
  return{ collapsed }
}

export default connect(mapStateToProps)(BasicLayout);
