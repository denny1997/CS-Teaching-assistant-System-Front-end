import React, { Component } from 'react';
import '../../style/login.less';
import { Form, Icon, Input, Button, Checkbox, message, Spin } from 'antd';
const FormItem = Form.Item;

const login = [{
    username:'admin',
    password:'admin'
},{
    username:'try',
    password:'try'
}];

function PatchUser(values) {  //匹配用户
    const results = login.map(function(item){
        if(values.username === item.username && values.password === item.password){
            return 1;
        }else{
            return 0;
        }
    });
    return results.includes(1);
};

class NormalLoginForm extends Component {
    state = {
        isLoding:false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(PatchUser(values)){
                    this.setState({
                        isLoding: true,
                    });

                    localStorage.setItem('mspa_user',JSON.stringify(values));
                    message.success('login successed!'); //成功信息
                    let that = this;
                    setTimeout(function() { //延迟进入
                        that.props.history.push({pathname:'/login',state:values});
                    }, 2000);

                }else{
                    message.error('login failed!'); //失败信息
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.isLoding?<Spin size="large" className="loading" />:
            <div className="login">
                <div className="login-form">
                    <div style = {{textAlign : 'center', marginBottom:'0.5cm', marginTop:'0.5cm'}}>
                        <div className="login-name" style = {{fontSize:22}}>iMoive账号注册</div>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [{ required: true, message: '请再次输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="confirm" placeholder="确认密码" />
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom:'0'}}>
                            {/*<a className="login-form-forgot" href="" style={{float:'right'}}>忘记密码?</a>*/}
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                注册
                            </Button>
                            <a href="/login">我已经有账号，前往登录</a>
                        </FormItem>
                    </Form>
                    {/*<a className="githubUrl" href="https://github.com/zhaoyu69/antd-spa"> </a>*/}
                </div>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;