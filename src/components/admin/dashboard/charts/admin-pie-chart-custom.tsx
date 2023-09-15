// import "./styles.css";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, Sector } from "recharts";
import { ROUTES } from "src/api/routes";
import axiosInstance from "src/utils/axios";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const AdminPieChartWithCustomizedLabel = () => {
  const [responseData, setResponseData] = useState<any>([])
  const [colors, setColors] = useState<any>([])
  const [loading, setIsLoading] = useState<boolean>(true)
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`${ROUTES.GET.TYPE_WISE_USER_LIST}`)
      const { data } = res.data
      setResponseData(data)
      const colorList = data.map(() => {

        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
        return randomColor
      })
      setColors(colorList)

    } catch (err: any) {
        console.log(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
    {loading ?  <CircularProgress />: <PieChart width={300} height={300}>
      <Legend />
      <Tooltip />
      <Sector />
      <Pie
        data={responseData}
        cx={130}
        cy={130}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={130}
        fill="#8884d8"
        dataKey='value'
      >
        {responseData.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>}
    
    </>
    
  );
}

export default AdminPieChartWithCustomizedLabel
