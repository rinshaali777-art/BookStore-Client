import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faUser } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {ResponsiveContainer} from 'recharts'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { generateMockData, RechartsDevtools } from '@recharts/devtools';
import { Pie, PieChart} from 'recharts';
const data = generateMockData(6, 823);

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];


function Dashboard() {
  return (
    <>
      <AdminHeader />
      <div className='grid grid-cols-1 md:grid-cols-5'>
        <div className='md:col-span-1'>
          <Sidebar />

        </div>
        <div className='min-w-0 md:col-span-4'>
          <div className='p-3 sm:p-5'>
            <div className='flex gap-2'>
              <div className='flex min-h-28 w-full items-center justify-center gap-4 rounded bg-blue-600 p-4 sm:p-6'>
                <FontAwesomeIcon className='shrink-0 text-2xl sm:text-3xl' icon={faFile} style={{color: "rgb(0, 0, 0)",}} />
                <div>
                  <h3 className='text-base font-medium sm:text-lg'>Total Number of Books</h3>
                  <h3 className='text-xl font-bold sm:text-2xl'>100+</h3>
                </div>
              </div>
              <div className='flex min-h-28 w-full items-center justify-center gap-4 rounded bg-green-600 p-4 sm:p-6'>
                <FontAwesomeIcon className='shrink-0 text-2xl sm:text-3xl' icon={faUser} style={{color: "rgb(0, 0, 0)",}} />
                <div>
                  <h3 className='text-base font-medium sm:text-lg'>Total Number of Users</h3>
                  <h3 className='text-xl font-bold sm:text-2xl'>100+</h3>
                </div>
              </div>
              <div className='flex min-h-28 w-full items-center justify-center gap-4 rounded bg-yellow-600 p-4 sm:p-6'>
                <FontAwesomeIcon className='shrink-0 text-2xl sm:text-3xl' icon={faSearch} style={{color: "rgb(0, 0, 0)",}} />
                <div>
                  <h3 className='text-base font-medium sm:text-lg'>Total Number of Employess</h3>
                  <h3 className='text-xl font-bold sm:text-2xl'>100+</h3>
                </div>
              </div>

            </div>

          </div>
             {/* grid chart title */}
          <div className='md:grid grid-cols-2 p-5 mt-10'>
            <div className="font-bold">
              Book Purchase Ratio
            </div>
            <div className="font-bold">
              Growth Ratio(yearly)
            </div>
            </div>

             <div className='md:grid grid-cols-2 p-5 mt-10'>
            <div className="font-bold">
              {/* Book Purchase Ratio barchart */}
              <ResponsiveContainer width="100%" height={300}>
                 <BarChart responsive
                  data={data}
                   margin={{
                     top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5 }}>
                 <CartesianGrid />
                 <XAxis dataKey="label" />
                 <YAxis width="auto" />
                 <Tooltip />
                 <Legend />
                 <Bar dataKey="x" fill='red' radius={[10, 10, 0, 0]} />
                 <Bar dataKey="y" radius={[10, 10, 0, 0]} />
                 <RechartsDevtools />
                 </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="font-bold">
              {/* Growth Ratio(yearly) ratio piechart */}
              <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
                      data={data01}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius="50%"
                      fill="#8884d8"
                      stroke="white"
                      
                    />
                    <Pie
                      data={data02}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      fill="#82ca9d"
                      stroke="white"
                      label
                    />
                    {/* <Tooltip defaultIndex={defaultIndex} /> */}
                    <RechartsDevtools />
                  </PieChart>
                </ResponsiveContainer>
            </div>
            </div>


          </div>

         
            
           

          


        </div>
      

    </>
  )
}

export default Dashboard