let head_right = document.querySelectorAll(".head-right span");

setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    h = h < 10 ? '0' + h : h;
    let m = date.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = date.getSeconds();
    s = s < 10 ? '0' + s : s;
    head_right[0].innerHTML = h + ':' + m + ':' + s;

    let year = date.getFullYear();
    let Month = date.getMonth() + 1;
    Month = Month < 10 ? '0' + Month : Month;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    head_right[1].innerHTML = year + '年' + Month + '月' + day + '日';
}, 1000);

var mySwiper1 = new Swiper('.mySwiper1', {
    autoplay: true, //可选选项，自动滑动
    loop: true,
    direction: 'vertical',
    height: 30,
});
var mySwiper2 = new Swiper('.mySwiper2', {
    speed: 50000,
    autoplay: {
        delay: 0,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        waitForTransition: true,
    },
    loop: true,
    slidesPerGroup: 20,
    slidesPerView: 4,
});
mySwiper2.el.onmouseover = function () {
    mySwiper2.autoplay.stop();
}

//左侧环形图表
$(function () {
    let main = document.querySelector("#main");
    let charts = echarts.init(main);

    let t = {
        tooltip: {
            formatter: "时长: {b}<br> 总计: {c} <br>占比: {d}%"
        },

        series: [{
            color: ['#fbff86', '#ff6f6f', '#ab6eff', '#1dd7ff', '#7dff89'],
            name: '停车时长',
            type: 'pie',
            radius: ["60%", "80%"],
            center: ['50%', '60%'],
            data: [{
                name: "30分钟以内",
                value: "12132"
            }, {
                name: "1小时以内",
                value: "12132"
            }, {
                name: "2小时以内",
                value: "9000"
            }, {
                name: "4小时以内",
                value: "9000"
            }, {
                name: "4小时以上",
                value: "9000"
            }]
        }]
    }
    charts.setOption(t);
});

$(function () {
    let map = document.querySelector(".map");
    let charts = echarts.init(map);
    let city = {
        "哈尔滨": [126.63, 45.75],
        "长春": [125.35, 43.88],
        "沈阳": [123.38, 41.8],
        "北京": [116.46, 39.92],
        "太原": [112.53, 37.87],
        "西安": [108.95, 34.27],
        "兰州": [103.73, 36.03],
        "乌鲁木齐": [87.68, 43.77],
        "拉萨": [91.11, 29.97],
        "成都": [104.06, 30.67],
        "贵阳": [106.71, 26.57],
        '金坛': [119.56, 31.74],
        '东营': [118.49, 37.46],
        '牡丹江': [129.58, 44.6],
        '遵义': [106.9, 27.7],
        '绍兴': [120.58, 30.01],
        '扬州': [119.42, 32.39],
        '常州': [119.95, 31.79],
        '潍坊': [119.1, 36.62],
    };
    let data = {
        "哈尔滨": 200,
        "长春": 180,
        "沈阳": 300,
        "北京": 800,
        "太原": 400,
        "西安": 500,
        "兰州": 200,
        "乌鲁木齐": 180,
        "拉萨": 150,
        "成都": 600,
        "贵阳": 700,
        '金坛': 234,
        '东营': 123,
        '牡丹江': 12,
        '遵义': 456,
        '绍兴': 789,
        '扬州': 789,
        '常州': 345,
        '潍坊': 234,
    }
    let m = {
        tooltip: {
            formatter: function (data) {
                return `<div class="box">
                <div class="modal">
                    <h2 class="modal-h">${data.name}</h2>
                    <div class="texts">今日收入</div>
                    <div class="moneys">6999</div>
                    <div class="car">
                        <div class="left">
                            <span>总车位</span>
                            <span>114</span>
                        </div>
                        <div class="right">
                            <span>空余</span>
                            <span>114</span>
                        </div>
                    </div>
                    <div class="bottom">
                        <div>本日进场 11983</div>
                        <div>本日出场 11232</div>
                    </div>
                </div>
            </div>`
            }
        },
        geo: {
            map: 'china',
            zoom: 5.5,
            layoutCenter: ['50%', '50%'],
            layoutSize: 100,
            itemStyle: {
                normal: {
                    areaColor: '#194e7c',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#52a8eb'
                }
            },
        },
        series: [{
                type: 'scatter',
                coordinateSystem: 'geo',
                data: up(),

                itemStyle: {
                    color: 'yellow',
                },
                // emphasis:{
                //     itemStyle:{
                //         color: 'red'
                //     }
                // }
            },
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: up().sort((a, b) => {
                    return a - b;

                }).splice(0, 5),
                // showEffectOn:'emphasis',
                hoverAnimation: true,
                itemStyle: {
                    color: '#23ecf9',
                },
                rippleEffect: {
                    color: '#4afef8',
                    scale: 2.5,
                    brushType: 'stroke'
                },
                symbolSize: 24,
            }
        ]
    }

    function up() {
        let arr = [];
        for (let i in data) {
            let a = {
                name: i,
                value: city[i].concat(data[i])
            }
            arr.push(a);
        }
        return arr;
    }
    charts.setOption(m);
});

$(function () {
    rightPark();

    function rightPark() {
        let rights = document.querySelector('#boxs1');
        let echart = echarts.init(rights);
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                top: 170,
                left: 'center',
                itemWidth: 5,
                textStyle: {
                    color: "#839bb0"
                },
                data: ['现金激费', '电子激费'],
            },
            series: [{
                color: ['#FFFFD1', '#FFCF43'],
                name: '激费类型',
                type: 'pie',
                radius: ['45%', '65%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 35,
                        name: '现金激费',
                        selected: true
                    },
                    {
                        value: 310,
                        name: '电子激费'
                    }
                ]
            }]
        }

        echart.setOption(option);
    }

});

$(function () {
    rightParks();

    function rightParks() {
        let rights = document.querySelector('#boxs2');
        let echarte = echarts.init(rights);
        let options = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                top: 170,
                left: 'center',
                itemWidth: 5,
                textStyle: {
                    color: "#839bb0"
                },
                data: ['现金激费', '电子激费'],
            },
            series: [{
                color: ['#CAF9FF', '#00ABFF'],
                name: '激费类型',
                type: 'pie',
                radius: ['45%', '65%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 35,
                        name: '现金激费',
                        selected: true
                    },
                    {
                        value: 310,
                        name: '电子激费'
                    }
                ]
            }]
        }
        echarte.setOption(options);
    }
});