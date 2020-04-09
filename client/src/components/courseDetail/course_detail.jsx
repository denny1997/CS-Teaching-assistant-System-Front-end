import React, { Component } from 'react';

import {Row, Col, Table} from 'antd';
import axios from "axios";
import Bar3D from './course_Bar3D';
import WordCloud from './course_WordCloud';


export default class CourseDetail extends Component {

    constructor (props) {
        super(props);
        this.state = {
            keywords:'',
            enrollData: '',
            teaches: '',
            current: 1,
            name: props.location.state.name,
            title: props.location.state.title,
            description: props.location.state.description,
        };
        console.log(props)
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/list-teaches`,{
            params: {
                course_name: this.state.name+"/"+this.state.title,
                faculty_name: '',
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

        axios.get(`http://127.0.0.1:8000/get-enroll-data`,{
            params: {
                course_id: this.state.name.replace(/\s+/g,""),
                course_title: this.state.title
            }
        }).then(res=>{
            console.log('res=>',res);
            this.setState({
                enrollData: res.data,
            })
        },res=>{
            console.log('res=>',res);
        });

        axios.get(`http://127.0.0.1:8000/get-keywords-scores`,{
            params: {
                description: this.state.description
            }
        }).then(res=>{
            console.log('res=>',res);
            this.setState({
                keywords: res.data,
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
            temp['faculty_name']=teaches[item]['faculty']['name'];
            temp['semester']=teaches[item]['semester'];

            tableData.push(temp);
            temp = {};
        }

        const columns = [
            { title: 'Semester', dataIndex: 'semester', key: 'semester'},
            { title: 'Credits', dataIndex: 'credits', key: 'credits'},
            { title: 'Faculty Name', dataIndex: 'faculty_name', key: 'faculty_name'},
        ];

        var semester = ['2015-sp', '2015-fa', '2016-sp', '2016-fa', '2017-sp', '2017-fa', '2018-sp', '2018-fa', '2019-sp',]
        var instructor = [];
        var enroll = [];

        for (var i in this.state.enrollData) {
            if (!instructor.includes(this.state.enrollData[i]['instructor'])) {
                instructor.push(this.state.enrollData[i]['instructor'])
            }
        }

        for(i in instructor) {
            for (var s in semester) {
                var num = 0;
                for (var r in this.state.enrollData) {
                    if((instructor[i]==this.state.enrollData[r]['instructor'])&&(semester[s]==this.state.enrollData[r]['semester'])){
                        num += this.state.enrollData[r]['enrollNumber']
                    }
                }
                enroll.push([parseInt(i),parseInt(s),num]);
            }
        }

        console.log(enroll);

        var keywords = this.state.keywords;

        return (
            <div>
                <div>
                    <Row gutter={16}>
                        <Col md={24}>
                            <h1 style={{marginTop: 30, fontSize: 30}}>{this.state.name}/{this.state.title}</h1>
                            <hr/>
                            <p style={{fontSize: 20}}>
                                {this.state.description}
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
                                    instructor={instructor}
                                    data={enroll}
                                />
                        </Col>
                        <Col md={24} style={{width: 530}}>
                                <WordCloud
                                    data={keywords}
                                />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
