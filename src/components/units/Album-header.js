import intl from 'react-intl-universal';
import Svg from 'Components/Svg';
import styles from 'Styles/components.less';
import { showAlbums } from 'Actions/albums';
const Header = ({dispatch}) => (
  <header>
    <span>{intl.get("ALBUMS")}</span>
    <span onClick={showAlbums.bind(null,dispatch,false)}>
      <Svg className={styles.icon} type="close"> </Svg>
    </span>
  </header>
);

export default Header
