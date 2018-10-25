import { InputNumber,Input } from 'antd';

class SKUInput extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {value:{color,size,fabric,stock},edit} = this.props;

    return (
      <span>
        颜色&nbsp;:&nbsp;<input
        className="ant-input"
        placeholder="颜色"
        value={ color || ''}
        onChange={(event) => edit('color',event.target.value)}
        style={{ width:120,marginRight:15}}/>
            尺寸&nbsp;:&nbsp;<input
        className="ant-input"
        value={ size || ''}
        onChange={(event) => edit('size',event.target.value)}
        placeholder="尺寸" style={{ width:120,marginRight:15}}/>
            材质&nbsp;:&nbsp;<input
        className="ant-input"
        value={ fabric || ''}
        onChange={(event) => edit('fabric',event.target.value)}
        placeholder="材质" style={{ width:120,marginRight:15}}/>
            库存&nbsp;:&nbsp;<input
        className="ant-input"
        type='number'
        min={0}
        onChange={(event) => edit('stock',event.target.value)}
        placeholder="库存"
        value={ stock || ''}
        style={{ width:'120px'}} />
      </span>
    );
  }
}

export default SKUInput
