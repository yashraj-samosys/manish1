import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { echartStyles } from '../../../shared/echart-styles';
import { HttpService } from 'src/app/shared/services/http.service';
import { ApiUrlService } from '../../../shared/services/apiUrl.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { CommonService } from '../../../shared/services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
    selector: 'app-dashboad-default',
    templateUrl: './dashboad-default.component.html',
    styleUrls: ['./dashboad-default.component.css']
})
export class DashboadDefaultComponent implements OnInit {
    chartLineOption1: EChartOption;
    chartLineOption2: EChartOption;
    chartLineOption3: EChartOption;
    salesChartBar: EChartOption;
    salesChartPie: EChartOption;
    count;
    type;
    id;
    authorized_id = 1;
    data;
    agentFsa;
    getPieChartData_agent;
    yearData;
    monthData;
    amountData;
    maxAmountData;
    intervalAmountData;
    monthAmount;
    weeKDataAmount;
    weekAmount;
    WeeK;
    WeekDayAmount;
    authorizedStatus;
    isMore = false;
    constructor(
        private http: HttpService,
        private apiUrl: ApiUrlService,
        private navService: NavigationService,
        public commmon: CommonService,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    async ngOnInit() {
        // this.getCounts();
        await this.getAgentAuthorizedStatus();
        this.type = localStorage.getItem("user_type");
        this.id = localStorage.getItem("user_id");
        this.getCounts();
        this.getFavoriteAgents();
        await this.getPieChart_agent();
        await this.getYearSubscription();
        await this.getMonthSubscription();
        await this.getWeekSubscriptions();
        if (this.type == "1" || this.type == "5") {
            this.chartLineOption1 = {
                ...echartStyles.lineFullWidth, ...{
                    series: [{
                        // data: [30, 40, 20, 50, 0],
                        // data:this.weeKDataAmount,
                        data: this.weeKDataAmount,
                        ...echartStyles.smoothLine,
                        markArea: {
                            label: {
                                show: true
                            }
                        },
                        areaStyle: {
                            color: 'rgba(102, 51, 153, .2)',
                            origin: 'start'
                        },
                        lineStyle: {
                            color: '#663399',
                        },
                        itemStyle: {
                            color: '#663399'
                        }
                    }]
                },
                xAxis: {
                    data: ['1W', '2W', '3W', '4W', '5W']
                }
            };

            this.chartLineOption2 = {
                ...echartStyles.lineFullWidth, ...{
                    series: [{
                        // data: [30, 10, 40, 10, 40, 20, 90],
                        // date: [0, 0, 0, 50, 20, 20, 0],
                        data: this.WeekDayAmount,
                        ...echartStyles.smoothLine,
                        markArea: {
                            label: {
                                show: true
                            }
                        },
                        areaStyle: {
                            color: 'rgba(255, 193, 7, 0.2)',
                            origin: 'start'
                        },
                        lineStyle: {
                            color: '#FFC107'
                        },
                        itemStyle: {
                            color: '#FFC107'
                        }
                    }]
                },
                xAxis: {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }

            };
            // this.chartLineOption2.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            // this.chartLineOption3 = {
            //     ...echartStyles.lineNoAxis, ...{
            //         series: [{
            //             data: [40, 80, 20, 90, 30, 80, 40, 90, 20, 80, 30, 45, 50, 110, 90, 145, 120, 135, 120, 140],
            //             lineStyle: {
            //                 color: 'rgba(102, 51, 153, 0.86)',
            //                 width: 3,
            //                 ...echartStyles.lineShadow
            //             },
            //             label: { show: true, color: '#212121' },
            //             type: 'line',
            //             smooth: true,
            //             itemStyle: {
            //                 borderColor: 'rgba(102, 51, 153, 1)'
            //             }
            //         }]
            //     }
            // };
            // this.chartLineOption3. .data = ['1', '2', '3', 'Thu', 'Fri', 'Sat', 'Sun'];
            this.salesChartBar = {
                legend: {
                    borderRadius: 0,
                    orient: 'horizontal',
                    x: 'right',
                    data: ['Online', 'Offline']
                },
                grid: {
                    left: '8px',
                    right: '8px',
                    bottom: '0',
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    backgroundColor: 'rgba(0, 0, 0, .8)'
                },
                xAxis: [{
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                    // data: this.monthData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '${value}'
                    },
                    min: 0,
                    // max: 100000,
                    // interval: 25000,
                    max: this.maxAmountData,
                    interval: this.intervalAmountData,
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        interval: 'auto'
                    }
                }

                ],

                series: [
                    //     {
                    //     name: 'Online',
                    //     data: [35000, 69000, 22500, 60000, 50000, 50000, 30000, 80000, 70000, 60000, 20000, 30005],
                    //     label: { show: false, color: '#0168c1' },
                    //     type: 'bar',
                    //     barGap: 0,
                    //     color: '#bcbbdd',
                    //     smooth: true,

                    // },
                    {
                        // name: 'Offline',
                        data: this.amountData,
                        // data: [45000, 82000, 35000, 93000, 71000, 89000, 49000, 91000, 80200, 86000, 35000, 40050],
                        label: { show: false, color: '#639' },
                        type: 'bar',
                        color: '#7569b3',
                        smooth: true
                    }

                ]
            };


        }


