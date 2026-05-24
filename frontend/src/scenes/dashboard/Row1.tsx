import React, { useMemo } from 'react'
import { DashboardBox } from '@/components/DashboardBox'
import { useGetKpisQuery } from '../../states/api'
import { ResponsiveContainer, ComposedChart, Area, BarChart, Bar, CartesianGrid, Line, Legend, Tooltip, YAxis, AreaChart, XAxis } from "recharts"
import { useTheme } from '@mui/material'
import BoxHeader from '@/components/BoxHeader'

type Props = {}

const TEAL = '#00e5b0'
const PINK = '#ff3d7f'
const GRID = '#1a2f4a'
const TICK_COLOR = '#8ba3c7'

const Row1 = (props: Props) => {
    const { palette } = useTheme()
    const { data } = useGetKpisQuery();
    const revenue = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue }) => ({
                name: month.substring(0, 3),
                revenue: revenue.toFixed(2),
            }))
        );
    }, [data]);

    const revenueExpenses = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => ({
                name: month.substring(0, 3),
                revenue,
                expenses,
            }))
        );
    }, [data]);

    const revenueProfit = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => ({
                name: month.substring(0, 3),
                revenue,
                profit: (revenue - expenses).toFixed(2),
            }))
        );
    }, [data]);

    const tooltipStyle = { backgroundColor: '#0d1f35', border: '1px solid #1a2f4a', borderRadius: '8px' }
    const legendStyle = { color: TICK_COLOR, fontSize: '11px' }

    return <>
        <DashboardBox gridArea="b">
            <BoxHeader
                title="Revenue and Expenses"
                subtitle="top line represents revenue, bottom line represents expenses"
                sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%" style={{ flex: 1, minHeight: 0 }}>
                <AreaChart data={revenueExpenses} margin={{ top: 15, right: 25, left: -10, bottom: 60 }}>
                    <defs>
                        <linearGradient id="colorRevB" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={TEAL} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={TEAL} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpB" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={PINK} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={PINK} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke={GRID} strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} />
                    <YAxis tickLine={false} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} domain={[8000, 23000]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={legendStyle} />
                    <Area type="monotone" dataKey="revenue" stroke={TEAL} strokeWidth={2} fillOpacity={1} fill="url(#colorRevB)" />
                    <Area type="monotone" dataKey="expenses" stroke={PINK} strokeWidth={2} fillOpacity={1} fill="url(#colorExpB)" />
                </AreaChart>
            </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox gridArea="a">
            <BoxHeader
                title="Profit and Revenue"
                subtitle="top line represents revenue, bottom line represents profit"
                sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%" style={{ flex: 1, minHeight: 0 }}>
                <ComposedChart data={revenueProfit} margin={{ top: 20, right: 0, left: -10, bottom: 55 }}>
                    <defs>
                        <linearGradient id="colorRevA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={TEAL} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={TEAL} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
                    <XAxis dataKey="name" scale="band" tickLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} />
                    <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={legendStyle} />
                    <Area type="monotone" dataKey="revenue" stroke={TEAL} strokeWidth={2} fill="url(#colorRevA)" />
                    <Line type="monotone" dataKey="profit" stroke={PINK} strokeWidth={2} dot={false} />
                </ComposedChart>
            </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox gridArea="c">
            <BoxHeader
                title="Revenue Month by Month"
                subtitle="Chart represents the revenue by month"
                sideText="+4%"
            />
            <ResponsiveContainer width="100%" height="100%" style={{ flex: 1, minHeight: 0 }}>
                <BarChart data={revenue} margin={{ top: 17, right: 15, left: -5, bottom: 58 }}>
                    <defs>
                        <linearGradient id="colorBarRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={TEAL} stopOpacity={0.9} />
                            <stop offset="95%" stopColor={TEAL} stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke={GRID} strokeDasharray="3 3" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} tick={{ fill: TICK_COLOR }} />
                    <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} tick={{ fill: TICK_COLOR }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={legendStyle} />
                    <Bar dataKey="revenue" fill="url(#colorBarRev)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </DashboardBox>
    </>
}

export default Row1
