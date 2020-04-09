import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-wordcloud';

class WordCloud extends Component{

    getOption = (data) => {
        const option = {
            title: {
                text: 'Research areas',
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
                sizeRange: [20, 20],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 20
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
                data: data
            }]
        };

        return option;
    };

    render(){
        const { data } = this.props;
        var d = [];
        for(var i in data){
            d.push({name: data[i], value: 1})
        }
        console.log(d);

        return (
            <ReactEcharts
                option={this.getOption(d)}
                style={{height: '500px', width: '100%'}}
            />
        );
    }
};

export default WordCloud;
