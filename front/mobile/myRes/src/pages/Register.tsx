import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonFooter } from '@ionic/react';
import React from 'react';
import User from '../components/Register/User';

const creatUserAccount: React.FC = () => {
//<User />


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Creer un nouveau compte</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Creer un nouveau compte</IonTitle>
          </IonToolbar>
        </IonHeader>
        
      </IonContent> 
    
      
    </IonPage>
  );
};

export default creatUserAccount;
