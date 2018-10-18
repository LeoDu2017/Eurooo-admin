import { Select } from 'antd';

const Option = Select.Option;

class ClassSelecte extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.setProductClassifications(Number(value),false);
  }
  setProductClassifications = (value,set) => {
    const { ProductClassifications,onChange } = this.props;
    let secondClass=[],
        thirdClass=[],
        firstID=null,
        secondID=null,
        thirdID=null;

    ProductClassifications.filter(item =>{
      if (Number(item.id) === value){
        const { children,...reset } = item;
        firstID     = reset.id;
        secondID    = children[0].id;
        secondClass = children;
        thirdID     = children[0].subChildren[0].id;
        thirdClass  = children[0].subChildren;
      }else{
        item.children.filter(i => {
          if (Number(i.id) === value){
            const { children,...reset } = item;
            const { subChildren,...r } = i;
            firstID       = reset.id;
            secondID      = r.id;
            secondClass   = children;
            thirdID       = subChildren[0].id;
            thirdClass    = subChildren;
          }else{
            i.subChildren.filter(ii => {
              if(Number(ii.id) === value){
                const { children,...reset } = item;
                const { subChildren,...r } = i;
                firstID     = reset.id;
                secondID    = r.id;
                secondClass = children;
                thirdID     = ii.id;
                thirdClass  = subChildren;
              }
            })
          }
        })
      }
    });
    set ? this.setState({
      firstClass:ProductClassifications,
      secondClass:secondClass,
      thirdClass:thirdClass,
      firstID:firstID,
      secondID:secondID,
      thirdID:thirdID,
      id:value
    }) : void(this.state = {
      firstClass:ProductClassifications,
      secondClass:secondClass,
      thirdClass:thirdClass,
      firstID:firstID,
      secondID:secondID,
      thirdID:thirdID,
      id:value
    });
    onChange(thirdID)
  };
  handleChange = (value) => {
    this.setProductClassifications(Number(value),true)
  };

  render() {
    const { firstClass, secondClass, thirdClass,firstID, secondID, thirdID } = this.state;
    return (
      <div>
        <Select
          defaultValue={ firstID }
          style={{ width: 120,marginRight:15 }}
          onChange={this.handleChange}>
          {firstClass.map(classification => <Option key={classification.id}>{classification.name}</Option>)}
        </Select>
        <Select
          value={ secondID }
          style={{ width: 120,marginRight:15 }}
          onChange={this.handleChange}>
          {secondClass.map(classification => <Option key={classification.id}>{classification.name}</Option>)}
        </Select>
        <Select
          value={ thirdID }
          style={{ width: 120 }}
          onChange={this.handleChange}>
          {thirdClass.map(classification => <Option key={classification.id}>{classification.name}</Option>)}
        </Select>
      </div>
    );
  }
}

export default ClassSelecte
