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

const axios = require('axios');


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors  , ...rest } : any)  => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val :any) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

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
  let formErrors = { ...this.state.formErrors };
  switch (name) {
    
    case "email":
      formErrors.email = emailRegex.test(value)
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
}

handleSubmit = (ev:any) => {
      ev.preventDefault();

    console.log(this.state) 


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
  
}

render() {
  
  return (
    <form className="ion-padding" onSubmit={this.handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput 
              name="email" 
              value={this.state.email} 
              onIonChange={(e:any)=>this.handleChange(e)}
             
              />
              {this.state.formErrors.email.length > 0 && (
                <span className="errorMessage">{this.state.formErrors.email}</span>
              )}
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mot de pass</IonLabel>
          <IonInput name="password" type="password" value={this.state.password} onIonChange={(e:any)=>this.handleChange(e)}/>
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
