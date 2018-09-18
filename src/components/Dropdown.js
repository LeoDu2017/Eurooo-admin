import Link from 'umi/link';
import { dropdownMenu,open,selected,icon,no } from 'Styles/components.less';
import Svg from 'Components/Svg';
import { List } from 'antd';

const DropdownMeanu = ({ list,onMouseLeave,toggle }) => (
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
        className={no}>
        <Link
          to={ `?lang=${item.value}` }
          className={ item.selected ? selected : undefined }>
          <Svg type={ item.type } className={ icon }/>
          { item.name }
        </Link>
      </List.Item>
    )}
  />
);

export default DropdownMeanu

