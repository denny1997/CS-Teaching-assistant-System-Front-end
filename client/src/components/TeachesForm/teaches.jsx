import React from 'react';
import axios from 'axios';
import {Table, Button, Icon, Input, Col, Cascader, Row} from "antd";
import semester from '../../semester.json';
import Mock from "mockjs";
import AddTeachesComponent from './add_teaches'
import DeleteTeachesComponent from "./delete_teaches";

Mock.mock('/semester', semester);
const InputGroup = Input.Group;
const semesterList = [];
var courseList = [];
var facultyList = [];

function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

export default class Teaches extends React.Component{

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);

        this.state = {
            teaches: '',
            current: 1,
            visible: false,
            visibleDelete: false,
            deleteData: '',
            selected_course: '',
            selected_faculty: '',
            selected_semester: ''
        };
    }

    componentDidMount(){
        courseList = [];
        axios.get('http://localhost:8000/list-course')
            .then(function (response) {
                response.data.map(function(res){
                    courseList.push({
                        value: res.name+"/"+res.title,
                        label: res.name+"/"+res.title,
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        facultyList = [];
        axios.get('http://localhost:8000/list-faculty')
            .then(function (response) {
                response.data.map(function(res){
                    facultyList.push({
                        value: res.name,
                        label: res.name
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        if(semesterList[0] === undefined){
            axios.get('/semester')
                .then(function (response) {
                    response.data.map(function(res){
                        semesterList.push({
                            value: res.semester,
                            label: res.semester
                        })
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        this.search();
    }

    handleOk = v => {
        console.log(v);
        if(v === 0){
            alert("Operation failed!!");
        }
        this.componentDidMount();
    };

    handleClose = () => {
        this.setState({ visible: false });
        this.setState({ visibleModify: false });
        this.setState({ visibleDelete: false });
    };

    addTeaches = () => {
        this.setState({ visible: true });
    };

    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    delete = id => {
        this.setState({ visibleDelete: true });
        this.setState({ deleteData: id });
    };

    course_Select = (value) => {
        this.setState({
            selected_course: value,
        });
    };

    faculty_Select = (value) => {
        this.setState({
            selected_faculty: value,
        });
    };

    semester_Select = (value) => {
        this.setState({
            selected_semester: value,
        });
    };

    search()  {
        console.log(this.state.selected_course);
        axios.get(`http://127.0.0.1:8000/list-teaches`,{
            params: {
                course_name: this.state.selected_course[0],
                faculty_name: this.state.selected_faculty[0],
                semester: this.state.selected_semester[0]
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

    routerToCourse = item => {
        this.props.history.push({
            pathname: `/app/archive/course_detail`,
            state: {
                name: item['name'],
                title: item['title'],
                description: item['description']
            }
        })
    };

    routerToFaculty = item => {
        this.props.history.push({
            pathname: `/app/archive/faculty_detail`,
            state: {
                name: item['name'],
                title: item['title'],
                email: item['email']
            }
        })
    };

    render(){

        const {teaches} = this.state;
        console.log(teaches)
        var tableData = [];
        for(var item in teaches){
            var temp = {};
            temp['key']=item;
            temp['course_name']=<a onClick={this.routerToCourse.bind(this,teaches[item]['course'])}>{teaches[item]['course']['name']}</a>;
            temp['credits']=teaches[item]['course']['credits'];
            temp['title']=teaches[item]['course']['title'];
            temp['faculty_name']=<a onClick={this.routerToFaculty.bind(this,teaches[item]['faculty'])}>{teaches[item]['faculty']['name']}</a>;
            temp['semester']=teaches[item]['semester'];
            temp['operation']=<div>
                                <Button onClick={this.delete.bind(this,teaches[item]["id"])}><Icon type="delete" /></Button>
                            </div>;
            tableData.push(temp);
            temp = {};
        }
        console.log(tableData);

        const columns = [
            { title: 'Course Code', dataIndex: 'course_name', key: 'course_name' },
            { title: 'Course Name', dataIndex: 'title', key: 'title' },
            { title: 'Credits', dataIndex: 'credits', key: 'credits'},
            { title: 'Faculty Name', dataIndex: 'faculty_name', key: 'faculty_name'},
            { title: 'Semester', dataIndex: 'semester', key: 'semester'},
            { title: 'Operation', dataIndex: 'operation', key: 'operation' },
        ];

        if(!teaches) {
            return <h2>Loading...</h2>
        }
        return(
            <div>
                <Row>
                    <Button onClick={this.addTeaches}><Icon type="plus-square" /></Button>
                </Row>
                <Row gutter={16} style={{marginTop:'5px', marginBottom:'5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Col sm={6} >
                        <InputGroup compact>
                            <Cascader
                                size="large"
                                style={{ width: '100%'}}
                                placeholder="Choose course name"
                                options={courseList}
                                onChange={this.course_Select}
                                value={this.state.selected_course}
                                showSearch={{filter}}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={6} >
                        <InputGroup compact>
                            <Cascader
                                size="large"
                                style={{ width: '100%'}}
                                placeholder="Choose faculty name"
                                options={facultyList}
                                onChange={this.faculty_Select}
                                value={this.state.selected_faculty}
                                showSearch={{filter}}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={6} >
                        <InputGroup compact>
                            <Cascader
                                size="large"
                                style={{ width: '100%'}}
                                placeholder="Choose a semester"
                                options={semesterList}
                                onChange={this.semester_Select}
                                value={this.state.selected_semester}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Button type="primary" className="bt" size="large" onClick={this.search} style={{marginLeft:'10px', width:'100%'}}>
                            <Icon type="search" />
                        </Button>
                    </Col>

                </Row>
                <Table
                    pagination={{pageSize:6, onChange:this.onChange, current:this.state.current}}
                    dataSource={tableData}
                    columns={columns}
                    showHeader={true}
                    bordered={true}
                />
                <AddTeachesComponent
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                    courseList={courseList}
                    facultyList={facultyList}
                    semesterList={semesterList}
                />
                <DeleteTeachesComponent
                    visible={this.state.visibleDelete}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                    id={this.state.deleteData}
                />
            </div>
        )
    }

}
