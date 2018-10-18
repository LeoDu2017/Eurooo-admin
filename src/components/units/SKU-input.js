import { InputNumber,Input } from 'antd';

class SKUInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 0
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
    const state = this.state;
    return (
      <span>
        <span>
          颜色&nbsp;:&nbsp;<Input placeholder="颜色" style={{ width:120,marginRight:15}}/>
        </span>
        <span>
          尺寸&nbsp;:&nbsp;<Input placeholder="尺寸" style={{ width:120,marginRight:15}}/>
        </span>
        <span>
          材质&nbsp;:&nbsp;<Input placeholder="材质" style={{ width:120,marginRight:15}}/>
        </span>
        <span>
          库存&nbsp;:&nbsp;<InputNumber
            min={0}
            placeholder="库存"
            // defaultValue={ state.sum }
            style={{ width:'120px'}} />
        </span>
      </span>
    );
  }
}

export default SKUInput
