import   React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, 
    IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton ,
    IonFooter, IonFab, IonFabButton, IonFabList ,IonPopover,IonInput,IonSelectOption,IonSelect,
    IonItemGroup, IonItemDivider, IonItemSliding, IonItemOptions, IonItemOption ,IonList
} from '@ionic/react';
import { add, list } from 'ionicons/icons';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import axios from 'axios';
import { connect } from 'react-redux';
import Moment from 'moment';




export interface OrderComponentProps {
  user : any
}
 
export interface OrderComponentState {
    Order : any
}
 
class OrderComponent extends React.Component<OrderComponentProps, OrderComponentState> {
    constructor(props: OrderComponentProps) {
        super(props);
        this.state = {
            Order : []
        }
        console.log(this.props.user.users[0].id)
        
    }
    
    allOrder = async () => {
        let orders:any = []

        for (let i =0; i<this.props.user.users.length;i++){
            await axios.get(`http://localhost:3001/api/order/${this.props.user.users[i].id}`).then( data => {
                orders.push(...data.data)            
            })
        }

        this.setState({
            Order : orders
        })
       
     }

   

  

     /* Add new Product */
     handleChange  = (event: any)   => {
        console.log(event.target.value)

        this.setState({ 
            ...this.state,
            [event.target.name]: event.target.value 
        });
    }
   


     componentDidMount(){
       this.allOrder()
      // this.allOrderLastWeek()
     }

    
    render() { 
       
        const listOrder = (this.state.Order.length !== 0) ? this.state.Order.map((item : any,index: any)=>{
         return   <IonItemGroup key={index}>
                    <IonItemDivider>
                    <IonLabel>Nom de travailleur : <strong>{item.user_id.name}</strong> - {item.date}</IonLabel>
                    </IonItemDivider>
                   {
                   (item.products !== undefined) ? item.products.map((prd:any,key:any)=>{
                       return <IonItem  key = {key}>
                                <IonLabel>Nom de produit : {prd.name} </IonLabel>
                                <IonLabel>Quantity : {prd.quantity} </IonLabel>
                                <IonLabel>Prix : {prd.price} MAD</IonLabel>
                            </IonItem>
                   }) : <div></div>
                   }
                    
                   
                   <IonLabel><strong>Total : {item.total}  MAD</strong></IonLabel>
                   
            </IonItemGroup>
          
                    }) : <div>Not yet</div>
     
        return ( 
            <div>
                {listOrder}
              
            </div>
         );
    }
}
 
const mapStateToProps = (state:any) => {
    return {
        token: state.auth.token,
        user: state.auth.user
    }
  }

export default  connect(mapStateToProps)(OrderComponent);