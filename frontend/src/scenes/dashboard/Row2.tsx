import BoxHeader from "@/components/BoxHeader"; "../../components"
import { DashboardBox } from "@/components/DashboardBox";
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
} from "recharts";


const Row2 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.tertiary[500]];
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProducsQuery();
    const operationalExpenses = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(
                ({ month, operationalExpenses, nonOperationalExpenses }) => {
                    return {
                        name: month.substring(0, 3),
                        "Operational Expenses": operationalExpenses,
                        "Non Operational Expenses": nonOperationalExpenses,
                    };
                }
            )
        );
    }, [operationalData]);

    const productExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price: price,
                    expense: expense,
                };
            })
        );
    }, [productData]);


    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader
                    title="Operational vs Non-Operational Expenses"
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={operationalExpenses}
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
                            orientation="left"
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
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="Non Operational Expenses"
                            stroke={palette.tertiary[500]}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="Operational Expenses"
                            stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="e">
                <BoxHeader title="Campaigns and Targets" sideText="+4%" />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    {/* <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <Pie
                            stroke="none"
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                    </PieChart> */}
                    <FlexBetween ml={3} mt={2} flexBasis="30%">
                        <PieChart width={200} height={200}>
                            <Pie
                                dataKey="value"
                                startAngle={180}
                                endAngle={0}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                        </PieChart>
                    </FlexBetween>

                    <Box ml="-0.7rem" flexBasis="30%" textAlign="center" alignContent="center" alignItems="center">
                        <Typography variant="h5">Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
                            83
                        </Typography>
                        <Typography variant="h6">
                            Finance goals of the campaign that is desired
                        </Typography>
                    </Box>
                    <Box flexBasis="30%" textAlign="center" alignContent="center" alignItems="center">
                        <Typography variant="h5">Losses in Revenue</Typography>
                        <Typography variant="h6">Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant="h5">
                            Profit Margins
                        </Typography>
                        <Typography variant="h6">
                            Margins are up by 30% from last month.
                        </Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="f">
                <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -10,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <ZAxis type="number" range={[20]} />
                        <Tooltip formatter={(v) => `$${v}`} />
                        <Scatter
                            name="Product Expense Ratio"
                            data={productExpenseData}
                            fill={palette.tertiary[500]}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    );
};

export default Row2;