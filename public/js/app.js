

console.log('Client side js')


const weatherForm= document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('.msg1')
const msg2=document.querySelector('.msg2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchLocation =search.value
    msg1.textContent='loading...'
    msg2.textContent=''
    fetch('http://localhost:3000/weather?address='+searchLocation).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error
            msg2.textContent=''
        }
        else{
            msg1.textContent=data.location
            msg2.textContent=data.forecast
        }

    })
})
})