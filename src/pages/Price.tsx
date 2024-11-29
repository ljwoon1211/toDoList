import { useQuery } from "@tanstack/react-query";
import React from "react"
import { useParams } from "react-router-dom";
import { IHistorical } from "./Chart";
import { fetchCoinHistory } from "../services/api";
import ReactApexChart from "react-apexcharts";
export default function Price(){
  const { coinId } = useParams<{ coinId: string }>();

  const { isLoading, data, error } = useQuery<IHistorical[]>({
    queryKey: ["ohlck",coinId], 
    queryFn: () => fetchCoinHistory(coinId),
    // refetchInterval: 10 * 1000  
  })

  if (isLoading) {
    return <p>Loading chart...</p>;
  }

  if (error) {
    return <p>Error loading data.</p>;
  }

  if (!data?.length) {
    return <p>No data available.</p>;
  }

  const series = [{
    name: "Price",
    data: data?.map(({ time_close, high, low, open, close }) => {
      return { 
        x: time_close, 
        y: [open,high, low,close] 
      };
    })
  }];

  return (
    <div>
      <ReactApexChart
        series={series}
        type="candlestick"
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 300,
            type: "candlestick",
            background: "transparent",
          },
          grid: { show: false },
          // stroke: {
          //   curve: "smooth",
          //   width: 4,
          // },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: "datetime",
            categories: data?.map((price) => price.time_close),
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#3C90EB',
                downward: '#DF7D46'
              }
            }
          },
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            },
          },
        }}
      />
    </div>
  );
}