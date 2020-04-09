import React from "react";
import {Modal, Input, Icon} from "antd";
import axios from "axios";

export default class ModifyFacultyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            title: ""
        };
    }

    handleOk = () => {
        let param = new URLSearchParams();
        param.append("id",this.state.id);
        param.append("name",this.state.name);
        param.append("email",this.state.email);
        param.append("title",this.state.title);

        axios.post(`http://127.0.0.1:8000/modify-faculty`,param)
            .then(res=>{
                console.log('res=>',res);
                this.props.onOk(1);
                this.props.onClose();
            },res=>{
                console.log('res=>',res);
                this.props.onOk(0);
                this.props.onClose();
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
        const { visible, data, onClose } = this.props;
        if(data.id !== this.state.id){
            this.setState({
                id: data.id,
                name: data.name,
                email: data.email,
                title: data.title,
            });
        }


        return (
            <Modal
                title="Modify faculty information"
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