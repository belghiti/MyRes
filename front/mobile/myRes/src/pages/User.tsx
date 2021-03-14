import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonFooter } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import AddNewUserComponent from '../components/User/AddNewUser';

const AddNewUser: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ajouter un nouveau travailleur</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ajouter un nouveau travailleur</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AddNewUserComponent />
      </IonContent> 
    
      
    </IonPage>
  );
};

export default AddNewUser;
