import React, { useMemo } from 'react'
import { DashboardBox } from '@/components/DashboardBox'
import { useGetKpisQuery } from '../../states/api'
import { ResponsiveContainer, ComposedChart, Scatter, Area, BarChart, Bar, CartesianGrid, Line, Legend, LineChart, Tooltip, YAxis, AreaChart, XAxis } from "recharts"
import { useTheme } from '@mui/material'
import BoxHeader from '@/components/BoxHeader'

type Props = {}

const Row1 = (props: Props) => {
    const { palette } = useTheme()
    const { data } = useGetKpisQuery();
    const revenue = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue.toFixed(2),
                };
            })
        );
    }, [data]);

    const revenueExpenses = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses,
                };
            })
        );
    }, [data]);

    const revenueProfit = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    profit: (revenue - expenses).toFixed(2),
                };
            })
        );
    }, [data]);

    return <>
        <DashboardBox gridArea="b">
            <BoxHeader
                title="Revenue and Expenses"
                subtitle="top line represents revenue, bottom line represents expenses"
                sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={revenueExpenses}
                    margin={{
                        top: 15,
                        right: 25,
                        left: -10,
                        bottom: 60,
                    }}
                >
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor={palette.primary[300]}
                                stopOpacity={0.5}
                            />
                            <stop
                                offset="95%"
                                stopColor={palette.primary[300]}
                                stopOpacity={0}
                            />
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor={palette.primary[300]}
                                stopOpacity={0.5}
                            />
                            <stop
                                offset="95%"
                                stopColor={palette.primary[300]}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        style={{ fontSize: "10px" }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={{ strokeWidth: "0" }}
                        style={{ fontSize: "10px" }}
                        domain={[8000, 23000]}
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        dot={true}
                        stroke={palette.primary.main}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                    />
                    <Area
                        type="monotone"
                        dataKey="expenses"
                        dot={true}
                        stroke={palette.primary.main}
                        fillOpacity={1}
                        fill="url(#colorExpenses)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox gridArea="a">
            <BoxHeader
                title="Profit and Revenue"
                subtitle="top line represents revenue, bottom line represents expenses"
                sideText="+4%"
            />
            {/* <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={400}
                    data={revenueProfit}
                    margin={{
                        top: 20,
                        right: 0,
                        left: -10,
                        bottom: 55,
                    }}
                >
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        style={{ fontSize: "10px" }}
                    />
                    <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "10px" }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "10px" }}
                    />
                    <Tooltip />
                    <Legend
                        height={20}
                        wrapperStyle={{
                            margin: "0 0 10px 0",
                        }}
                    />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="profit"
                        stroke={palette.tertiary[500]}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke={palette.primary.main}
                    />
                </LineChart>
            </ResponsiveContainer> */}


            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={400}
                    data={revenueProfit}
                    margin={{
                        top: 20,
                        right: 0,
                        left: -10,
                        bottom: 55,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" />
                    {/* <Bar dataKey="pv" barSize={20} fill="#413ea0" /> */}
                    <Line type="monotone" dataKey="profit" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>


        </DashboardBox>
        <DashboardBox gridArea="c">
            <BoxHeader
                title="Revenue Month by Month"
                subtitle="Chart represent the revenue by month"
                sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={revenue}
                    margin={{
                        top: 17,
                        right: 15,
                        left: -5,
                        bottom: 58,
                    }}
                >
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor={palette.primary[300]}
                                stopOpacity={0.5}
                            />
                            <stop
                                offset="95%"
                                stopColor={palette.primary[300]}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} strokeDasharray="3 3" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                    <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                    <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="revenue" fill="#ffc658" />
                </BarChart>
            </ResponsiveContainer>



            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 17,
                        right: 15,
                        left: -6,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                    <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="uv" fill="#ffc658" />
                </BarChart>
            </ResponsiveContainer>
        </DashboardBox>
    </>
}

export default Row1