import React from 'react';
import axios from 'axios';
import {Table, Button, Icon, Input, Col, Cascader, Row} from "antd";
import semester from '../../semester.json';
import Mock from "mockjs";
import AddTeachesComponent from "../TeachesForm/add_teaches";

Mock.mock('/semester', semester);
const InputGroup = Input.Group;
const semesterList = [];
var courseList = [];
var facultyList = [];
var sList = [];

export default class FreeFaculty extends React.Component{

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);

        this.state = {
            free_faculty: '',
            current: 1,
            selected_semester: '',
            visible: false
        };
    }

    componentDidMount(){
        courseList = [];
        axios.get('http://localhost:8000/list-course')
            .then(function (response) {
                response.data.map(function(res){
                    courseList.push({
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
    };

    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    addTeaches = name => {
        facultyList = [{value: name, label: name}];

        if ((this.state.selected_semester)&&(this.state.selected_semester.length != 0)){
            sList = [{value: this.state.selected_semester[0], label: this.state.selected_semester[0]}];
        } else {
            sList = semesterList;
        }

        this.setState({ visible: true });
    };

    semester_Select = (value) => {
        this.setState({
            selected_semester: value,
        });
    };

    search()  {
        axios.get(`http://127.0.0.1:8000/list-free-faculty`,{
            params: {
                semester: this.state.selected_semester[0]
            }
        }).then(res=>{
            console.log('res=>',res);
            this.setState({
                free_faculty: res.data,
                current: 1
            })
        },res=>{
            console.log('res=>',res);
        });
    };

    render(){

        const {free_faculty} = this.state;
        var tableData = [];
        for(var item in free_faculty){
            var temp = {};
            temp['key']=item;
            temp['research']=free_faculty[item]['research_area'];
            temp['name']=free_faculty[item]['name'];
            temp['email']=free_faculty[item]['email'];
            temp['operation']=<div>
                                <Button onClick={this.addTeaches.bind(this,free_faculty[item]["name"])}><Icon type="plus-square" /></Button>
                            </div>;
            tableData.push(temp);
            temp = {};
        }
        console.log(tableData);

        const columns = [
            { title: 'name', dataIndex: 'name', key: 'name' },
            { title: 'email', dataIndex: 'email', key: 'email'},
            { title: 'research areas', dataIndex: 'research', key: 'research' },
            { title: 'operation', dataIndex: 'operation', key: 'operation' }
        ];

        if(!free_faculty) {
            return <h2>Loading...</h2>
        }
        return(
            <div>
                <Row gutter={16} className="A" style={{marginTop:'5px', marginBottom:'5px'}}>
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
                    pagination={{pageSize:2, onChange:this.onChange, current:this.state.current}}
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
                    semesterList={sList}
                />
            </div>
        )
    }

}
