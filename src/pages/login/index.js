import intl from 'react-intl-universal';
import { connect } from 'dva';
import { Row,Col,Button,List,Card,Icon,Layout  } from 'antd';
import { handleClick,handleMouseLeave} from 'Actions/loginpage';
import styles from 'Styles/login.less';
import Svg from 'Components/Svg';
import DropdownMeanu from 'Components/Dropdown';
import LoginForm from 'Components/modal/login-form';

const LoginPage = ({ dispatch,currentIndex,languages,advantages,systemDate,copyRight }) => (
  <Layout className={ styles.main }>
    <Row className={styles.header}>
      <Col className={styles.left}>
        <img alt="Eurooo Stock" src={require('Assets/euroooLogo.png')}/>
      </Col>
      <Col className={ styles.right}>
        <LoginForm
          onClick={ handleClick.bind(null,1,dispatch) }
          id="loginForm">
          <Button
            htmlType="button"
            className={ currentIndex === 1 ? `${styles.btn} ${styles.active}` : styles.btn }>
            { intl.get('LOGIN') }
          </Button>
        </LoginForm>
        <Col className={ styles.lang_box }>
          <Button
            htmlType="button"
            onClick={ handleClick.bind(null,3,dispatch) }
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
    <Row className={ styles.abstract }>
      <Col className={ styles._left }>
        <img alt="about Eurooo stock" src={ require('Assets/about.png') }/>
      </Col>
      <Col className={ styles._right }>
        <header>
          {intl.get('ABOUT')}
        </header>
        <article>
          { intl.getHTML('ABSTRACT') }
        </article>
        <Button
          target="_blank"
          href="https://eurooo.com/"
          className={ styles.detailBtn }>
          { intl.get('DETAILS') }
        </Button>
      </Col>
    </Row>
    <Row className={styles.advantage}>
      <Col className={styles.main}>
        <h1>{intl.get('ADVANTAGE')}</h1>
        <List
          dataSource={advantages}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 3, xxl: 3 }}
          renderItem={item => (
            <List.Item
              column=""
              lg="" md="" sm=""
              xl="" xs="" xxl="">
              <Card
                hoverable
                style={{'height':'410px'}}
                cover={<img alt={`advantage of ${item.title}`} src={item.album}/>}>
                <img className={styles.icon} src={item.icon}/>
                <Card.Meta
                  title={item.title}
                  style={{'marginTop':'10px'}}
                  description={item.details}/>
              </Card>
            </List.Item>
          )}
        />
      </Col>
    </Row>
    <Layout className={styles.map}>
      <Row className={styles.main}>
        <Col className={styles.left}>
          <img alt="Address of Eurooo" src={require('Assets/map.jpg')}/>
        </Col>
        <Col className={styles.right}>
          <dl>
            <dt>EUROOO SRL</dt>
            <dd>
              <Col className={styles._left}>
                <Icon type="dizhi"/>
              </Col>
              <Col className={styles._right}>
                Via Einaudi 4-20068, Peschiera Borromeo (MI)-Italy
              </Col>
            </dd>
            <dd>
              <Col className={styles._left}>
                <Icon type="xinfeng"/>
              </Col>
              <Col className={styles._right}>
                info@italyclassico.it（internation）<br/>
                info@italyclassico.com（china）
              </Col>
            </dd>
            <dd>
              <Col className={styles._left}>
                <Icon type="dianhua"/>
              </Col>
              <Col className={styles._right}>
                Monday - Friday 08:00 - 17:00 (UTC+01:00)<br/>
                Tel : 800 629 899 +39 02 9127 0932<br/>
                Fax：+39 02 9132 0424
              </Col>
            </dd>
          </dl>
        </Col>
      </Row>
      <Row className={styles.bottom}>
        <ul>
          <li>{copyRight} © Eurooo</li>
          <li>P.IVA 09697820968</li>
          <li>Privacy Policy</li>
        </ul>
      </Row>
    </Layout>
  </Layout>
);

function mapStateToProps(state){
  const { currentIndex } = state.login;
  const { languages } = state.lang;
  let systemDate = new Date();
  let copyRight = systemDate.getFullYear();
  const advantages = [
    {
      album:require('Assets/a_img.jpg'),
      icon:require('Assets/a_icon_img.jpg'),
      title:intl.get('PLATE'),
      details:intl.get('SERVICE')
    },{
      album:require('Assets/b_img.jpg'),
      icon:require('Assets/b_icon_img.jpg'),
      title:intl.get('TRANSPORTATION'),
      details:intl.get('LOGISTICS')
    },{
      album:require('Assets/c_img.jpg'),
      icon:require('Assets/c_icon_img.jpg'),
      title:intl.get('AFTERSALE'),
      details:intl.get('DEAL')
    }
  ];
  return { currentIndex,languages,advantages,systemDate,copyRight }
}

export default connect(mapStateToProps)(LoginPage)
