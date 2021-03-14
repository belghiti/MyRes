import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonFooter } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import OrderComponent from '../components/Order/OrderListComponent';


import './Page.css';

const Order: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Orders</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Liste des commandes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <OrderComponent />
      </IonContent> 
    
      
    </IonPage>
  );
};

export default Order;
