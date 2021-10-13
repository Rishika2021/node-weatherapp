const request=require('request')
 
const forecast=(latitude,longitude,callback)=>{
     const urlf='http://api.weatherstack.com/current?access_key=93dbe0afb903315f14916ab17457e86f&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
     request({url:urlf,json:true},
        (error,{body})=>{
           if(error){
               callback('Unable to connect',undefined)
           }
           else if(body.error){
               callback('Unable to find location',undefined) 
           }
           else{
               callback( undefined, body.current.weather_descriptions[0] +'. It is ' + body.current.temperature +' outside. But it feels like '+ body.current.feelslike +'.')
           }
        })
}

module.exports= forecast