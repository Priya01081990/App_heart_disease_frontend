import { Card, Grid } from "@mui/material"
import AdminPieChartWithCustomizedLabel from "./charts/admin-pie-chart-custom"
import AdminSimpleBarChart from "./charts/admin-simple-bar-chart"
import { useEffect, useState } from "react"
import { ROUTES } from "src/api/routes"
import axiosInstance from "src/utils/axios"
import AdminSimplePieChart from "./charts/admin-simple-pie-chart"
import AdminPieChartPaddingAngel from "./charts/admin-pie-chart-padding-angle"
import AdminAreaChart from "./charts/admin-area-chart"


const AdminDashboard = () => {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item sm={3} md={2} style={{ margin: '22px' }}>
                    <Card variant='outlined'>
                        <AdminPieChartWithCustomizedLabel />
                    </Card>
                </Grid>
                <Grid item sm={3} md={2} style={{ margin: '22px' }}>
                    <Card variant='outlined'>
                        <AdminSimpleBarChart />
                    </Card>
                </Grid>

                <Grid item sm={3} md={2} style={{ margin: '22px' }}>
                    <Card variant='outlined'>
                        <AdminAreaChart />
                    </Card>
                </Grid>

                <Grid item sm={3} md={2} style={{ margin: '22px' }}>
                    <Card variant='outlined'>
                        <AdminPieChartPaddingAngel />
                    </Card>
                </Grid>

            </div>
        </>
    )
}

export default AdminDashboard