import { MotionDashboardBox, itemVariants } from "@/components/DashboardBox"
import { useGetKpisQuery, useGetProducsQuery, useGetTransactionsQuery } from "../../states/api"
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import BoxHeader from "../../components/BoxHeader";

type Props = {}

const TEAL   = '#00e5b0'
const PINK   = '#ff3d7f'
const BLUE   = '#4dabf7'
const PURPLE = '#b47cfd'
const PIE_COLORS = [TEAL, PINK, BLUE, PURPLE]

const Row3 = () => {
    const { palette } = useTheme();

    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProducsQuery();
    const { data: transactionData } = useGetTransactionsQuery();

    const pieChartData = useMemo(() => {
        if (!kpiData) return [];
        return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => ({
            name: key,
            value: value as number,
        }));
    }, [kpiData]);

    const totalExpensesByCategory = useMemo(
        () => pieChartData.reduce((sum, d) => sum + d.value, 0),
        [pieChartData]
    );

    const RADIAN = Math.PI / 180;

    const renderOuterLabel = ({ cx, cy, midAngle, outerRadius, value, percent }: any) => {
        const radius = outerRadius + 22;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text
                x={x} y={y}
                fill="#8ba3c7"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={8}
            >
                {`${(value / 1000).toFixed(2)}K (${(percent * 100).toFixed(1)}%)`}
            </text>
        );
    };

    const renderCenterLabel = ({ viewBox }: any) => {
        const { cx, cy } = viewBox;
        const display = totalExpensesByCategory >= 1000
            ? `$${(totalExpensesByCategory / 1000).toFixed(1)}K`
            : `$${totalExpensesByCategory.toFixed(0)}`;
        return (
            <g>
                <text x={cx} y={cy - 8} textAnchor="middle" fill="#8ba3c7" fontSize={9}>Total</text>
                <text x={cx} y={cy + 10} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight="bold">
                    {display}
                </text>
            </g>
        );
    };

    const gridSx = {
        "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` },
        "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` },
        "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
        "& .MuiDataGrid-filler": { backgroundColor: 'transparent' },
    };

    const productColumns = [
        { field: "_id", headerName: "id", flex: 1 },
        { field: "expense", headerName: "Expense", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value}` },
        { field: "price", headerName: "Price", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value}` },
    ];

    const transactionColumns = [
        { field: "_id", headerName: "id", flex: 1 },
        { field: "buyer", headerName: "Buyer", flex: 0.67 },
        { field: "amount", headerName: "Amount", flex: 0.35, renderCell: (params: GridCellParams) => `$${params.value}` },
        { field: "productIds", headerName: "Count", flex: 0.1, renderCell: (params: GridCellParams) => (params.value as Array<string>) },
    ];

    return (
        <>
            <MotionDashboardBox variants={itemVariants} gridArea="g">
                <BoxHeader title="List of Products" sideText={`${productData?.length} products`} />
                <Box p="0 0.5rem" sx={{ ...gridSx, flex: 1, minHeight: 0, overflow: 'hidden' }}>
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                        sx={{ height: '100%' }}
                    />
                </Box>
            </MotionDashboardBox>

            <MotionDashboardBox variants={itemVariants} gridArea="h">
                <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
                <Box p="0 0.5rem" sx={{ ...gridSx, flex: 1, minHeight: 0, overflow: 'hidden' }}>
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionData || []}
                        columns={transactionColumns}
                        sx={{ height: '100%' }}
                    />
                </Box>
            </MotionDashboardBox>

            <MotionDashboardBox variants={itemVariants} gridArea="i">
                <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
                <ResponsiveContainer width="100%" height="100%" style={{ flex: 1, minHeight: 0 }}>
                    <PieChart margin={{ top: 20, right: 100, bottom: 20, left: 20 }}>
                        <Pie
                            data={pieChartData}
                            cx="38%"
                            cy="50%"
                            innerRadius="45%"
                            outerRadius="70%"
                            dataKey="value"
                            label={renderOuterLabel}
                            labelLine={false}
                        >
                            <Label content={renderCenterLabel} position="center" />
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => (
                                <span style={{ color: '#8ba3c7', fontSize: '11px' }}>{value}</span>
                            )}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0d1f35', border: '1px solid #1a2f4a', borderRadius: '8px' }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </MotionDashboardBox>
        </>
    );
};

export default Row3;
