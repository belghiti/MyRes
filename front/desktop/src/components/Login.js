import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const validateForm = (errors ) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val ) => val.length > 0 && (valid = false)
    );
    return valid;
  }
class Login extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        console.log("Login ")

        this.state={
            email:"",
            password:"",
            formErrors: {
        
              email: "",
              password: ""
            }
           
          };
       
       }
    
    handleChange = (ev) =>{
        this.setState({
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
  this.setState({formErrors, [name]: value} , ()=> {
    console.log(formErrors)
})
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
      
      console.log(this.state) 
      if(validateForm(this.state.formErrors)) {
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
        
        });
      } else {
        alert('email ou mot de passe invalid')
      }
    
        
        
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
                               
                                {this.state.formErrors.email.length > 0 && (
                                  <span className=" text-danger h5 ">
                                      {this.state.formErrors.email}
                                  </span>
                                )}
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
                                {this.state.formErrors.password.length > 0 && 
                                  <span className='text-danger h5 '>{this.state.formErrors.password}</span>}
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
