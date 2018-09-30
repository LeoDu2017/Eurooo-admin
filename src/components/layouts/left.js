import SiderMenu  from 'Components/units/SiderMenu';
import DrawerMenu from 'rc-drawer-menu';
import 'rc-drawer-menu/assets/index.css';

const SiderMenuWrapper = props =>
  props.isMobile ? (
    <DrawerMenu
      parent={ null }
      level={ null }
      iconChild={ null }
      onHandleClick={ () => {
        props.onCollapse(!props.collapsed);
      } }
      // open={ props.collapsed }
      onMaskClick={() => {
        props.onCollapse(!props.collapsed);
      }}
      width="256px">
      <SiderMenu {...props} collapsed={ props.isMobile ? false : props.collapsed}/>
    </DrawerMenu>
  ) : (
    <SiderMenu {...props}/>
  );

export default SiderMenuWrapper
