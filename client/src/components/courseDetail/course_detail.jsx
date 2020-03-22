import React, { Component } from 'react';

import {Card, Avatar, Row, Col, Collapse, Table, Icon, Progress, Rate, Button} from 'antd';
import axios from "axios";
import Bar3D from './course_Bar3D';
import WordCloud from './course_WordCloud';


export default class CourseDetail extends Component {

    constructor (props) {
        super(props);
        this.state = {
            teaches: '',
            current: 1,
            name: props.location.state.name,
            description: props.location.state.description,
        };
        console.log(props)
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/list-teaches`,{
            params: {
                course_name: this.state.name,
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
    };

    render() {
        const {teaches} = this.state;
        var tableData = [];
        for(var item in teaches){
            var temp = {};
            temp['key']=item;
            temp['credits']=teaches[item]['course']['credits'];
            temp['sectionNumber']=teaches[item]['course']['sectionNumber'];
            temp['faculty_name']=teaches[item]['faculty']['name'];
            temp['semester']=teaches[item]['semester'];

            tableData.push(temp);
            temp = {};
        }

        const columns = [
            { title: 'semester', dataIndex: 'semester', key: 'semester'},
            { title: 'credits', dataIndex: 'credits', key: 'credits'},
            { title: 'sectionNumber', dataIndex: 'sectionNumber', key: 'sectionNumber' },
            { title: 'faculty_name', dataIndex: 'faculty_name', key: 'faculty_name'},
        ];

        return (
            <div>
                <div>
                    <Row gutter={16}>
                        <Col md={24}>
                            {/*<Card*/}
                            {/*    style={{marginBottom: 24, marginLeft: 6, marginRight: 6}}*/}
                            {/*    bodyStyle={{padding: 0}}>*/}
                            <h1 style={{marginTop: 30, fontSize: 30}}>{this.state.name}</h1>
                            <hr/>
                            <p style={{fontSize: 20}}>
                                {this.state.description}
                            </p>

                            {/*</Card>*/}
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
                                <Bar3D/>
                        </Col>
                        <Col md={24} style={{width: 530}}>
                                <WordCloud/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
