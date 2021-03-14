import React from 'react';
import './ExploreContainer.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, 
          IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import LineChart from './Chart/LineChart';
import BarChart from './Chart/BarChart';
const axios = require('axios');
interface ContainerProps {
//  name: string;
}

const allProduct = () => {
   return axios.get('http://localhost:3001/api/product')
}
const ProductComponent: React.FC<ContainerProps> = ({  }) => {
  
  
  return (
    
    <div>
      <IonButton   color="primary">Ajouter</IonButton>

       <IonCard>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>ion-item in a card, icon left, button right</IonLabel>
            <IonButton fill="outline" slot="end">View</IonButton>
          </IonItem>
 
          <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
      </IonCardContent>
        </IonCard>
    </div>
    
    
  );
  
};

export default ProductComponent;
