import { Input,InputNumber } from 'antd';
const { TextArea } = Input;

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
        配件名称 &nbsp;&nbsp;<Input placeholder="配件名称" style={{ width:234}}/>
        &nbsp;&nbsp;&nbsp;&nbsp;
        配件数量 &nbsp;&nbsp;<InputNumber min={0} placeholder="配件数量" style={{ width:100}}/>
        <br/>
        配件描述&nbsp;&nbsp;<TextArea placeholder="配件描述" style={{ width:420,marginLeft:4,marginTop:4}}/>
      </span>
    );
  }
}

export default SKUInput
