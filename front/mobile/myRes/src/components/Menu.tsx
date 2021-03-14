import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React,{Component} from 'react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, 
  bookmarkOutline, heartOutline, heartSharp,
   mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

import './Menu.css';
import Home from '../pages/Home'
import LineChart from './Chart/LineChart';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
 // component:any;
}

const appPages: AppPage[] = [
  {
    title: 'Acceuil',
    url: '/home',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  //  component : <Home />
  },
  {
    title: 'Liste des produits',
    url: '/poducts',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  //  component:<LineChart />
  },
 
  {
    title: 'Liste des commandes',
    url: '/orders',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  //  component:<LineChart />
  },
  {
    title: 'Ajouter un travailleur',
    url: '/addNewUser',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  //  component:<LineChart />
  },
];


const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} 
                
                routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
