import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect, Route,Link, BrowserRouter as Router,Switch  } from 'react-router-dom';
import Company from './Company'
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
  IonBackButton, IonHeader, IonToolbar, IonButtons, IonTitle
} from '@ionic/react';
import Login from '../Auth/Login'
import { NavLink } from 'react-router-dom';

export interface ProductComponentProps {
 // user : any
 userLogin:any
 history: any
}
  
export interface ProductComponentState {
    
  role_id : any,
  name: any,
  email : any,
  phone_number : any,
  password: any,
  user_id : any
}
class Register extends React.Component<ProductComponentProps, ProductComponentState> {
    constructor (props:any) {
        super(props)
        this.state = {
          role_id : "",
          name: "",
          email : "",
          phone_number : null,
          password:"",
          user_id : ""
       }
    }
get_order = () => {
  return axios.get('http://localhost:3001/api/role/user').then( data => {
    console.log(data.data);
    this.setState({
      role_id : data.data._id
    })
  })
}
    register_user = (ev : any)=> {
      ev.preventDefault();
      axios.post('http://localhost:3001/api/user/register',{
          role_id : this.state.role_id,
          name : this.state.name,
          email : this.state.email,
          phone_number : this.state.phone_number ,
          password : this.state.password,

      }).then(data=>
          {console.log("Le travailleur ete enregistrer avec succes : ",data.data)
        /*  axios.post('http://localhost:3001/api/user/login', {email : this.state.email,password : this.state.password})
      .then( (response:any) => {
        
            console.log(response);
              this.props.userLogin(response.data.token,response.data.user);
              // Redirection
            // this.props.history.push('/')
            // if(re)
      })
      .catch( (error:any) => {
        console.log(error);
    
      });*/
      
          this.setState({
              role_id : "",
              name: "",
              email : "",
              phone_number : null,
              password:"",
              user_id : data.data._id
           })
      })
      this.props.history.push('/company')
  }

  handleChange = (ev:any) =>{
  
    this.setState({
      ...this.state,
     [ev.target.name]: ev.target.value
  
    });
    

  }
 
  componentDidMount () {
    this.get_order()
  }
    
render() {
  return (
    <div>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <Router>
            <Switch>
              <Route path="/login"  component={Login} />
            </Switch>
          </Router>
          <IonBackButton defaultHref='/login' />
        </IonButtons>
        <IonTitle>Créer votre compte</IonTitle>
      </IonToolbar>
    </IonHeader>
  
  

  
<form className="ion-padding" onSubmit={this.register_user}>
<IonItem>
  <IonLabel position="floating">Votre nom et prenom </IonLabel>
  <IonInput name="name" value={this.state.name} onIonChange={(e:any)=>this.handleChange(e)}/>
</IonItem>
<IonItem>
  <IonLabel position="floating">Numéro de telephone</IonLabel>
  <IonInput name="phone_number" value={this.state.phone_number} onIonChange={(e:any)=>this.handleChange(e)} />
</IonItem>
<IonItem>
  <IonLabel position="floating">Email</IonLabel>
  <IonInput name="email" value={this.state.email} onIonChange={(e:any)=>this.handleChange(e)}/>
</IonItem>
<IonItem>
  <IonLabel position="floating">Mot de pass</IonLabel>
  <IonInput type="password" name="password" value={this.state.password}onIonChange={(e:any)=>this.handleChange(e)} />
</IonItem>
<IonItem>
  <IonLabel position="floating">Confirmer le mot de passe</IonLabel>
  <IonInput type="password" name="confimePassword"   />
</IonItem>

<IonButton className="ion-margin-top" type="submit" expand="block">
  Suivant
</IonButton>

</form>

</div>
  
  );
}
};
const mapDispatchToProps = (dispatch:any) => {
  return {
    userLogin : (token:any,user:any) => {
      dispatch({
        type : 'LOGIN_USER',
        token : token,
        user : user
        
      })
    }
  }
}
export default connect(null,mapDispatchToProps)(Register);
