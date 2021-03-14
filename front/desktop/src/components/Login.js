import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        console.log("Login ")

        this.state={
            email:"",
            password:"",
            errorMessage : ''
           
          };
       
       }
    
    handleChange = (ev) =>{
        this.setState({
         [ev.target.name]: ev.target.value
      
        });
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
      
      console.log(this.state) 
      
    
        axios.post('http://localhost:3001/api/user/login', {email : this.state.email,password : this.state.password})
        .then( (response) => {
          
               console.log(response);
                this.props.userLogin(response.data.token,response.data.user);
                // Redirection
               // this.props.history.push('/')
               // if(re)
        })
        .catch( (error) => {
          console.log(error);
        this.setState({
           errorMessage : "Email ou mot de passe incorrect"
         })
        });
        
      }
    render() {
        return (
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    value={this.state.email} 
                                    name="email"   
                                    className="form-control" 
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp" 
                                    onChange={this.handleChange}
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    value={this.state.password} 
                                    name="password"  
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    onChange={this.handleChange}
                                />
                            </div>
                           
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      userLogin : (token,user) => {
        dispatch({
          type : 'LOGIN_USER',
          token : token,
          user : user
          
        })
      }
    }
  }
  

export default connect(null,mapDispatchToProps)(Login)
