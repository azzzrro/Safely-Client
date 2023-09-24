import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

axiosInstance
export const AdminDashboard = () => {

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  const dataPie = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [adminData, setadminData] = useState(null)

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axiosInstance.get(`/driver/adminDashboard`);
  //     setadminData(data);
  //   };
  //   getData();
  // }, [])

  return (
    <>
      <div className="w-[81.5%] h-fit mx-auto my-[2.5rem] bg-teal-50 py-6 rounded-3xl drop-shadow-lg">
        <div className="w-[95%] mx-auto md:h-fit h-fit md:grid-cols-3  md:gap-8 grid  gap-5 ">
          <div className="bg-green-200  rounded-3xl md:grid-cols-1 grid grid-rows-5 gap-1 drop-shadow-xl">
            <div className=" row-span-2 flex items-center px-3">
              <h1 className="text-2xl font-medium">This month rides</h1>
            </div>
            <div className=" row-span-3 flex items-center justify-end">
              <h1 className="text-8xl px-2">999</h1>
            </div>
          </div>
          <div className="bg-green-200  rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
            <div className=" row-span-2 flex items-center px-3">
              <h1 className="text-2xl font-medium">Total Earnings</h1>
            </div>
            <div className=" row-span-3 flex items-center justify-end">
              <h1 className="text-8xl px-2">₹999</h1>
            </div>
          </div>
          <div className="bg-green-200  rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
            <div className=" row-span-2 flex items-center px-3">
              <h1 className="text-2xl font-medium">Total Rides</h1>
            </div>
            <div className=" row-span-3 flex items-center justify-end">
              <h1 className="text-8xl px-2 ">999</h1>
            </div>
          </div>
        </div>
        <div className="mt-16 md:grid-cols-2 md:gap-8 grid">
          <div>

            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
          <div>
            <h1 className="font-bold">PAYMENTS METHODS</h1>
            <PieChart width={400} height={220}>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex gap-5">
              <h1 className="text-green-500">Wallet Payment</h1>
              <h1 className="text-yellow-700">Cash in hand</h1>
              <h1 className="text-blue-700">Online Payment</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
