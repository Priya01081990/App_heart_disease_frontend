//import "./styles.css";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import { ROUTES } from "src/api/routes";
import axiosInstance from "src/utils/axios";

const AdminAreaChart = () => {
    const [responseData, setResponseData] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`${ROUTES.GET.MONTH_WISE_USER_JOINED}`)
        const { data } = res.data
        setResponseData(data)
        
  
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
        {isLoading ? <CircularProgress /> : <AreaChart
            width={300}
            height={300}
            data={responseData}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="user" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>}
        </>
        
    );
}

export default AdminAreaChart
