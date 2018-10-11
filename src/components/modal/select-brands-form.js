import { connect }      from 'dva';
import { Modal,Steps }  from 'antd';
import { Component }    from 'react';
import {
  okHandler,
  hideModelHandler }    from 'Actions/common-modal';
import {
  saveMyBrands,
  nextStepHandler,
  selectBrandHandler }  from 'Actions/brand-select';
import Brands           from '../units/Brands-list';
import Selected         from '../units/Brands-selected';

const Step = Steps.Step;

class selectBrandsModal extends Component{
  onRef = (ref) => {
    this.child = ref
  };
  resetHandel = () => {
    const { onReset } = this.child;
    onReset()
  };
  onSelect = (changedVaule) => {
    const {dispatch} = this.props;
    selectBrandHandler(dispatch,changedVaule)
  };
  render(){
    const { dispatch,id,title,visible,onOk,currentStep,next } = this.props;
    const onOkHandler = () =>{
      if(currentStep === 1){
        //okHandler(dispatch,validateFields,callBack,id)
        saveMyBrands(dispatch,id);
        // okHandler(dispatch,null,null,id);

      }else{
        const nextStep = currentStep + 1;
        nextStepHandler(dispatch,nextStep)
      }
    };
    const onCancelHandler = () =>{
      if(currentStep === 0){
        hideModelHandler(dispatch,this.resetHandel.bind(this),id)
      }else{
        const nextStep = currentStep - 1;
        nextStepHandler(dispatch,nextStep)
      }
    };
    return(
      <span>
        <Modal
          width="1000px"
          title={ title }
          okButtonProps={{ disabled: !next }}
          okText = { currentStep < 1 ? '下一步' : '完成' }
          cancelText = { currentStep < 1 ? '取消' : '上一步' }
          visible={ visible[id] }
          onOk={ onOkHandler }
          onCancel={ onCancelHandler }>
            { currentStep === 0 && <Brands onRef={this.onRef} onSelect={ selectBrandHandler.bind(null,dispatch)}/> }
            { currentStep === 1 && <Selected onRef={this.onRef} onSelect={this.onSelect}/> }
        </Modal>
      </span>
    )
  }
}
function mapStateToProps(state){
  const { visible } = state.commonModal;
  const { currentStep,next } = state.brandSelect;
  return{ visible,currentStep,next }
}
export default connect(mapStateToProps)(selectBrandsModal);

