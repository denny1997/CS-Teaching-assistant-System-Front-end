import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts';
import 'echarts-gl';

class Bar3D extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester: "",
            instructor: "",
            data: ""
        };
    }

    getOption = (semester, instructor, data) => {
        const option = {
            title: {
                text: 'Number of Enrollment',
                x: 'center',
                textStyle: {
                    fontSize: 23
                }

            },
            tooltip: {},
            visualMap: {
                max: 20,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            xAxis3D: {
                type: 'category',
                data: semester,
                axisTick:{
                    alignWithLabel:true
                },
                axisLabel:{
                    interval:0,
                    rotate:20,
                }
            },
            yAxis3D: {
                type: 'category',
                data: instructor
            },
            zAxis3D: {
                type: 'value'
            },
            grid3D: {
                boxWidth: 200,
                boxDepth: 80,
                light: {
                    main: {
                        intensity: 1.2
                    },
                    ambient: {
                        intensity: 0.3
                    }
                }
            },
            series: [{
                type: 'bar3D',
                data: data.map(function (item) {
                    return {
                        value: [item[1], item[0], item[2]]
                    }
                }),
                shading: 'color',

                label: {
                    show: false,
                    textStyle: {
                        fontSize: 16,
                        borderWidth: 1
                    }
                },

                itemStyle: {
                    opacity: 0.4
                },

                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: 20,
                            color: '#900'
                        }
                    },
                    itemStyle: {
                        color: '#900'
                    }
                }
            }]
        };
        return option;
    };
    render(){
        const { semester, instructor, data } = this.props;

        return(
            <ReactEcharts
                option={this.getOption(semester, instructor, data)}
                style={{height: '450px', width: '100%'}}
            />
        )
    }
}

export default Bar3D;
