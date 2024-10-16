import { LineOutlined, MedicineBoxOutlined } from '@ant-design/icons'
import { Button, Input, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomSelect from '../components/CustomSelect'
import CustomTable from '../components/CustomTable'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useAxios } from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'

function Organization() {
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'index'
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
            title: 'Filial',
            dataIndex: 'regionName'
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

    const [data, setData] = useState([]);

    const [regonId, setRegionId] = useState("")

    // SearchPart start
    function handleSeachChange(e){
        setIsLoading(true)
        if(e.target.value){
            const filteredData = data.filter(item => item.companyName ?  item.companyName.toLowerCase().includes(e.target.value.toLowerCase()) : "")
            setTimeout(() => {
                setData(filteredData)
                setIsLoading(false)
            },1000)
        }
        else{
            setTimeout(() => {
                setRefresh(!refresh)
            }, 1000)
        }
    }
    

    // SearchPart end

    const [isLoading, setIsLoading] = useState(false)
    const regionList = [
        {
            value: 1,
            label: "Toshkent shahar"
        },
        {
            value: 2,
            label: "Farg'ona viloyati"
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
        useAxios().get(`/organization?regionId=${regonId}`).then(res => {
            setIsLoading(false)
            setData(res.data.map((item, index) => {
                item.index = index + 1
                item.address = <Popover placement="top" content={item.address}><p className='text-ellipsis whitespace-nowrap overflow-hidden inline-block cursor-pointer w-[200px]'>{item.address}</p></Popover>
                item.inn = item.inn ? item.inn : <LineOutlined/>
                switch(item.status){
                    case "1":
                        item.status = "Faol"
                    break;
                    case "2":
                        item.status = "Faol emas";
                    break;
                    case "3":
                        item.status = "Jarayonda";
                    break;
                }
                item.action = <div className='flex items-center gap-10'>
                    <MoreOutlined onClick={() => navigate(`${item.id}`)} className='rotate-[90deg] hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                    <EditOutlined className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                    <DeleteOutlined className='hover:scale-[1.7] duration-300 cursor-pointer scale-[1.5]' />
                </div>
                return item
            }))
        })
    }, [refresh, regonId])

    return (
        <div className='p-5'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='font-bold text-[25px]'>Tashkilotlar</h2>
                    <span className='text-[15px] pl-1 text-slate-400'>tashkilotlar({data.length})</span>
                </div>
                <Button onClick={() => navigate("add")} icon={<MedicineBoxOutlined />} size='large' type='primary' >Qo'shish</Button>
            </div>
            <div className='flex mt-5 items-center space-x-5'>
                <Input onChange={handleSeachChange} className='w-[350px]' size='large' type='text' allowClear placeholder='Qidirish...' />
                <CustomSelect width={"350px"} setIsLoading={setIsLoading} placeholder={"Tanlash..."} setChooseId={setRegionId} options={regionList} />
            </div>
            <div className='mt-5'>
                <CustomTable columns={columns} data={data} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Organization