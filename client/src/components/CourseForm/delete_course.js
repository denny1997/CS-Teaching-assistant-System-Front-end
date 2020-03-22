import React from "react";
import {Modal, Button, Input, Icon} from "antd";
import axios from "axios";

export default class DeleteCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
    }

    handleOk = () => {
        axios.get(`http://127.0.0.1:8000/delete-course`,{
            params: {
                course_id: this.state.id,
            }
        }).then(res=>{
            console.log('res=>',res);
            this.props.onOk(1);
            this.props.onClose();
        },res=>{
            console.log('res=>',res);
            this.props.onOk(0);
            this.props.onClose();
        });
    };

    render() {
        const { visible, id, onClose } = this.props;
        if(id !== this.state.id){
            this.setState({ id: id });
        }

        return (
            <Modal
                title="Delete a course"
                visible={visible}
                onOk={this.handleOk}
                onCancel={onClose}
            >
                <label>Are you sure to delete this course?</label>
            </Modal>
        );
    }
}