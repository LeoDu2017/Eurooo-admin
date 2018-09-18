import { connect } from 'dva';
import { Layout } from 'antd';
import { layout,main,right_side } from 'Styles/layouts.less';
import LeftLayout from 'Components/layouts/left';
import HeaderLayout from 'Components/layouts/header';

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout = ({children,location:{pathname}}) => (
  <Layout className={layout}>
    {
      pathname === '/login' ?
      <Content> { children } </Content> :
      <Layout>
        <Sider>
          <LeftLayout/>
        </Sider>
        <Layout>
          <Header>
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

function mapStateToProps(){
  return{}
}

export default connect(mapStateToProps)(BasicLayout);
