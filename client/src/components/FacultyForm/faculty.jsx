import React from 'react';
import axios from 'axios';
import {Button, Icon, Table} from "antd";

import AddFacultyComponent from "./add_faculty";
import ModifyFacultyComponent from "./modify_faculty";
import DeleteFacultyComponent from "./delete_faculty";

export default class Faculties extends React.Component{

    state = {
        faculties:'',
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
        const url = `http://localhost:8000/list-faculty`;
        console.log("loading data...");
        let promise = axios.get(url);
        promise.then(response=>{
            console.log(response);
            const result = response.data;
            this.setState({
                faculties:result,
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

    addFaculty = () => {
        this.setState({ visible: true });
    };


    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    modify = item => {
        this.setState({ visibleModify: true });
        this.setState({ modifyData: item });
    };

    delete = id => {
        this.setState({ visibleDelete: true });
        this.setState({ deleteData: id });
    };

    render(){

        const {faculties} = this.state;
        var tableData = [];
        for(var item in faculties){
            var temp = {};
            temp['key']=item;
            temp['name']=faculties[item]['name'];
            temp['email']=faculties[item]['email'];
            temp['research']=faculties[item]['research_area'];
            temp['operation']=<div>
                                  <Button onClick={this.modify.bind(this,faculties[item])}><Icon type="edit" /></Button>
                                  <Button onClick={this.delete.bind(this,faculties[item]["id"])}><Icon type="delete" /></Button>
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

        if(!faculties) {
            return <h2>Loading...</h2>
        }
        return(
            <div>
                <Button onClick={this.addFaculty}><Icon type="plus-square" /></Button>
                <Table
                    pagination={{pageSize:2, onChange:this.onChange, current:this.state.current}}
                    dataSource={tableData}
                    columns={columns}
                    showHeader={true}
                    bordered={true}
                />
                <AddFacultyComponent
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                />
                <ModifyFacultyComponent
                    visible={this.state.visibleModify}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                    data={this.state.modifyData}
                />
                <DeleteFacultyComponent
                    visible={this.state.visibleDelete}
                    onOk={this.handleOk}
                    onClose={this.handleClose}
                    id={this.state.deleteData}
                />
            </div>
        )
    }

}
