import { List }   from 'antd';
import Link       from 'umi/link';
import Svg        from 'Components/Svg';
import {
  no,
  icon,
  open,
  selected,
  dropdownMenu }  from 'Styles/components.less';

const DropdownMeanu = ({ dispatch,list,onMouseLeave,toggle }) => (
  <List
    size="small"
    dataSource={ list }
    className={ toggle ? `${dropdownMenu} ${open}` : dropdownMenu }
    onMouseLeave={ onMouseLeave }
    renderItem={ item => (
      <List.Item
        lg=""
        xl=""
        md=""
        sm=""
        xs=""
        xxl=""
        column=""
        className={ no }>
        {
          Number(item.index) === 1 ?
          <Link
            to={ `?lang=${item.value}` }
            className={ item.selected ? selected : undefined }>
            <Svg type={ item.type } className={ icon }/>
            { item.name }
          </Link> :
          <a className={ item.selected ? selected : undefined }
             onClick={ item.action }
             href="javascript:" >
            <Svg type={ item.type } className={ icon }/>
            { item.name }
          </a>
        }
      </List.Item>
    )}
  />
);

export default DropdownMeanu


