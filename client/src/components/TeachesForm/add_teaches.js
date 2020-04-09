import React from "react";
import {Modal, Input, Icon, Cascader} from "antd";
import axios from "axios";
const InputGroup = Input.Group;

function filter(inputValue, path) {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

export default class AddTeachesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course_name: "" ,
            faculty_name: "",
            semester: ""
        };
    }

    handleOk = () => {
        let param = new URLSearchParams();
        param.append("course_name",this.state.course_name);
        param.append("faculty_name",this.state.faculty_name);
        param.append("semester",this.state.semester);

        axios.post(`http://127.0.0.1:8000/add-teaches`,param)
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
            course_name: "" ,
            faculty_name: "",
            semester: ""
        });
    };

    onChangeCourse = e => {
        this.setState({ course_name: e });
    };

    onChangeFaculty = e => {
        this.setState({ faculty_name: e });
    };

    onChangeSemester = e => {
        this.setState({ semester: e });
    };

    render() {
        const { visible, onClose, courseList, facultyList, semesterList } = this.props;

        return (
            <Modal
                title="Enter teaching records"
                visible={visible}
                onOk={this.handleOk}
                onCancel={onClose}
            >
                <InputGroup style={{marginBottom:'0.25cm', marginTop:'0.5cm'}} prefix={<Icon type="book" style={{ fontSize: 13 }} />}>
                    <Cascader
                        size="large"
                        style={{ width: '100%'}}
                        placeholder="Choose course name"
                        options={courseList}
                        onChange={this.onChangeCourse}
                        value={this.state.course_name}
                        required={true}
                        showSearch={{filter}}
                    />
                </InputGroup>
                <InputGroup style={{marginBottom:'0.25cm', marginTop:'0.5cm'}} prefix={<Icon type="book" style={{ fontSize: 13 }} />}>
                    <Cascader
                        size="large"
                        style={{ width: '100%'}}
                        placeholder="Choose faculty name"
                        options={facultyList}
                        onChange={this.onChangeFaculty}
                        value={this.state.faculty_name}
                        required={true}
                        showSearch={{filter}}
                    />
                </InputGroup>
                <InputGroup style={{marginBottom:'0.25cm', marginTop:'0.5cm'}} prefix={<Icon type="book" style={{ fontSize: 13 }} />}>
                    <Cascader
                        size="large"
                        style={{ width: '100%'}}
                        placeholder="Choose a semester"
                        options={semesterList}
                        onChange={this.onChangeSemester}
                        value={this.state.semester}
                        required={true}
                    />
                </InputGroup>
            </Modal>
        );
    }
}