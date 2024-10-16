import { ArrowLeftOutlined, EditOutlined, LineOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '../hooks/useAxios'

function OrganizationMore() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [singleData, setSingleData] = useState({})


    useEffect(() => {
        useAxios().get(`/organization/${id}`).then(res => {
            setSingleData(res.data)
        })
    }, [])


    return (
        <div className='p-5'>
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center justify-between'>
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeftOutlined className='scale-[1.5]' />
                    </button>
                    <h2 className='font-bold text-[25px] pl-[15px]'>{singleData.companyName}</h2>
                </div>
                <Button icon={<EditOutlined />} size='large' type='primary' >Tahrirlash</Button>
            </div>
            <ul className='w-[50%] flex justify-around p-5 rounded-xl border-[2px] border-slate-600'>
                <li className='space-y-5'>
                    <li className='flex flex-col'>
                        <span className='text-[15px] text-slate-500'>ID</span>
                        <strong className='text-[22px]'>{singleData.id}</strong>
                    </li>
                    <li className='flex flex-col'>
                        <span className='text-[15px] text-slate-500'>Tashkilot nomi</span>
                        <strong className='text-[22px]'>{singleData.companyName}</strong>
                    </li>
                    <li className='flex flex-col'>
                        <span className='text-[15px] text-slate-500'>INN</span>
                        <strong className='text-[22px]'>{singleData.inn ? singleData.inn : <LineOutlined />}</strong>
                    </li>
                    <li className='flex flex-col'>
                        <span className='text-[15px] text-slate-500'>Holati</span>
                        <strong className='text-[22px]'>{singleData.status ? "Faol" : "Faol emas"}</strong>
                    </li>
                </li>
                <li className='space-y-5'>
                    <li className='flex flex-col'>
                        <span className='text-[15px] text-slate-500'>Viloyat nomi</span>
                        <strong className='text-[22px]'>{singleData.regionName}</strong>
                    </li>
                    <li className='flex flex-col'>
                        <span className='text-[15px] text-slate-500'>Manzil</span>
                        <strong className='text-[22px]'>{singleData.address}</strong>
                    </li>
                    <li className='flex flex-col'>
                        <span className='text-[15px] text-slate-500'>Tashkil etilgan vaqt</span>
                        <strong className='text-[22px]'>{singleData.createdAt}</strong>
                    </li>
                </li>
            </ul>
        </div>
    )
}

export default OrganizationMore