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
  IonSelect,
  IonSelectOption,
  IonBackButton, IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonPage, IonTitle,IonFooter 
 // withIonLifeCycle 
} from '@ionic/react';
import { Redirect, Route,Link, BrowserRouter as Router,Switch  } from 'react-router-dom';
import Login from '../Auth/Login'
class Company extends React.Component<{user : any,id:any,userCompany : any},{selectOptions:any,currency:any,catCompany : any,name:any,category_company_id : any,id_User:any}>  {
    constructor (props:any) {
        super(props)
        this.state = {
          selectOptions : [],
          id_User : '',
          catCompany : [],
          name:'',
          category_company_id : "",
          currency:''
          
        }
    }
    

allCatCompany = () => {
 
  return axios.get('http://localhost:3001/api/categComp').then(data  => {

  const option = data.data.map((d : any) => ({
    "category_company_id" : d._id,
    "name" : d.name
  }))
    
    this.setState({
      selectOptions : option,
      id_User:this.props.user._id,
      catCompany:data.data,
      category_company_id : data.data._id
    })
    console.log(option)
    console.log(this.props)
  })
}

componentDidMount(){
  
  this.allCatCompany();
}

handleChange = (ev:any) =>{
  console.log(ev.target.value) 
  this.setState({
    ...this.state,
   [ev.target.name]: ev.target.value,
  // category_company_id : ev.category_company_id

  });
}

handleSubmit = (ev:any) => {
  ev.preventDefault();

console.log(this.state) 


  axios.post('http://localhost:3001/api/company/add', 
    { id_User : this.state.id_User,
      name_company : this.state.name, 
      category_company: this.state.category_company_id,
      currency:this.state.currency
    })
  .then( (response:any) => {
    
        console.log(response);
        this.props.userCompany(response.data)
         // this.props.userLogin(response.data.token,response.data.user);
          // Redirection
        // this.props.history.push('/')
        // if(re)
  })
  .catch( (error:any) => {
    console.log(error);

  });

}

render() {

 
  console.log("Category company : ",this.state.catCompany)
const lisCatCompany = this.state.catCompany
  const optionSelect = (lisCatCompany !== undefined ) ?
  lisCatCompany.map((item:any,index:any) => {
    console.log(item.name)
    return <IonSelectOption key={index} value={item._id}>{item.name}</IonSelectOption>
  }) : <div></div>

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
        <IonTitle>Cr??er votre compte</IonTitle>
      </IonToolbar>
    </IonHeader>
    <form className="ion-padding" onSubmit={(e)=>this.handleSubmit(e)}>
    <IonItem>
      <IonLabel position="floating">Nom socie??t??</IonLabel>
      
      <IonInput value={this.state.name} name="name" onIonChange={(e)=>this.handleChange(e)}/>
    </IonItem>

    <IonItem>
      <IonLabel position="floating">Cat??gories</IonLabel>

      <IonSelect value={this.state.category_company_id} name="category_company_id"  onIonChange={(e)=>this.handleChange(e)}>
        {optionSelect}
      </IonSelect>
      
    </IonItem>

    <IonItem>
      <IonLabel position="floating">Devise</IonLabel>
      
      <IonInput value={this.state.currency} name="currency" onIonChange={(e)=>this.handleChange(e)}/>
    </IonItem>

    
    <IonButton className="ion-margin-top" type="submit" expand="block">
      Enregistrer
    </IonButton>
    </form>
    </div>
  );
}
};

const mapStateToProps = (state:any) => {
  return {
      token: state.auth.token,
      user: state.auth.user,
      categoryCompanies : state.catCompany.categoryCompanies
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    userCompany : (companies : any) => {
      dispatch({
        type : 'GET_COMPANIES',
        companies : companies.companies
        
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Company);
