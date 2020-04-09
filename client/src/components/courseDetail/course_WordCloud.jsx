import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-wordcloud';

class WordCloud extends Component{

    getOption = (data) => {
        const option = {
            title: {
                text: 'Keywords of Course',
                x: 'center',
                textStyle: {
                    fontSize: 23
                }

            },
            tooltip: {
                show: true
            },
            series: [{
                type: 'wordCloud',
                //size: ['9%', '99%'],
                sizeRange: [20, 66],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: data ? data: []
            }]
        };

        return option;
    };

    render(){
        const { data } = this.props;

        return (
            <ReactEcharts
                option={this.getOption(data)}
                style={{height: '500px', width: '100%'}}
            />
        );
    }
};

export default WordCloud;
