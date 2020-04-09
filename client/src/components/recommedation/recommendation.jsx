import React from 'react';
import axios from 'axios';
import {Table, Button, Input, Col, Row} from "antd";


const { TextArea } = Input;

export default class Recommendation extends React.Component{

    constructor(props) {
        super(props);

        this.search = this.search.bind(this);

        this.state = {
            description:'',
            label:'',
            facultyList:[]
        };
    }

    componentDidMount(){
        this.search()
    }


    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    onChangeDes = (value) => {
        this.setState({
            description: value.target.value,
        });
    };

    search()  {
        axios.get('http://localhost:8000/get-recommendation',{
            params: {
                description: this.state.description
            }
        }).then(res=>{
            console.log('res=>',res);
            this.setState({
                label: res.data['label'],
                facultyList: res.data['faculty']
            })
        }).catch(function (error) {
                console.log(error);
            });
    };

    render(){

        const {facultyList} = this.state;
        var tableData = [];
        for(var item in facultyList){
            var temp = {};
            temp['key']=item;
            temp['name']=facultyList[item];
            tableData.push(temp);
            temp = {};
        }
        console.log(tableData);

        const columns = [
            { title: 'name', dataIndex: 'name', key: 'name' },
        ];

        return(
            <div>
                <Row gutter={16} style={{marginTop:'20px', marginBottom:'5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Col sm={6} style={{width:600 ,paddingRight:100}}>
                        <h1 style={{fontSize:25,marginLeft:'20px'}}>Course Description</h1>
                        <TextArea  rows={15} placeholder="Please enter the course description" onChange={this.onChangeDes} style={{marginTop:'10px' ,marginLeft:'20px', marginBottom:'10px', width:'100%'}}/>
                        <Button type="primary" className="bt" size="large" onClick={this.search} style={{marginLeft:'20px', width:'100%'}}>
                            Get the recommended professors for this course !
                        </Button>
                    </Col>
                    <Col style={{width:750}}>
                        <h1 style={{fontSize:25, display: 'inline'}}>Resulting Label from the Model:&nbsp;</h1>
                        <h1 style={{fontSize:25, display: 'inline', color:'#40a9ff'}}>{this.state.label}</h1>
                        <Table
                            pagination={{pageSize:6, onChange:this.onChange, current:this.state.current}}
                            dataSource={tableData}
                            columns={columns}
                            showHeader={false}
                            bordered={true}
                            style={{marginTop:'10px'}}
                        />
                    </Col>

                </Row>
            </div>
        )
    }

}
