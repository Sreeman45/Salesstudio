
let a=Date.now() 
let b=new Date().getTime()
console.log(a,b)
const coupon=['a','b','c','d','e']
let i=0
for(let k of coupon){
    console.log(coupon[++i])
}
