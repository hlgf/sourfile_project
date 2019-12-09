import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRoles } from '../../redux/action-creators.js'
const Item = Form.Item;
const Option = Select.Option;

@connect((state) => ({ roles: state.roles }), { getRoles })
@Form.create()
class AddUserForm extends Component {
  // 构造器
  constructor(props) {
    super(props)
    this.props.setAdd(this.props.form)
  }
  // 设置传入的数据的类型及是否是必须的
  static propTypes = {
    setAdd: PropTypes.func.isRequired
  }
  componentDidMount(){
    this.props.getRoles()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { roles } = this.props
    return (
      <Form>
        <Item label='用户名' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'username',
              {
                rules: [{ required: true, message: '请输入用户名' }],
              }
            )(
              <Input placeholder='请输入用户名' />
            )
          }
        </Item>
        <Item label='密码' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'password',
              {
                rules: [{ required: true, message: '请输入密码' }],
              }
            )(
              <Input placeholder='请输入密码' type='password' />
            )
          }
        </Item>
        <Item label='手机号' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'phone',
              {
                rules: [{ required: true, message: '请输入手机号' }],
              }
            )(
              <Input placeholder='请输入手机号' />
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'email',
              {
                rules: [{ required: true, message: '请输入邮箱' }],
              }
            )(
              <Input placeholder='请输入邮箱' />
            )
          }
        </Item>
        <Item label='角色' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'roleId',
              {
                rules: [{ required: true, message: '请选择分类' }],
              }
            )(
              <Select placeholder='请选择分类'>
                {
                  roles.map(role => {
                  return <Option key={role._id} value={role._id}>{role.name}</Option>
                  })
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddUserForm;