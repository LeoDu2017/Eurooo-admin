import { connect } from 'dva';
import { layout,main } from 'Styles/layouts.less';
import LeftLayout from 'Components/layouts/left';
import RightLayout from 'Components/layouts/right';
import HeaderLayout from 'Components/layouts/header';


const BasicLayout = ({children,location:{pathname}}) => (
  <div className={layout}>
    {
      pathname === '/login' ? children :
        <div>
          <LeftLayout/>
          <RightLayout>
            <HeaderLayout/>
            <div className={main}>{ children }</div>
          </RightLayout>
        </div>
    }
  </div>
);

function mapStateToProps(){
  return{}
}

export default connect(mapStateToProps)(BasicLayout);
