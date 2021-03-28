import React from 'react';
import { connect } from 'react-redux';

class Logout extends React.Component<{history : any,userLogout : any},{}>{

  constructor (props:any) {
    super(props)
   this.logout()
   
    this.state = {
       
    }
}

logout = () => {
    localStorage.clear()
    this.props.userLogout()
    this.props.history.push('/login')
}




render() {

  return (
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
