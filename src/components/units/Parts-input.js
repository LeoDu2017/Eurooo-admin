class SKUInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {value:{name,amount,description},edit} = this.props;
    return (
      <span>
        配件名称 &nbsp;&nbsp;
        <input
          className="ant-input"
          value={name}
          placeholder="配件名称"
          onChange={(event) => edit('name',event.target.value)}
          style={{ width:438}}/>
        &nbsp;&nbsp;&nbsp;&nbsp;
        配件数量 &nbsp;&nbsp;
        <input
          type="number"
          className="ant-input"
          value={amount}
          min={0}
          placeholder="配件数量"
          onChange={(event) => edit('amount',event.target.value)}
          style={{ width:100}}/>
        <br/>
        配件描述&nbsp;&nbsp;
        <textarea
          className="ant-input"
          value={description}
          placeholder="配件描述"
          onChange={(event) => edit('description',event.target.value)}
          style={{ width:625,marginLeft:4,marginTop:4}}/>
      </span>
    );
  }
}

export default SKUInput
