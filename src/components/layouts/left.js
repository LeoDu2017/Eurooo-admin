import { connect } from 'dva';
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from 'Components/units/SiderMenu';
import 'rc-drawer-menu/assets/index.css';


const SiderMenuWrapper = (props,{ menuData }) =>
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
      <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props}/>
  );

function mapStateToProps(state){
  return { }
}
export default connect(mapStateToProps)(SiderMenuWrapper);
