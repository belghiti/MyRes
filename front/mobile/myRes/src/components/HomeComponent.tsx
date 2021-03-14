import React from 'react';
import './ExploreContainer.css';
import BarChart from './Chart/BarChart';

interface ContainerProps {
//  name: string;
}



const HomeComponent: React.FC<ContainerProps> = ({  }) => {
  
  return (
    
    <div className="container">
        <BarChart />
    </div>
    
    
  );
  
};

export default HomeComponent;
