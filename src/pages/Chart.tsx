import React from "react"
import { useParams } from "react-router-dom"
import { fetchCoinHistory } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";

export interface IHistorical{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

// Define chart options outside of the component for better readability

export default function Chart(){
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

  return (
    <div>
      <ReactApexChart
        type="line"
        series={[
          { 
            name: "Price", 
            data: data?.map((price) => price.close) 
          }
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
          },
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
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          },
          colors: ["#0fbcf9"],
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