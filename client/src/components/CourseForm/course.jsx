import React from 'react';
import axios from 'axios';
import {Table, Button, Icon} from "antd";

import AddCourseComponent from './add_course';
import ModifyCourseComponent from './modify_course';
import DeleteCourseComponent from './delete_course';

export default class Courses extends React.Component{

    state = {
        courses:'',
        current:1,
        visible:false,
        visibleModify:false,
        modifyData:'',
        visibleDelete:false,
        deleteData:''
    };

    componentDidMount(){
        console.log("componentDidMount---->");
        //axios发送请求
        const url = `http://localhost:8000/list-course`;
        console.log("loading data...");
        let promise = axios.get(url);
        promise.then(response=>{
            console.log(response);
            const result = response.data;
            this.setState({
                courses:result,
            })
        });
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

    addCourse = () => {
        this.setState({ visible: true });
    };

    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    modify = item => {
        // console.log(item);
        this.setState({ visibleModify: true });
        this.setState({ modifyData: item });
    };

    delete = id => {
        this.setState({ visibleDelete: true });
        this.setState({ deleteData: id });
    };

    routerTo = item => {
        this.props.history.push({
            pathname: `/app/archive/course_detail`,
            state: {
                name: item['name'],
                description: item['description']
            }
        })
    };

    render(){

        const {courses} = this.state;
        var tableData = [];
        for(var item in courses){
            var temp = {};
            temp['key']=item;
            temp['name']=<a onClick={this.routerTo.bind(this,courses[item])}>{courses[item]['name']}</a>;
            temp['credits']=courses[item]['credits'];
            temp['sectionNumber']=courses[item]['sectionNumber'];
            temp['operation']=<div>
                                   <Button onClick={this.modify.bind(this,courses[item])}><Icon type="edit" /></Button>
                                   <Button onClick={this.delete.bind(this,courses[item]["id"])}><Icon type="delete" /></Button>
                              </div>;
            temp['description']=courses[item]['description'];
            tableData.push(temp);
            temp = {};
        }
        console.log(tableData);

        const columns = [
            { title: 'name', dataIndex: 'name', key: 'name' },
            { title: 'credits', dataIndex: 'credits', key: 'credits'},
            { title: 'sectionNumber', dataIndex: 'sectionNumber', key: 'sectionNumber' },
            { title: 'operation', dataIndex: 'operation', key: 'operation' },
        ];

        if(!courses) {
            return <h2>Loading...</h2>
        }
        return(
            <div>
                <Button onClick={this.addCourse}><Icon type="plus-square" /></Button>
                <Table
                    pagination={{pageSize:2, onChange:this.onChange, current:this.state.current}}
                    columns={columns}
                    expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
                    dataSource={tableData}
                    showHeader={true}
                    bordered={true}

                    // onRowClick={
                    //     record => {
                    //         console.log(record);
                    //     }
                    // }
                />
                <AddCourseComponent
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                />
                <ModifyCourseComponent
                    visible={this.state.visibleModify}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                    data={this.state.modifyData}
                />
                <DeleteCourseComponent
                    visible={this.state.visibleDelete}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                    id={this.state.deleteData}
                />
            </div>
        )
    }

}
