import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Link, BrowserRouter } from 'react-router-dom';
class Logout extends React.Component<{history : any,userLogout : any},{}>{

  constructor (props:any) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.userLogout()
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.props.history.push('/login')
   
  }


render() {

  return  (
   <p>Logout</p>
  );
}
};

const mapDispatchToProps = (dispatch:any) => {
    return {
      userLogout : () => {
        dispatch({
          type : 'LOGOUT'
        })
      }
    }
  }

export default connect(null,mapDispatchToProps)(Logout) ;
