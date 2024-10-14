import { MedicineBoxOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomSelect from '../components/CustomSelect'
import CustomTable from '../components/CustomTable'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import axios from 'axios'

function Organization() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Tashkilot nomi',
            dataIndex: 'companyName'
        },
        {
            title: 'INN',
            dataIndex: 'inn'
        },
        {
            title: 'Holati',
            dataIndex: 'status'
        },
        {
            title: 'Manzil',
            dataIndex: 'address'
        },
        {
            title: 'Yaratilgan vaqt',
            dataIndex: 'createdAt'
        },
        {
            title: 'Batafsil',
            dataIndex: 'action'
        },
    ];

    const [data, setData] = useState([
        {
            key: '1',
            id: 1,
            companyName: 'Apple Inc.',
            inn: '1234567890',
            status: 'Faol',
            address: 'Toshkent',
            createdAt: '2020-01-01',
            action: <div className='flex items-center gap-10'>
                <MoreOutlined className='rotate-[90deg] hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                <EditOutlined className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                <DeleteOutlined className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
            </div>
        }
    ]);

    const [isLoading, setIsLoading] = useState(false)

    const [regonId, setRegionId] = useState(null)
    const regionList = [
        {
            value: 1,
            label: "Toshkent shahar"
        },
        {
            value: 2,
            label: "Samarqand viloyati"
        },
        {
            value: 3,
            label: "Xorazm viloyati"
        },
        {
            value: 4,
            label: "Andijon viloyati"
        },
    ]


    useEffect(() => {
        axios.get("http://localhost:3000/organization").then(res => {
            setData(res.data.map(item => {
                item.action = <div className='flex items-center gap-10'>
                    <MoreOutlined className='rotate-[90deg] hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                    <EditOutlined className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                    <DeleteOutlined className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                </div>
                return item
            }))
        })
    })

    return (
        <div className='p-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='font-bold text-[25px]'>Tashkilotlar</h2>
                    <span className='text-[15px] pl-1 text-slate-400'>tashkilotlar(0)</span>
                </div>
                <Button icon={<MedicineBoxOutlined />} size='large' type='primary' >Qo'shish</Button>
            </div>
            <div className='flex mt-5 items-center space-x-5'>
                <Input className='w-[350px]' size='large' type='text' allowClear placeholder='Qidirish...' />
                <CustomSelect placeholder={"Tanlash..."} setChooseId={setRegionId} options={regionList} />
            </div>
            <div className='mt-5'>
                <CustomTable columns={columns} data={data} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Organization