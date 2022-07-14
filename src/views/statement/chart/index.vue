<template>
  <div class="grid grid-flow-col grid-cols-2 grid-rows-2 gap-4">
    <div id="chart_pie" class="h-80 p-5 bg-white rounded-md"></div>
    <div id="chart_line" class="h-80 p-5 bg-white rounded-md"></div>
    <div id="chart_bar" class="h-80 p-5 bg-white rounded-md"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as echartsAll from 'echarts'
import echarts from '@/plugins/echarts/line'
import type { EChartOption, EChartType } from '@/plugins/echarts/line'

const initPie = () => {
  const ele = document.getElementById('chart_pie') as HTMLElement
  const pieChart = echartsAll.init(ele)
  // 绘制图表
  pieChart.setOption({
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}
const initLine = () => {
  const ele = document.getElementById('chart_line') as HTMLElement
  const lineChart: EChartType = echarts.init(ele)
  // 绘制图表
  const option: EChartOption = {
    title: {
      // text: "折线图堆叠"
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }
  lineChart.setOption(option)
}
const initBar = () => {
  const ele = document.getElementById('chart_bar') as HTMLElement
  const barChart = echartsAll.init(ele)
  // 绘制图表
  barChart.setOption({
    title: {
      text: '柱状图示例'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  })
}

onMounted(() => {
  initPie()
  initLine()
  initBar()
})
</script>
