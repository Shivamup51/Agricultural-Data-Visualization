import React, { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { Paper, Title } from "@mantine/core"

interface AgricultureData {
  Country: string
  Year: string
  "Crop Name": string
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number
}

interface CropYieldChartProps {
  data: AgricultureData[]
}

const CropYieldChart: React.FC<CropYieldChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      // Optimize data processing
      const cropData = new Map<string, number[]>()
      const dataLength = data.length
      
      // Single pass data processing
      for (let i = 0; i < dataLength; i++) {
        const item = data[i]
        const cropName = item["Crop Name"]
        const yield_ = +item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0
        
        if (!cropData.has(cropName)) {
          cropData.set(cropName, [])
        }
        cropData.get(cropName)!.push(yield_)
      }
      
      // More efficient average calculation
      const averageYields = Array.from(cropData.entries()).map(([crop, yields]) => ({
        crop,
        averageYield: yields.reduce((sum, y) => sum + y, 0) / yields.length
      }))
      
      // Define your custom color list
      const colorList = [
        "#FF8C00", // Orange
        "#FFD700", // Gold
        "#ADFF2F", // GreenYellow
        "#1E90FF", // DodgerBlue
        "#8A2BE2", // BlueViolet
        "#FF6347", // Tomato
        "#40E0D0", // Turquoise
        "#9ACD32", // YellowGreen
        "#8B0000", // DarkRed
        "#00FA9A", // MediumSpringGreen
      ]

      // Cache color calculations
      const colors = new Array(averageYields.length)
        .fill(0)
        .map((_, i) => colorList[i % colorList.length])

      const option = {
        title: {
          text: "Average Crop Yield (1950-2020)",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: averageYields.map((item) => item.crop),
          axisLabel: {
            rotate: 45,
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
          name: "Average Yield (Kg/Ha)",
          axisLabel: {
            formatter: (value: number) => `${value.toLocaleString()} Kg/Ha`
          }
        },
        series: [
          {
            name: "Average Yield",
            type: "bar",
            data: averageYields.map((item) => item.averageYield),
            itemStyle: {
              // Apply distinct colors to each bar
              color: (params: any) => {
                return colors[params.dataIndex] // Use the color based on the index of the crop
              },
              // Adding border radius to the bars
              BorderRadius: [10, 10, 0, 0],
            },
            emphasis: {
              itemStyle: {
                // Lighten the color on hover
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#1abc9c" },
                  { offset: 1, color: "#2ecc71" }
                ]),
              },
            },
          },
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
        },
      }

      chart.setOption(option)

      const handleResize = () => {
        chart.resize()
      }

      window.addEventListener("resize", handleResize)

      return () => {
        chart.dispose()
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [data])

  return (
    <Paper shadow="xs" p="md" mt="xl" style={{ borderRadius: '12px' }}>
      <Title order={2} mb="md" ta="center" mt="md" style={{ marginBottom: '20px', color: '#2c3e50' }}>
        Crop Yield Analysis
      </Title>
      <div ref={chartRef} style={{ width: "100%", height: "600px" }} />
    </Paper>
  )
}

export default CropYieldChart
