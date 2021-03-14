import React from 'react';
import './ExploreContainer.css';
import LineChart from './Chart/LineChart';
import BarChart from './Chart/BarChart';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  
  return (
    
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    
   


       
     
      
    </div>
    
    
  );
  
};

export default ExploreContainer;
