import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/react';

export interface ProductComponentProps {
    user : any
 }
  
 export interface ProductComponentState {
    
    role_id : any,
    name: any,
    email : any,
    phone_number : any,
    password: any,
    users : any
 }


class AddNewUserComponent extends React.Component<ProductComponentProps, ProductComponentState> {
    constructor (props:ProductComponentProps) {
        super(props)
        this.state = {
           role_id : "6033c08635b02121a04465ec",
           name: "",
           email : "",
           phone_number : "",
           password:"",
           users : []
        }
        console.log(this.props.user._id)
    }

    handleChange  = (event: any)   => {
        console.log(event.target.value)

        this.setState({ 
            ...this.state,
            [event.target.name]: event.target.value 
        });
    }

    addNewWorker = (ev : any)=> {
        ev.preventDefault();
        axios.post('http://localhost:3001/api/user/register',{
            role_id : this.state.role_id,
            name : this.state.name,
            email : this.state.email,
            phone_number : this.state.phone_number ,
            password : this.state.password,

        }).then(data=>
            {console.log("Le travailleur ete enregistrer avec succes : ",data.data)
            axios.put(`http://localhost:3001/api/user/edit_admin/${this.props.user._id}`,{
                user_id : data.data._id
               
            })

            axios.put(`http://localhost:3001/api/user/edit_worker/${data.data._id}`,{
                    user_id : this.props.user._id
                })
           /* .then(res=>
                {console.log(res)
                axios.put(`http://localhost:3001/api/user/edit_worker/${data.data._id}`,{
                    user_id : res.data._id
                })
            */
            
            this.setState({
                role_id : "6033c08635b02121a04465ec",
                name: "",
                email : "",
                phone_number : "",
                password:""
             })
        })
            
    }
    
render() {

    
  return (
        <form className="ion-padding"  onSubmit={(e)=>this.addNewWorker(e)}>
            <IonItem>
                <IonLabel position="floating">Nom de travailleur</IonLabel>
                <IonInput name="name" value={this.state.name} onIonChange={(e) => this.handleChange(e)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                 <IonInput name="email" value={this.state.email} onIonChange={(e) => this.handleChange(e)} />
            </IonItem>
            <IonItem lines="none">
            <IonItem>
                <IonLabel position="floating">Numero de telephone</IonLabel>
                <IonInput name="phone_number" value={this.state.phone_number} onIonChange={(e) => this.handleChange(e)}/>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Mot de pass</IonLabel>
                 <IonInput name="password" value={this.state.password} onIonChange={(e) => this.handleChange(e)} type="password" />
            </IonItem>
       
            </IonItem>
            <IonButton className="ion-margin-top" type="submit" expand="block">
            Ajouter
            </IonButton>
        </form>
  );
}
};
const mapStateToProps = (state:any, ownProps: any) => {
    return {
        ...ownProps,
        token: state.auth.token,
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(AddNewUserComponent);
