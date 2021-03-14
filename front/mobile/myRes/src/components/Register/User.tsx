import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonInput,
  IonCheckbox,
  IonButton,
} from '@ionic/react';



class User extends React.Component<{email : string,password: string}> {
    constructor (props:any) {
        super(props)
        this.state = {
            email:"abdelilahelkhdim@gmail.com",
            password:"123456789",
        }
    }
    
render() {

    
  return (
    
   
<form className="ion-padding">
<IonItem>
  <IonLabel position="floating">Email</IonLabel>
  <IonInput />
</IonItem>
<IonItem>
  <IonLabel position="floating">Mot de pass</IonLabel>
  <IonInput type="password" />
</IonItem>
<IonItem lines="none">
  <IonLabel>Remember me</IonLabel>
  <IonCheckbox defaultChecked={true} slot="start" />
</IonItem>
<IonButton className="ion-margin-top" type="submit" expand="block">
  Login
</IonButton>
</form>


  
  );
}
};

export default User;
