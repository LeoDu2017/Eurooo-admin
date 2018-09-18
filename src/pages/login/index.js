import intl from 'react-intl-universal';
import { connect } from 'dva';
import { Row,Col,Button } from 'antd';
import { handleClick,handleMouseLeave} from 'Actions/loginpage';
import styles from 'Styles/login.less';
import Svg from 'Components/Svg';
import DropdownMeanu from 'Components/Dropdown';

const LoginPage = ({dispatch,currentIndex,languages}) => (
  <div className={styles.main}>
    <Row className={styles.header}>
      <Col className={styles.left}>
        <img alt="Eurooo Stock" src={require('Assets/euroooLogo.png')}/>
      </Col>
      <Col className={ styles.right}>
        <Button
          htmlType="button"
          onClick={ handleClick.bind(null,1,dispatch) }
          className={ currentIndex === 1 ? `${styles.btn} ${styles.active}` : styles.btn }>
          { intl.get('LOGIN') }
        </Button>
        <Col className={ styles.lang_box }>
          <Button
            htmlType="button"
            onClick={ handleClick.bind(null,3,dispatch)}
            className={ currentIndex === 3 ? `${styles.title} ${styles.active}` : styles.title}>
            {intl.get('LANG')}
            <Svg type="triangulum" className={styles.icon}/>
          </Button>
          <DropdownMeanu
            list={ languages }
            toggle={ currentIndex === 3 }
            onMouseLeave={ handleMouseLeave.bind(null,dispatch) }>
          </DropdownMeanu>
        </Col>
      </Col>
    </Row>
  </div>
);

function mapStateToProps(state){
  const { currentIndex } = state.login;
  const { languages } = state.lang;

  return { currentIndex,languages }
}

export default connect(mapStateToProps)(LoginPage)