        if (this.type == "2") {
            let result = await this.commmon.getClientDetails(this.id);
            this.data = result['data'][0];
            this.agentFsa = result['data'][0].agentFsa[0];
            localStorage.setItem("fsa_id", this.agentFsa.id);
        }
    }

    async getPieChart_agent() {
        let result = await this.http.get(this.apiUrl.url.getPieChart_agent);
        this.getPieChartData_agent = result['data'];
        // console.log('piechart',this.getPieChartData_agent,'agent');
        this.pieChart();
    }
    getFavoriteAgentsData: any = [];
    async getFavoriteAgents() {
        let result = await this.http.get('getFavoriteAgents');
        this.getFavoriteAgentsData = result['data'];
        // console.log('getFavoriteAgentsData',this.getFavoriteAgentsData);
    }

    async getWeekSubscriptions() {
        let result = await this.http.get('getWeekSubscriptions');
        this.weekAmount = result['total'][0]?.amount;
        this.WeekDayAmount = result['amountDay'];
        // console.log(this.WeekDayAmount,'ddddd')
    }

    async getYearSubscription() {
        let result = await this.http.get('getYearSubscription');
        this.yearData = result['data'];
        this.monthData = result['month'];
        this.amountData = result['amount']
        // this.maxAmountData = this.amountData.max();
        this.maxAmountData = Math.max(...this.amountData)
        this.intervalAmountData = (this.maxAmountData / 4);
    }

    async getMonthSubscription() {
        let result = await this.http.get('getMonthSubscriptions');
        // console.log('result222',result)
        this.monthAmount = result['total'][0]?.amount;
        this.weeKDataAmount = result['weekAmount'];
        // console.log(this.weeKDataAmount,'ddddd')

    }





    async getCounts() {
        let response = await this.http.get(this.apiUrl.url.getCounts);
        this.count = response['data'][0];
        console.log('==================================', this.count)
    }
    // viewDefault_Agent(){
    //     this.router.navigate(['/users/list-client'])
    // }
    viewFSA() {
        // this.router.navigate(['/users/list-partner'])
        this.router.navigate(['/fsa/list'])
    }
    viewPartner_Agent() {
        // this.router.navigate(['/users/list-partner'])
        this.router.navigate(['/users/list-default-agent'])
    }
    viewPublic_User() {
        this.router.navigate(['/users/list-users'])
    }
    view_Request() {
        this.router.navigate(['/request/list-request'])
    }

    viewClient_agent() {
        this.router.navigate(['/users/list-client'])
    }

    pieChart() {
        // console.log(this.getPieChartData_agent)
        this.salesChartPie = {
            color: ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },

            xAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }

            ],
            yAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
            ],
            series: [{
                name: 'Agent',
                type: 'pie',
                radius: '75%',
                center: ['50%', '50%'],
                // data: this.pieChartData,
                data: this.getPieChartData_agent,
                // data: [{}],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        };
        // console.log(this.salesChartPie,'sales')
    }


    // async getAdvertisementList() {
    //          let response = await this.http.get(this.apiUrl.url.getAdvertisementList);
    //          this.count = response['data'][0];
    //      }


    async getAgentAuthorizedStatus() {
        let result = await this.http.post(this.apiUrl.url.getAgentAuthorizedStatus, {id: this.authorized_id});
         this.authorizedStatus = result['data'][0];
        //  if(!result['data'][0]) this.authorized_id = 0;
        // console.log(this.authorizedStatus,'result=getAgentAuthorizedStatus')
    }


    async ChangAgentAuthorizedStatus(data) {
        let result = await this.http.post(this.apiUrl.url.ChangAgentAuthorizedStatus + data.id, { agent_authorized: data.agent_authorized });
        console.log(result)
        if (result["status"]) {
            this.toastr.success(result["msg"], "", { timeOut: 2000 });
            this.getAgentAuthorizedStatus();
        } else this.toastr.error(result["msg"], "", { timeOut: 2000 });
        // this.agentData = data;
    }


}
