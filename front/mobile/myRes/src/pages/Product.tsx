import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonFooter } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ProducComponent from '../components/ProductComponent';
import ProducComponent1 from '../components/Product/ProductComponent1';
import Home from './Home'

import './Page.css';

const Product: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Produits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Produits</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ProducComponent1 />
      </IonContent> 
    
      
    </IonPage>
  );
};

export default Product;
