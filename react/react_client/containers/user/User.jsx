import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'antd';
import dayjs from "dayjs";

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import { connect } from 'react-redux'
import { getUsers,deleteUser,addUser,getRoles } from '../../redux/action-creators.js'

@connect(state => ({ users: state.users ,roles:state.roles}), { getUsers,deleteUser,addUser,getRoles })
class User extends Component {
  // 状态数据
  state = {
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };
  componentDidMount() {
    // 获取用户信息
    this.props.getUsers()
    if(this.props.roles.length===0){
      this.props.getRoles()
    }
   
  }

  addUserFormRef = React.createRef();
  updateUserFormRef = React.createRef();

  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render:(id)=>{
        const result=this.props.roles.find(role=>{
         return role._id===id
        })
        return result?result.name:''
      }
    },
    {
      title: '操作',
      render: user => {
        return <div>
          <Button type="link" onClick={() => { this.updateUserShow(user) }}>修改密码</Button>
          <Button type="link" onClick={() => { this.delUser(user.username) }}>删除</Button>
        </div>
      }
    }
  ];
  // 删除
  delUser = (username) => {
    // 弹框,提示,是否确认删除
    Modal.confirm({
      title: '确认删除吗',
      okText: '确认',
      cancelText: '取消',
      // 箭头函数
      onOk: () => {
        // 删除操作
        this.props.deleteUser(username)
      }
    })
  }
  // 修改
  updateUserShow=(user)=>{
    this.user=user
    // 显示
    this.setState({
      isShowUpdateUserModal:true
    })
  }

  // 创建用户的回调函数
  addUser = () => {
    // 添加用户
    this.addForm.validateFields((err, values) => {
      if (!err) {
        const {username, password, phone, email, roleId}=values
        this.props.addUser({username, password, phone, email, roleId})
        this.addForm.resetFields() // 重置
        this.setState({
          isShowAddUserModal:false
        })
      }
    });
   };

  // 更新用户的回调函数
  updateUser = () => {

  };

  switchModal = (key, value) => {
   
    return () => {
      this.setState({
        [key]: value
      })
    }
  };
  showAdd=()=>{
    this.setState({
      isShowAddUserModal:true
    })
  }
  hideAdd=()=>{
    this.addForm.resetFields() // 重置
    this.setState({
      isShowAddUserModal:false
    })
  }

  render() {
    const { isShowAddUserModal, isShowUpdateUserModal } = this.state;
    const { users } = this.props
    return (
      <Card
        title={
          <Button type='primary' onClick={this.showAdd} >创建用户</Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />

        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.hideAdd}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm setAdd={form => this.addForm = form} />
        </Modal>

        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.switchModal('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm setUpdate={form => this.updateForm = form} />
        </Modal>

      </Card>
    )
  }
}
export default User;
