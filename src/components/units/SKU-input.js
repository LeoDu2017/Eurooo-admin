import { InputNumber,Input } from 'antd';

class SKUInput extends React.Component {
  constructor(props) {
    super(props);
    const { value:{color,size,fabric,stock}} = props;
    this.state = {
      color: color || '',
      size: size || '',
      fabric: fabric || '',
      stock: stock || 0
    };
  }

  handleCurrencyChange = (currency) => {
    this.setState({ currency });
    this.set_currency_symbol(currency);
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue) => {
    const { symbol,...rest} = this.state;
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({ ...rest,...changedValue });
    }
  };

  render() {
    const {color,size,fabric,stock} = this.state;
    return (
      <span>
        <span>
          颜色&nbsp;:&nbsp;<Input
          placeholder="颜色"
          defaultValue={color}
          style={{ width:120,marginRight:15}}/>
        </span>
        <span>
          尺寸&nbsp;:&nbsp;<Input
          defaultValue={size}
          placeholder="尺寸" style={{ width:120,marginRight:15}}/>
        </span>
        <span>
          材质&nbsp;:&nbsp;<Input
          defaultValue={fabric}
          placeholder="材质" style={{ width:120,marginRight:15}}/>
        </span>
        <span>
          库存&nbsp;:&nbsp;<InputNumber
            min={0}
            placeholder="库存"
            defaultValue={stock}
            style={{ width:'120px'}} />
        </span>
      </span>
    );
  }
}

export default SKUInput
