import React,{ useState,useEffect } from 'react'
import {Bar} from 'react-chartjs-2'
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { isPropertySignature } from 'typescript';
function BarChart(props : any) {
    let [order_day, setorder_day] = useState([]);
    let [order_month, setorder_month] = useState([]);
    console.log(props.user._id)
    
     useEffect(()=>{
        
        const getOrderDay =  () => {
            
              axios
              .get(`http://localhost:3001/api/order/daily-stats/${props.user._id}`)
              
              .then(res => {setorder_day(res.data);})
              .catch((error) => console.log(error.resp));
              
          };

          const getOrderMonth =  () => {
            
            axios
            .get(`http://localhost:3001/api/order/monthly-stats/${props.user._id}`)
            
            .then(res => {setorder_month(res.data);})
            .catch((error) => console.log(error.resp));
            
        };
          getOrderDay();
          getOrderMonth();
         
    },[])
    console.log(order_day)
    console.log(order_month)
    /*order_day.map(element  => {
       element
        
    });*/
    const arrOrd= order_day.map((item: any,key : any)=> {
                    let ttl = 0
                     console.log(item)
                       item.map((itm : any,ky : any)=>{
                          console.log(itm)
                          ttl = ttl + itm.total
                          return itm
                     })
                     return ttl
                  })
                  //: 0
    const total = (order_day !== undefined || order_day !== []) 
                  ? order_day.reduce((sum,total : any)=>sum = sum + total.total,0)
                  : 0
    console.log(arrOrd.reverse())
    const d = new Date()
    const dt = d.getDay()
    console.log(dt)
    const days = ['Dimench','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samdi']
    let days2 = []
   
        for(let i = dt; i<days.length;i++) {
            days2.push(days[i]) 
        }
        if(dt !== 0) {
            for(let i = 0; i<dt;i++) {
              days2.push(days[i]) 
             }
        }
        
    
    

    

   console.log(days2.reverse())
    const data = {
        labels : days2,// date.now
        datasets : [
            {
            label : 'Sales for 2020',
            data: arrOrd ,// total du jour
            backgroundColor: [
                "#f38b4a",
                "#56d798",
                "#ff8397",
                "#6970d5" ,
                "#1fc397",
                "#6970d7a" ,
                "#bf8366"
              ],
        }
    
    ]
    }
    
    
 

    
     
    //const data = <Bar data={data} />

    return <Bar data={data} />
       
}

const mapStateToProps = (state:any) => {
    return {
        token: state.auth.token,
        user: state.auth.user
    }
  }

export default connect(mapStateToProps)(BarChart)
