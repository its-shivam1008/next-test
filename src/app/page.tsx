'use client'
import axios from 'axios'
import { ChevronUp, CircleQuestionMark, Info, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function page() {

  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    fetchdata();
  }, [])
  

  const fetchdata = async () => {
    try{
      const response = await axios.get('/api/fetch')
      console.log(response.data.jsonResponse)
      console.log(response.data.jsonResponse.data.getUserDiscountCodes)
      if(response.data.success){
        alert(response.data.message);
        setUserData(response.data.jsonResponse);
      }else{
        throw new Error(response.data.message)
      }
    }catch(err){
      alert(err);
    }
  }

  return (
    <div className='bg-gradient-to-br from-[#f7e9f6] via-[#f3c3efc9] to-[#96befb] min-h-screen w-full'>
      <header className="h-fit flex justify-end p-2"> 
        <div className="w-fit h-fit px-3 py-1.5 bg-white flex gap-2 items-center rounded-full text-xs"><CircleQuestionMark size={16} color="#ba2ed6" /> How it works?</div>
      </header>
      <main className='space-y-4'>
        <section className="hero flex flex-col items-center justify-center space-y-5">
          <Image alt='Hero' width={100} className='rounded-full mb-5' height={100} src={'/Recipto Logo.jpg'}/>
          <p className="font-bold text-2xl">Recip.to</p>
        </section>
        <section className="options flex justify-between items-center w-[90%] mx-auto">
          <div className='flex mx-auto bg-white w-fit h-fit rounded-full'>
            <div className='flex items-center bg-blue-700 justify-center text-white px-8 py-2 rounded-full'>Offers <Image alt='stars' width={24} className='rounded-full' height={24} src={'/Rewards Stars.png'}/></div>
            <div className='flex items-center justify-center py-2 px-4 rounded-full'>My Coupons</div>
          </div>
          <div className="bg-white flex p-2 rounded-full w-fit"><SlidersHorizontal /></div>
        </section>
        <section className="banner bg-white w-[90%] rounded-[16px] mx-auto">
          <div className="h-1 "></div>
          <Image width={800} height={600} alt='banner' className='rounded-[12px] w-[92%] mx-auto my-3'  src={'/taxservices.webp'}/>
          <div className='flex justify-between w-[92%] mx-auto items-center pb-2'>
            <div>
              <h1 className='font-bold'>Tax Services Offers</h1>
              <p className='text-gray-600'>14 Offers</p>
            </div>
            <div>
              <ChevronUp />
            </div>
          </div>
        </section>
        <section className='w-[90%] mx-auto'>
          <div className="overflow-x-scroll flex items-center gap-6 w-full">
            <div className='bg-white flex items-center min-w-fit rounded-full px-2 py-1 text-sm  gap-1 border-2 border-blue-600'>
              <Image alt='stars' width={24} className='rounded-full' height={24} src={'/Filter Icons - All.png'}/> All
            </div>
            <div className='bg-white flex items-center min-w-fit rounded-full px-2 py-1 text-sm  gap-1'>
              <Image alt='stars' width={24} className='rounded-full' height={24} src={'/Filter Icons - Personal.png'}/> For Salaried Professionals
            </div>
            <div className='bg-white flex items-center min-w-fit rounded-full px-2 py-1 text-sm  gap-1'>
              <Image alt='stars' width={24} className='rounded-full' height={24} src={'/Filter Icons - Business.png'}/> For Business Owners
            </div>
          </div>
        </section>
        { userData &&
          userData.data.getUserDiscountCodes.data.map((elem:any, index:any) => (
            <section key={index} className="card bg-white w-[90%] rounded-[16px] mx-auto px-3">
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Image width={64} height={64} alt='logo' className='rounded-[12px] mx-auto my-3'  src={elem.store.logo}/>
                  <p className="text-gray-600">{elem.store.name}</p>
                </div>
                <div className="info">
                  <Info color="#6d6969" />
                </div>
              </div>
              <hr className='text-gray-300 '/>
              <div className="text-xl font-bold my-2">{elem.brandproduct.name}</div>
              <div className='flex justify-between items-center mt-2 pb-4'>
                <div className='flex gap-2 px-1 py-1 border-2 border-gray-400 rounded-[4px] text-sm'>
                  Earn <Image alt='stars' width={16} height={1} src={'/Coins.png'}/> {elem.brandproduct.customer_cashback*10} coins
                </div>
                <button type='button' className='bg-blue-600 text-bold text-white px-6 py-2 rounded-[8px]'>
                  VIEW
                </button>
              </div>
          </section>
          ))
        }
      </main>
    </div>
  )
}

export default page
