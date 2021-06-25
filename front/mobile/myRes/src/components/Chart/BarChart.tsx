import React,{ useState,useEffect } from 'react'
import {Bar} from 'react-chartjs-2'
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { State } from 'ionicons/dist/types/stencil-public-runtime';

function BarChart(props : any) {
    let [order_day, setorder_day] = useState([]);
    let [order_month, setorder_month] = useState([]);
    //let user: any = JSON.parse(localStorage.getItem('user')+'')
    
    const {user,token} = props
    console.log("token : ", token)
    console.log("user : ", user)
     useEffect(()=>{
        const userId = props.user === null ? JSON.parse(localStorage.getItem('user')+'').users : props.user.users
        const users = props.user === null ? JSON.parse(localStorage.getItem('user')+'').users : props.user.users
        console.log(users)
        const getOrderDay =  () => {
          
            for(let i=0;i<userId.length;i++){
                console.log(i)
                let s : any
                axios
              .get(`http://localhost:3001/api/order/daily-stats/${userId[i].id}`)
              
              .then(res => {setorder_day(res.data) ; 
                
                console.log(res.data)})
              
              .catch((error) => console.log(error.resp));
            }
          };

        /*  const getOrderMonth =  () => {
            
            axios
            .get(`http://localhost:3001/api/order/monthly-stats/${userId}`)
            
            .then(res => {setorder_month(res.data);})
            .catch((error) => console.log(error.resp));
            
        };*/
          ///monthly-stats/:id

          getOrderDay();
         // getOrderMonth();
    },[])

   
    console.log(order_month)
    const arrOrd= order_day.map((item: any,key : any)=> {
                    let ttl = 0
                  
                       item.map((itm : any,ky : any)=>{
                      
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

    const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']

    let days2 = []
   
    for(let i = 0; i<7; i++) {
        days2.push(days[parseInt(moment().subtract(i, 'days').format('d'))])
    }
    
    console.log(days2.reverse())

    const data = {
        labels : days2,// date.now
        datasets : [
            {
            label : 'Sales for last week',
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

    return <div>
                <Bar data={data} />  
                <Line data = {data} />
        </div>
       
}

const mapStateToProps = (state:any) => {
    return {
        token: state.auth.token,
        user: state.auth.user
    }
  }

export default connect(mapStateToProps)(BarChart)
