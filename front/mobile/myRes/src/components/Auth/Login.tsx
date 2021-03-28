import React from 'react';
import { connect } from 'react-redux';
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

import { IonApp, IonPage, IonRouterOutlet } from '@ionic/react';
import User from '../Register/User'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Link, BrowserRouter } from 'react-router-dom';
const axios = require('axios');


const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const validateForm = (errors : any) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val : any) => val.length > 0 && (valid = false)
    );
    return valid;
  }
class Login extends React.Component<{userLogin:any},{email : string,password: string,formErrors:any}>{

  constructor (props:any) {
    super(props)
    this.state = {
        email:"abdelilahelkhdim@gmail.com",
        password:"123456789",
        formErrors: {
        
          email: "",
          password: ""
        }
    }
}

handleChange = (ev:any) =>{
  
  this.setState({
    ...this.state,
   [ev.target.name]: ev.target.value

  });
  const { name, value } = ev.target;
  let formErrors = this.state.formErrors;
  switch (name) {
    
    case "email":
      formErrors.email = validEmailRegex.test(value)
        ? ""
        : "invalid email address";
      break;
    case "password":
      formErrors.password =
        value.length < 6 ? "minimum 6 characaters required" : "";
      break;
    default:
      break;
  }
  this.setState({formErrors, [name]: value} as any, ()=> {
    console.log(formErrors)
})
}

handleSubmit = (ev:any) => {
      ev.preventDefault();

    console.log(this.state) 
    if(validateForm(this.state.formErrors)) {
      axios.post('http://localhost:3001/api/user/login', {email : this.state.email,password : this.state.password})
      .then( (response:any) => {
        
            console.log(response);
              this.props.userLogin(response.data.token,response.data.user);
              // Redirection
            // this.props.history.push('/')
            // if(re)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

      })
      .catch( (error:any) => {
        console.log(error);
    
      });
    }else{
      alert('email ou mot de passe invalid')
    }

     
  
}

render() {
  const {formErrors} = this.state;
  return (
    <form className="ion-padding "  onSubmit={this.handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput 
              name="email" 
              value={this.state.email} 
              onIonChange={(e:any)=>this.handleChange(e)}
             
              />
              
        </IonItem>
     
        {formErrors.email.length > 0 && (

            <span className=" text-danger h5 ">
                  {this.state.formErrors.email}
                </span>

                
              )}
       
        
        <IonItem>
          <IonLabel position="floating">Mot de pass</IonLabel>
          <IonInput name="password" type="password" value={this.state.password} onIonChange={(e:any)=>this.handleChange(e)}/>
        </IonItem>
        {formErrors.password.length > 0 && 
  <span className='text-danger h5 '>{formErrors.password}</span>}
        <IonItem lines="none">
          <IonLabel>Remember me</IonLabel>
          <IonCheckbox defaultChecked={true} slot="start" />
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" expand="block">
          Connecte
        </IonButton>
     
        
    
    </form>
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

export default connect(null,mapDispatchToProps)(Login);
