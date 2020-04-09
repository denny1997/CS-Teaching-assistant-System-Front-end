import React, { Component } from 'react';

import {Row, Col, Table, Icon} from 'antd';
import axios from "axios";
import Bar3D from './faculty_Bar3D';
import WordCloud from './faculty_WordCloud';

export default class FacultyDetail extends Component {

    constructor (props) {
        super(props);
        this.state = {
            areas: [],
            teaches: '',
            current: 1,
            name: props.location.state.name,
            title: props.location.state.title,
            email: props.location.state.email,
        };
        console.log(props)
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/list-teaches`,{
            params: {
                course_name: '',
                faculty_name: this.state.name,
                semester: ''
            }
        }).then(res=>{
            console.log('res=>',res);
            this.setState({
                teaches: res.data,
                current: 1
            })
        },res=>{
            console.log('res=>',res);
        });

        axios.get(`http://127.0.0.1:8000/get-enroll-data-faculty`,{
            params: {
                faculty_name: this.state.name
            }
        }).then(res=>{
            console.log('res=>',res);
            this.setState({
                enrollData: res.data,
            })
        },res=>{
            console.log('res=>',res);
        });

        axios.get(`http://127.0.0.1:8000/get-area-data`,{
            params: {
                faculty_name: this.state.name
            }
        }).then(res=>{
            console.log('res=>',res);
            this.setState({
                areas: res.data,
            })
        },res=>{
            console.log('res=>',res);
        });
    };

    onChange = page => {
        this.setState({
            current: page,
        });
    };

    render() {
        const {teaches} = this.state;
        var tableData = [];
        for(var item in teaches){
            var temp = {};
            temp['key']=item;
            temp['credits']=teaches[item]['course']['credits'];
            temp['course_name']=teaches[item]['course']['name'];
            temp['title']=teaches[item]['course']['title'];
            temp['semester']=teaches[item]['semester'];

            tableData.push(temp);
            temp = {};
        }

        const columns = [
            { title: 'Semester', dataIndex: 'semester', key: 'semester'},
            { title: 'Course Code', dataIndex: 'course_name', key: 'course_name'},
            { title: 'Course Name', dataIndex: 'title', key: 'title'},
            { title: 'Credits', dataIndex: 'credits', key: 'credits'},
        ];

        var semester = ['2015-sp', '2015-fa', '2016-sp', '2016-fa', '2017-sp', '2017-fa', '2018-sp', '2018-fa', '2019-sp',]
        var course = [];
        var enroll = [];

        for (var i in this.state.enrollData) {
            if (!course.includes(this.state.enrollData[i]['classId']+"/"+this.state.enrollData[i]['name'])) {
                course.push(this.state.enrollData[i]['classId']+"/"+this.state.enrollData[i]['name'])
            }
        }

        for(i in course) {
            for (var s in semester) {
                var num = 0;
                for (var r in this.state.enrollData) {
                    if((course[i]==this.state.enrollData[r]['classId']+"/"+this.state.enrollData[r]['name'])&&(semester[s]==this.state.enrollData[r]['semester'])){
                        num += this.state.enrollData[r]['enrollNumber']
                    }
                }
                enroll.push([parseInt(i),parseInt(s),num]);
            }
        }

        console.log(enroll);

        var areas = this.state.areas;

        return (
            <div>
                <div>
                    <Row gutter={16}>
                        <Col md={24}>
                            <h1 style={{marginTop: 30, fontSize: 30}}>{this.state.name}</h1>
                            <hr/>
                            <p style={{fontSize: 20}}>
                                {this.state.title}
                            </p>
                            <p style={{fontSize: 15}}>
                                <Icon type="mail" style={{ fontSize: 13 ,paddingRight:10}} />
                                {this.state.email}
                            </p>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Table
                            pagination={{pageSize:2, onChange:this.onChange, current:this.state.current}}
                            dataSource={tableData}
                            columns={columns}
                            showHeader={true}
                            bordered={true}
                        />
                    </Row>
                    <Row>
                        <Col md={24} style={{width: 750}}>
                                <Bar3D
                                    semester={semester}
                                    course={course}
                                    data={enroll}
                                />
                        </Col>
                        <Col md={24} style={{width: 530}}>
                                <WordCloud
                                    data={areas}
                                />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
