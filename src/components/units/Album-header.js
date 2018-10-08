import { showAlbums } from 'Actions/albums';
import Svg            from 'Components/Svg';
import intl           from 'react-intl-universal';
import styles         from 'Styles/components.less';

const Header = ({dispatch}) => (
  <header>
    <span>{intl.get("ALBUMS")}</span>
    <span onClick={showAlbums.bind(null,dispatch,false)}>
      <Svg className={styles.icon} type="close"/>
    </span>
  </header>
);

export default Header
