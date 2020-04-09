import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import noMatch from './404';
import LOGO from '../../style/img/logo1.png'

import Courses from '../CourseForm/course'
import Faculties from '../FacultyForm/faculty'
import Teaches from '../TeachesForm/teaches'
import FreeFaculty from '../FreeFacultyForm/free_faculty'
import CourseDetail from '../courseDetail/course_detail'
import FacultyDetail from '../facultyDetail/faculty_detail'
import Recommendation from '../recommedation/recommendation'

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;

        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                            <Route exact path={'/app/archive/courses'} component={Courses} />
                            <Route exact path={'/app/archive/faculties'} component={Faculties} />
                            <Route exact path={'/app/teaches'} component={Teaches} />
                            <Route exact path={'/app/free'} component={FreeFaculty} />
                            <Route exact path={'/app/archive/course_detail'} component={CourseDetail} />
                            <Route exact path={'/app/archive/faculty_detail'} component={FacultyDetail} />
                            <Route exact path={'/app/recommendation'} component={Recommendation} />
                            <Route component={noMatch} />
                        </Switch>
                        <Footer style={{textAlign: 'center'}}>
                            <img src={LOGO} alt="LOGO" style={{marginRight:'10px'}}/>
                            University of Illinois Urbana-Champaign ©2020 Created by CS411 Group67
                        </Footer>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
