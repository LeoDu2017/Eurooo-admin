import { InputNumber,Select } from 'antd';
const Option = Select.Option;

class PriceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 0,
      currency: '0',
      symbol:'￥'
    };
  }
  set_currency_symbol = (currency) => {
    let symbol = '';
    switch (currency) {
      case '0':
        symbol = '￥';
        break;
      case '1':
        symbol = '$';
        break;
      case '2':
        symbol = '€';
        break;
    }
    this.setState({ symbol })
  };
  handleNumberChange = (sum) => {
    this.setState({ sum });
    this.triggerChange({ sum });
  };

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
        <InputNumber
          min={0}
          defaultValue={ state.sum }
          onChange={ this.handleNumberChange }
          style={{ width:'120px',marginRight: 10 }}
          parser={ value => {
            switch (this.state.currency) {
              case '0':
                return value.replace(/￥\s?|(,*)/g, '');
              case '1':
                return value.replace(/\$\s?|(,*)/g, '');
              case '2':
                return value.replace(/€\s?|(,*)/g, '');
            }
          } }
          formatter={ value => `${state.symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') } />
        <Select
          style={{ width: 100 }}
          defaultValue={ state.currency }
          onChange={ this.handleCurrencyChange }>
          <Option value="0">RMB</Option>
          <Option value="1">Dollar</Option>
          <Option value="2">Euro</Option>
        </Select>
      </span>
    );
  }
}

export default PriceInput
