import Link from 'umi/link';
import { getNavMenuItems } from '../actions/layout/menu';
import { Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};
const { SubMenu } = Menu;
export function isUrl(path) {
  return reg.test(path);
}
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

export function getMenuItemPath(item,pathname,isMobile){
  const itemPath = conversionPath(item.path);
  const icon = getIcon(item.icon);
  const { target, name } = item;
  // Is it a http link
  if (/^https?:\/\//.test(itemPath)) {
    return (
      <a href={itemPath} target={target}>
        {icon}
        <span>{name}</span>
      </a>
    );
  }
  return (
    <Link
      to={itemPath}
      target={target}
      replace={itemPath === pathname}
      onClick={
        isMobile
          ? () => {
            // onCollapse(true);
          }
          : undefined
      }
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
}
export function conversionPath(path){
  if (path && path.indexOf('http') === 0) {
    return path;
  } else {
    return `/${path || ''}`.replace(/\/+/g, '/');
  }
}

export function checkPermissionItem(authority, ItemDom,Authorized){
  if (Authorized && Authorized.check) {
    const { check } = Authorized;
    return check(authority, ItemDom);
  }
  return ItemDom;
}
export function isMainMenu(key,menu){
  return menu.some(item => key && (item.key === key || item.path === key));
}
export function getSubMenuOrItem(item,pathname){
  if (item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children);
    // 当无子菜单时就不展示菜单
    if (childrenItems && childrenItems.length > 0) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                  {getIcon(item.icon)}
                <span>{item.name}</span>
                </span>
            ) : (
              item.name
            )
          }
          key={item.path}
        >
          {childrenItems}
        </SubMenu>
      );
    }
    return null;
  } else {
    return <Menu.Item key={item.path}>{ getMenuItemPath(item,pathname) }</Menu.Item>;
  }
}
export function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}
export const getMeunMatcheys = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    return pathToRegexp(item).test(path);
  });
};
