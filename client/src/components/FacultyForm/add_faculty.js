import React from "react";
import {Modal, Input, Icon} from "antd";
import axios from "axios";

export default class AddFacultyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "" ,
            email: "",
            title: ""
        };
    }

    handleOk = () => {
        let param = new URLSearchParams();
        param.append("name",this.state.name);
        param.append("email",this.state.email);
        param.append("title",this.state.title);

        axios.post(`http://127.0.0.1:8000/add-faculty`,param)
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
            email: "",
            title: ""
        });
    };

    onChangeName = e => {
        this.setState({ name: e.target.value });
    };

    onChangeEmail = e => {
        this.setState({ email: e.target.value });
    };

    onChangeTitle = e => {
        this.setState({ title: e.target.value });
    };

    render() {
        const { visible, onClose } = this.props;

        return (
            <Modal
                title="Enter faculty information"
                visible={visible}
                onOk={this.handleOk}
                onCancel={onClose}
            >
                <Input style={{marginBottom:'0.25cm', marginTop:'0.5cm'}} prefix={<Icon type="book" style={{ fontSize: 13 }} />} placeholder="faculty name" onChange={this.onChangeName} value={this.state.name} required={true} />
                <Input style={{marginBottom:'0.25cm', marginTop:'0.25cm'}} prefix={<Icon type="info-circle" style={{ fontSize: 13 }} />} placeholder="title" onChange={this.onChangeTitle} value={this.state.title} required={true} />
                <Input style={{marginBottom:'0.5cm', marginTop:'0.25cm'}} prefix={<Icon type="tag" style={{ fontSize: 13 }} />} placeholder="email" onChange={this.onChangeEmail} value={this.state.email} required={true} />
            </Modal>
        );
    }
}