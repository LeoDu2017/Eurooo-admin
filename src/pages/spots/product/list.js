import {connect} from 'dva';

const ProductList = ({dispatch}) => (
  <div>
    商品列表
  </div>
);

function mapStateToProps(state){
  return{}
}

export default connect(mapStateToProps)(ProductList)
