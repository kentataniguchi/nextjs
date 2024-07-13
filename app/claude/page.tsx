"use client"

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlySalesDashboard = () => {
  const [data, setData] = useState([
    { date: '2024-01-01', visitors: 100, price: 1000 },
    { date: '2024-02-01', visitors: 120, price: 1100 },
    { date: '2024-03-01', visitors: 150, price: 1050 },
  ]);

  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: Number(value),
    };
    setData(newData);
  };

  const calculateSales = (visitors: number, price: number): number => visitors * price;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">月次売上ダッシュボード</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">売上推移グラフ</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="visitors" stroke="#8884d8" name="集客人数" />
            <Line yAxisId="right" type="monotone" dataKey="price" stroke="#82ca9d" name="単価" />
            <Line yAxisId="right" type="monotone" dataKey={(d: { visitors: number; price: number }) => calculateSales(d.visitors, d.price)} stroke="#ffc658" name="売上" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">データ入力</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">年月日</th>
                <th className="px-4 py-2 text-left">集客人数</th>
                <th className="px-4 py-2 text-left">単価</th>
                <th className="px-4 py-2 text-left">売上</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.date} className="border-t border-gray-300">
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="w-full px-2 py-1 border rounded"
                      value={row.visitors}
                      onChange={(e) => handleInputChange(index, 'visitors', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      className="w-full px-2 py-1 border rounded"
                      value={row.price}
                      onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2">{calculateSales(row.visitors, row.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesDashboard;
