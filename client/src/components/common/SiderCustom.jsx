import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import LOGO from '../../style/img/logo.png'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderCustom extends Component{
    constructor(props){
        super(props);
        const { collapsed }= props;
        this.state = {
            collapsed: collapsed,
            firstHide: true, //第一次先隐藏暴露的子菜单
            selectedKey: '', //选择的路径
            openKey: '', //打开的路径（选择的上一层）
        }
    }
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
        console.log(this.state.openKey);
        console.log(this.state.selectedKey);
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render(){
        const { collapsed, firstHide, openKey, selectedKey } = this.state;
        return(
            <Sider
            trigger={null}
            collapsed={collapsed}
            >
                <div className="logo" >
                    <img src={LOGO} alt="LOGO"/>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    openKeys={firstHide ? null : [openKey]}
                >

                    <SubMenu key={"/app/archive"}
                    title={<span><Icon type="area-chart" /><span>Archives</span></span>}
                    >
                        {/*<Menu.Item key={"/app/form"}>*/}
                        {/*    <Link to={"/app/form"}><Icon type="search" /><span>搜索电影</span></Link>*/}
                        {/*</Menu.Item>*/}
                        {/*<Menu.Item key={"/app/recommand"}>*/}
                        {/*    <Link to={"/app/recommand"}><Icon type="like" /><span>个性推荐</span></Link>*/}
                        {/*</Menu.Item>*/}
                        <Menu.Item key={"/app/archive/courses"}>
                            <Link to={"/app/archive/courses"}><Icon type="like" /><span>Courses</span></Link>
                        </Menu.Item>
                        <Menu.Item key={"/app/archive/faculties"}>
                            <Link to={"/app/archive/faculties"}><Icon type="like" /><span>Faculties</span></Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/app/teaches">
                        <Link to={'/app/teaches'}><Icon type="edit" /><span>Records</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/app/free">
                        <Link to={'/app/free'}><Icon type="edit" /><span>Free Faculties</span></Link>
                    </Menu.Item>

                    {/*<Menu.Item key="/app">*/}
                    {/*    <Link to={'/app'}><Icon type="edit" /><span>个人中心</span></Link>*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="/app/qa">*/}
                    {/*    <Link to={'/app/qa'}><Icon type="android" /><span>问答系统</span></Link>*/}
                    {/*</Menu.Item>*/}
                </Menu>
            </Sider>
        )
    }
}