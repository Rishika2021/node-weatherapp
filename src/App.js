const path=require('path')
const express=require('express')
const hbs = require('hbs')
const geocode=require('./Utilis/Geocode')
const forecast=require('./Utilis/Forecast')

const app=express()
const port=process.env.PORT || 3000

const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath )
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rishika'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Rishika'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Rishika'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Provide an address' 
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
           }
            forecast(latitude,longitude, (error, foredata) => {
                if(error){
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    address:req.query.address,
                    forecast:foredata,
                    location
                })
             })
  })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
             error:'You must provide a search term'
        })
    }
     res.send({
         products:[]
     })
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Rishika',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Rishika',
        errorMessage:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('server is up and running')
})
