import Menu from './components/Menu';
import Page from './pages/Page';
import Home from './pages/Home'
import Product from './pages/Product'
import Order from './pages/Order'
import Register from './components/Register/User'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import User from './pages/User';
import Company from './components/Register/Company'
import React,{ useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonFooter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route,Link, BrowserRouter as Router,Switch  } from 'react-router-dom';
import { connect } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

class App extends React.Component<{user : any,token: string,companies: string},{isAuth:any}> {
  constructor(props:any){
    super(props);
    this.state = {
      isAuth : false
    }
    //window.location.reload()
  }
  componentDidMount() {
      /*this.setState({
        isAuth : JSON.parse(localStorage.getItem('user')+'') !== null && localStorage.getItem('token') !== null
      })*/
      
  }

  componentDidUpdate(prevProps:any,prevState:any) {
    console.log(prevState)
   /* console.log(actState)*/
  }

  render() {
    const {user,token,companies} = this.props
    console.log("token : ", token)
    console.log(localStorage.getItem('user'))
    return (
        <IonApp>
          <IonReactRouter>
              {  token || JSON.parse(localStorage.getItem('user')+'') !== null && localStorage.getItem('token') !== null/*this.state.isAuth */  /*&& companies !==null */ ? 
               
            <IonSplitPane contentId="main">
              
             <Menu />
              <IonRouterOutlet id="main">
                <> 
                    <Route path="/home" component={Home} exact />
                    <Route path="/poducts" component={Product}  />
                    <Route path="/orders" component={Order}  />
                    <Route path="/addNewUser" component={User}  />
                    <Route path="/logout" component={Logout}  />
                    <Redirect from="/" to="/home" exact />
                  </> 
              </IonRouterOutlet>
            </IonSplitPane> :
            <>
              <Route path="/login"  component={Login} exact />
              <Route path="/register"  component={Register} />
              <Redirect from="*" to="/login" />
              <Link to="/register">Register </Link>
            </>    
          }
          </IonReactRouter>
        </IonApp>
    )
  }
}

const mapStateToProps = (state:any) => {
  return {
      token: state.auth.token,
      user: state.auth.user,
      companies : state.companies.companies
  }
}

export default connect(mapStateToProps)(App);

{/* 
  // console.log("Token : ",token)
    // console.log("Companies : ",companies)

    // var userID = ''
    // if(user !== null){
    //   userID = user._id
    // }

    const userID = (user !== null ) ? user.map((item:any,key:any) => {
      
      return item._id
    }) : '0'
  //   console.log(userID)
  //   var isAuth = false
  //  // var getCompanies = companies
  //   if (user !== null) {
  //     isAuth = true
  //   
isAuth && companies === null ? (
            <div>
              <Company id = {userID}/>
            </div>
          ) 
          
              <Switch>
                  <Route path="/register"  component={Register} />
                  <Route path="/login"  component={Login} />
                   <Redirect from="/" to="/login" exact />
                </Switch>
                 <Link to="/register">Register </Link>
                <div className='row'>
            </div> */}
          
