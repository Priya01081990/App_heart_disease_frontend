// import "./styles.css";
import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];

// const data02 = [
//   { name: "Group A", value: 2400 },
//   { name: "Group B", value: 4567 },
//   { name: "Group C", value: 1398 },
//   { name: "Group D", value: 9800 },
//   { name: "Group E", value: 3908 },
//   { name: "Group F", value: 4800 }
// ];

 const AdminSimplePieChart =() => {
  return (
    <PieChart width={300} height={300}>
      <Legend />
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx={130}
        cy={130}
        outerRadius={130}
        fill="#8884d8"
        label
      />
      {/* <Pie
        dataKey="value"
        data={data02}
        cx={500}
        cy={200}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
      /> */}
      <Tooltip />
    </PieChart>
  );
}

export default AdminSimplePieChart
