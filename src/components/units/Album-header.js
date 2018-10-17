import { hide } from 'Actions/common-modal';
import Svg            from 'Components/Svg';
import intl           from 'react-intl-universal';

const Header = ({dispatch,id}) => (
  <header>
    <span>{intl.get("ALBUMS")}</span>
    <span onClick={hide.bind(null,dispatch,null,id)}>
      <Svg className="icon" type="close"/>
    </span>
  </header>
);

export default Header
