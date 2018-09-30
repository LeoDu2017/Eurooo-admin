import SiderMenu  from 'Components/units/SiderMenu';
import DrawerMenu from 'rc-drawer-menu';
import 'rc-drawer-menu/assets/index.css';

const SiderMenuWrapper = props =>
  props.isMobile ? (
    <DrawerMenu
      parent={null}
      level={null}
      iconChild={null}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
      width="256px">
      <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed}/>
    </DrawerMenu>
  ) : (
    <SiderMenu {...props}/>
  );

export default SiderMenuWrapper;
