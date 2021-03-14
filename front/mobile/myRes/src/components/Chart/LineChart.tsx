import React from 'react'
import Line from 'react-chartjs-2'

function LineChart() {

    const data = {
        labels : ['janvier','Fevrier','Mars','Avril','Mai'],
        datasets : [
            {
            label : 'Sales for 2020',
            data: [1,5,6,9,10]
        },
        {
            label : 'Sales for 2019',
            data: [15,1,1,22,8]
        }
    
    ]
    }

    const option = {
        title : {
            display : true,
            text : 'Doughnut chart'
        }
    }

    return <Line data = {data} options={option}/>
       
}

export default LineChart
