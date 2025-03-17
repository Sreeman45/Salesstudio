import { useState } from "react"
export default function Cards(){
    const [message,setMessage]=useState('')
    const [couponCode,setcouponcode]=useState(null)
    const [claim,setClaim]=useState(false)
    const sendrequest=()=>{
         
         fetch('https://salesstudio-9n5r.vercel.app/claim',{credentials:'include'}).then((res)=>res.json()).then((data)=>{
               if(data.success){
                setClaim(true)
                 setcouponcode(data.code)
                setMessage('Claim Successful')
               }
               else if(!data.sucess){
                    setMessage(data.message)
                    setClaim(false)
               }
         }).catch(err=>console.log('error' + err))
    }
    return(<div className="py-4 px-2 border-4 border-purple-500 bg-purple-900">
        <h1 className="font-bold text-2xl text-white text-center">COUPON</h1>
        <p className="font-semibold text-lg text-yellow-500 mt-4 mx-20 max-[350px]:mx-16 ">{claim ?'CODE : '+couponCode :'click below👇'}</p>
        <p className={`${claim ? 'text-green-600':'text-red-600 '} text-center mt-6`}>{message}</p>
        <button onClick={sendrequest} className="text-center font-bold font-jetbrains text-xl text-blue-500 border-[2px] border-purple-600 px-2 py-1 mx-auto block mt-8 mb-3 cursor-pointer hover:border-yellow-500 hover:shadow-lg  hover:text-blue-400">CLAIM</button>
    </div>)
}