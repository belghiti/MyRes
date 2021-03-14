import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, 
    IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton ,
    IonFooter, IonFab, IonFabButton, IonFabList ,IonPopover,IonInput,IonSelectOption,IonSelect
} from '@ionic/react';
export default function UpdateProduct() {
   const handleChange = (event: any) => {

   }
    return (
        <div>
            <IonLabel position="floating">Modifier</IonLabel>
                    <form className="ion-padding" >
                        <IonItem>
                            <IonLabel position="floating">Nom de produit</IonLabel>
                            <IonInput name="name"   onIonChange={(e)=>handleChange(e)}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Catégorie</IonLabel>
                            <IonSelect name="cat_pro_id"  onIonChange={(e)=>handleChange(e)} >
                                {/*lisCatPro*/}
                            </IonSelect>
                        </IonItem>
                         <IonItem>
                            <IonLabel position="floating">Prix</IonLabel>
                            <IonInput name="price"  onIonChange={(e) => handleChange(e)}/>
                        </IonItem>
                     
                        <IonButton className="ion-margin-top" type="submit" expand="block">
                            Ajouter
                        </IonButton>
                    </form>
        </div>
    )
}
