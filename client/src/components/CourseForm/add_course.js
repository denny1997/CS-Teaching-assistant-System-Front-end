import React from "react";
import {Modal, Input, Icon} from "antd";
import axios from "axios";

export default class AddCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "" ,
            credits: "",
            title: "",
            description: ""
        };
    }

    handleOk = () => {
        let param = new URLSearchParams();
        param.append("name",this.state.name);
        param.append("credits",this.state.credits);
        param.append("title",this.state.title);
        param.append("description",this.state.description);

        axios.post(`http://127.0.0.1:8000/add-course`,param)
            .then(res=>{
                console.log('res=>',res);
                this.props.onOk(1);
                this.props.onClose();
            },res=>{
                console.log('res=>',res);
                this.props.onOk(0);
                this.props.onClose();
            });
        this.setState({
            name: "",
            credits: "",
            title: "",
            description: ""
        });
    };

    onChangeName = e => {
        this.setState({ name: e.target.value });
    };

    onChangeCredits = e => {
        this.setState({ credits: e.target.value });
    };

    onChangeTitle = e => {
        this.setState({ title: e.target.value });
    };

    onChangeDes = e => {
        this.setState({ description: e.target.value });
    };

    render() {
        const { visible, onClose } = this.props;

        return (
            <Modal
                title="Enter course information"
                visible={visible}
                onOk={this.handleOk}
                onCancel={onClose}
            >
                <Input style={{marginBottom:'0.25cm', marginTop:'0.5cm'}} prefix={<Icon type="book" style={{ fontSize: 13 }} />} placeholder="course name" onChange={this.onChangeName} value={this.state.name} required={true} />
                <Input style={{marginBottom:'0.25cm', marginTop:'0.25cm'}} prefix={<Icon type="tag" style={{ fontSize: 13 }} />} placeholder="course title" onChange={this.onChangeTitle} value={this.state.title} required={true} />
                <Input style={{marginBottom:'0.25cm', marginTop:'0.25cm'}} prefix={<Icon type="star" style={{ fontSize: 13 }} />} placeholder="course credits" onChange={this.onChangeCredits} value={this.state.credits} required={true} />
                <Input style={{marginBottom:'0.5cm', marginTop:'0.25cm'}} prefix={<Icon type="info-circle" style={{ fontSize: 13 }} />} placeholder="course description" onChange={this.onChangeDes} value={this.state.description} required={true} />
            </Modal>
        );
    }
}