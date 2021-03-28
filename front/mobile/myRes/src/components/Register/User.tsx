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
 
  tel : any,
  user_id : any
}
class Register extends React.Component<ProductComponentProps, ProductComponentState> {
    constructor (props:any) {
        super(props)
        this.state = {
          role_id : "6033c08635b02121a04465ec",
          name: "",
          email : "",
          phone_number : "",
          password:"",
          tel : "",
          user_id : ""
       }
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
          axios.post('http://localhost:3001/api/user/login', {email : this.state.email,password : this.state.password})
      .then( (response:any) => {
        
            console.log(response);
              this.props.userLogin(response.data.token,response.data.user);
              // Redirection
            // this.props.history.push('/')
            // if(re)
      })
      .catch( (error:any) => {
        console.log(error);
    
      });
          this.setState({
              role_id : "6033c08635b02121a04465ec",
              name: "",
              email : "",
              phone_number : "",
              password:"",
              user_id : data.data._id
           })
      })
          
  }

  handleChange = (ev:any) =>{
  
    this.setState({
      ...this.state,
     [ev.target.name]: ev.target.value
  
    });
    

  }
  next_page = () => {
   /* <Router>
            
                
              <Switch>
                
                <Route path="/register"  component={Company} />
               
                <Redirect from="/" to="/login" exact />
              </Switch>
              <Link to="/register">Register </Link>
              </Router>*/
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
  
  
  { /*onSubmit={this.register_user}*/}
  
<form className="ion-padding" >
<IonItem>
  <IonLabel position="floating">Votre nom et prenom </IonLabel>
  <IonInput name="name" value={this.state.name} onIonChange={(e:any)=>this.handleChange(e)}/>
</IonItem>
<IonItem>
  <IonLabel position="floating">Numéro de telephone</IonLabel>
  <IonInput name="tel" value={this.state.tel} onIonChange={(e:any)=>this.handleChange(e)} />
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

<IonButton className="ion-margin-top" type="submit" expand="block" onClick={()=>{
  this.next_page()
}}>
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
