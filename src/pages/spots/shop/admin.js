import intl from 'react-intl-universal';
import { connect } from 'dva';
import { Table,Divider,Tag,Col,Button,Icon,Pagination } from 'antd';
import { deleteAdmin,createAdmin,editHandler,resetPassword,changePageHandel } from 'Actions/shop';

import UserModal from 'Components/modal/admin-info-form';

const adminTable = ({dispatch,shopAdmins,current,total}) => {
  const columns = [{
    title: intl.get('AVATAR'),
    dataIndex: 'avatar',
    key: 'avatar',
    render: (data,record) =><img width={26} src={data} alt={record.username}/>,
  },{
    title: intl.get('USERNAME'),
    dataIndex: 'username',
    key: 'username',
    render: text => <a href="javascript:">{text}</a>,
  }, {
    title: intl.get('NAME'),
    dataIndex: 'name',
    key: 'name',
  }, {
    title: intl.get('TITLE'),
    key: 'title',
    dataIndex: 'title',
    render: titles => (
      <span>
        {titles.split(',').map(title => <Tag color="blue" key={title}>{title}</Tag>)}
      </span>
    ),
  },{
    title: intl.get('CONTACT'),
    dataIndex: 'contactNumber',
    key: 'contactNumber',
    render: number => number.replace(/(^\d{3}|\d{4}\B)/g,"$1-")
  },{
    title: intl.get('ACCOUNTSTATUS'),
    dataIndex: 'userMode',
    key: 'userMode',
    render: model => model ? intl.get('INUSE') : intl.get('CLOSE')
  },{
    title: intl.get('AUTHORIZATION'),
    dataIndex: 'permissions',
    key: 'permissions',
    render: auth => auth ? intl.get('INAUTH') : intl.get('OUTAUTH')
  },{
    title: intl.get('ACTION'),
    key: 'action',
    render: (text, record) => (
      <span>
      <a href="javascript:" onClick={resetPassword.bind(null,dispatch,record.id)}>{intl.get('RESETPASSWORD')}</a>
      <Divider type="vertical" />
      <a href="javascript:" onClick={deleteAdmin.bind(null,dispatch,record.id)}>{intl.get('DELETE')}</a>
      <Divider type="vertical" />
      <UserModal record={record} add={false} id={record.id} onOk={editHandler.bind(null,dispatch,record.id)}>
        <a href="javascript:">
          {intl.get('EDIT')}
        </a>
      </UserModal>
    </span>
    ),
  }];
  return (
    <Col className='g-t-wrap'>
      <Col className='g-t-main'>
        <header className='g-t-header'>
          <span className='g-t-title'>
            {intl.get('SHOPADMIN')}
          </span>
          <UserModal record={{}} id={-1} add={true} onOk={createAdmin.bind(null,dispatch)}>
            <Button type='primary' size="small" htmlType="button">
              <Icon type="user-add" />
              {intl.get('ADD')}
            </Button>
          </UserModal>
        </header>
        <Col className="g-t-form-wrap">
          <Table
            columns={columns}
            dataSource={shopAdmins}
            pagination={{ hideOnSinglePage:true }}/>
        </Col>
        <footer className="g-t-footer">
          <Pagination
            current={current}
            total={total}
            pageSize={1}
            onChange={changePageHandel.bind(null,dispatch)}
          />
        </footer>
      </Col>
    </Col>
  )
};

function mapStateToProps(state){
  const  { shopAdmins,total,current } = state.admin;
  console.log(current);
  return { shopAdmins,total,current }
}

export default connect(mapStateToProps)(adminTable);
