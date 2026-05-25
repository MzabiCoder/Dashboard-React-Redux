import BoxHeader from "@/components/BoxHeader";
import { MotionDashboardBox, itemVariants } from "@/components/DashboardBox";
import { FlexBetween } from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProducsQuery } from "../../states/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
    Tooltip,
    CartesianGrid,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Line,
    PieChart,
    Pie,
    ScatterChart,
    Scatter,
    ZAxis,
    Cell,
} from "recharts";

const TEAL = '#00e5b0'
const PINK = '#ff3d7f'
const BLUE = '#4dabf7'
const GRID = '#1a2f4a'
const TICK_COLOR = '#8ba3c7'

const Row2 = () => {
    const { palette } = useTheme();
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProducsQuery();

    const operationalExpenses = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => ({
                name: month.substring(0, 3),
                "Operational Expenses": operationalExpenses,
                "Non Operational Expenses": nonOperationalExpenses,
            }))
        );
    }, [operationalData]);

    const productExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map(({ _id, price, expense }) => ({ id: _id, price, expense }))
        );
    }, [productData]);

    const pieData = [
        { name: 'Savings', value: 400 },
        { name: 'Investments', value: 300 },
        { name: 'Other', value: 200 },
    ];
    const pieColors = [TEAL, PINK, BLUE];
    const tooltipStyle = { backgroundColor: '#0d1f35', border: '1px solid #1a2f4a', borderRadius: '8px' }

    return (
        <>
            <MotionDashboardBox variants={itemVariants} gridArea="d">
                <BoxHeader title="Operational vs Non-Operational Expenses" sideText="+4%" />
                <ResponsiveContainer width="100%" height="100%" style={{ flex: 1, minHeight: 0 }}>
                    <LineChart data={operationalExpenses} margin={{ top: 20, right: 0, left: -10, bottom: 55 }}>
                        <CartesianGrid vertical={false} stroke={GRID} strokeDasharray="3 3" />
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} />
                        <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} />
                        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke={PINK} strokeWidth={2} dot={false} />
                        <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke={TEAL} strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </MotionDashboardBox>

            <MotionDashboardBox variants={itemVariants} gridArea="e">
                <BoxHeader title="Campaigns and Targets" sideText="+4%" />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem" sx={{ flex: 1, overflow: 'hidden' }}>
                    <FlexBetween ml={3} mt={2} flexBasis="30%">
                        <PieChart width={200} height={200}>
                            <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={80} label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                    </FlexBetween>
                    <Box ml="-0.7rem" flexBasis="30%" textAlign="center" alignContent="center" alignItems="center">
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={TEAL}>83</Typography>
                        <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
                    </Box>
                    <Box flexBasis="30%" textAlign="center" alignContent="center" alignItems="center">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant="h6">Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
                        <Typography variant="h6">Margins are up by 30% from last month.</Typography>
                    </Box>
                </FlexBetween>
            </MotionDashboardBox>

            <MotionDashboardBox variants={itemVariants} gridArea="f">
                <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
                <ResponsiveContainer width="100%" height="100%" style={{ flex: 1, minHeight: 0 }}>
                    <ScatterChart margin={{ top: 20, right: 25, bottom: 40, left: -10 }}>
                        <CartesianGrid stroke={GRID} strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="price" name="price" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} tickFormatter={(v) => `$${v}`} />
                        <YAxis type="number" dataKey="expense" name="expense" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} tick={{ fill: TICK_COLOR }} tickFormatter={(v) => `$${v}`} />
                        <ZAxis type="number" range={[20]} />
                        <Tooltip formatter={(v) => `$${v}`} contentStyle={tooltipStyle} />
                        <Scatter name="Product Expense Ratio" data={productExpenseData} fill={TEAL} />
                    </ScatterChart>
                </ResponsiveContainer>
            </MotionDashboardBox>
        </>
    );
};

export default Row2;
