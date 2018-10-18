import { Select } from 'antd';

const Option = Select.Option;

class ClassSelecte extends React.Component {
  constructor(props) {
    super(props);
    const { ProductClassifications,value } = props;
    this.setProductClassifications(ProductClassifications,Number(value),false);
  }
  setProductClassifications = (ProductClassifications,value,set) => {
    let secondClass=[],
        thirdClass=[],
        firstID=null,
        secondID=null,
        thirdID=null;

    ProductClassifications.filter(item =>{
      if (Number(item.id) === value){
        const { children,...reset } = item;
        secondClass = children;
        thirdClass = [];
        firstID = reset.id;
        secondID = children[0].id;
        thirdID = null;
      }else{
        item.children.filter(i => {
          if (Number(i.id) === value){
            const { children,...reset } = item;
            const { subChildren,...r } = i;
            secondClass = children;
            thirdClass = subChildren;
            firstID=reset.id;
            secondID=r.id;
            thirdID=subChildren[0].id
          }else{
            i.subChildren.filter(ii => {
              if(Number(ii.id) === value){
                const { children,...reset } = item;
                const { subChildren,...r } = i;
                secondClass = children;
                thirdClass = subChildren;
                firstID=reset.id;
                secondID=r.id;
                thirdID=ii.id;
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
    // console.log(this.state)
  };
  handleChange = (value) => {
    const { ProductClassifications } = this.props;
    this.setProductClassifications(ProductClassifications,Number(value),true);
  };

  render() {
    const { firstClass, secondClass, thirdClass,firstID, secondID, thirdID } = this.state;

    return (
      <div>
        <Select
          defaultValue={firstID}
          style={{ width: 120,marginRight:15 }}
          onChange={this.handleChange}>
          {
            firstClass.map(classification => {
              console.log('firstID:',firstID);
              return <Option key={classification.id}>{classification.name}</Option>
            })}
        </Select>
        <Select
          defaultValue={secondID}
          style={{ width: 120,marginRight:15 }}
          onChange={this.handleChange}>
          {secondClass.map(classification => {
            console.log('secondID:',classification.id);
            return <Option key={classification.id}>{classification.name}</Option>
          })}
        </Select>
        <Select
          defaultValue={thirdID}
          style={{ width: 120 }}
          onChange={this.handleChange}>
          {thirdClass.map(classification => <Option key={classification.id}>{classification.name}</Option>)}
        </Select>
      </div>
    );
  }
}

export default ClassSelecte
