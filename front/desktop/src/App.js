import   React ,  { Component }from 'react';
import moment from 'moment';
import './App.css';
import Login from "./components/Login"
import { connect } from 'react-redux';
import axios from 'axios';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
        all_Product : [],
        product_cat : [],
        cart : [],
        Total : 0,
        user : '',
        order_id:""
    }
    const dt = moment().format("DD/MM/YYYY HH:mm:ss")
    console.log("date now : ",dt)
   console.log(this.props.user)
}

  get_Category_Product = () => {
    return axios.get('http://localhost:3001/api/productCategory').then( data => {

        this.setState({
            all_Product : data.data
        })
    }) 
  }

  get_Product = (category) => {
    if(this.props.user !== null) {
    return axios.get(`http://localhost:3001/api/product/${this.props.user.worksAt[0].id}/${category}`).then(data => {

      this.setState({
        product_cat : data.data
      })
    })
  }
  }

  add_Cart = (product_id,name_product,price,quantity=1) => {
    let allReadyExist = false
    if(this.state.cart.length === 0){
      this.setState({
        cart : [
          {
          product_id: product_id,
          name : name_product,
          price : price,
          quantity : quantity
          }],
          Total:price
      })
    }
    else {
      const newCart = this.state.cart.map((item)=>{

        if(item.name === name_product){
         
          item.quantity++
          allReadyExist = true
          return item
        } else {
          return item
        }
      
          
        
      })
     
      if(allReadyExist == false){
        this.setState({
          cart: [
            ...this.state.cart,
            {
              product_id:product_id,
              name :name_product,
              price : price,
             quantity : quantity
            }
          ]
        })
   
      }
      else {
        this.setState({
          cart : newCart
        })
      }
    }
 
  }

  total = () => {
    const total = this.state.cart.reduce((sum,total)=>sum = sum + total.quantity * total.price,0)
    this.setState({
      Total : total
    })
  }

  minus = (name) => {
    let toDeleteFromCart

    let minusProduct = this.state.cart.map((item)=>{
      if(item.name===name){
        if(item.quantity===1) {
          toDeleteFromCart = item
        } else {
            item.quantity--
            return item
        }
      } else {
        return item
      }
    })

    if(toDeleteFromCart){
      minusProduct = this.state.cart.filter(product=> product.name !== toDeleteFromCart.name)
    }

    this.setState({
      cart : minusProduct
    })
    
  }

  deleteFromCart = (name) => {
    let toDeleteFromCart

    let deleteProduct = this.state.cart.map((item)=>{
      if(item.name===name){
       
          toDeleteFromCart = item
          return item
      } else {
        return item
      }
    })

    if(toDeleteFromCart){
      deleteProduct = this.state.cart.filter(product=> product.name !== toDeleteFromCart.name)
    }

    this.setState({
      cart : deleteProduct
    })
  }

  // Add new order
  
  add_New_Order = () => {
    axios.post("http://localhost:3001/api/order/add",{ 
      user_id : this.props.user._id,
      date : moment().format("DD-MM-YYYY"),
      total : this.state.Total,
      products : this.state.cart
    }).then((data) => {
      console.log("Data Order is send : ", data)
     
      this.setState({
        cart : [],
        Total : 0
      })

    })
  }


  componentDidMount = ()  => {
    if(this.props.user) {
      this.setState({
        user : this.props.user._id
      })
    }
    this.get_Category_Product()
  }
 componentDidUpdate = (prevProps,prevState) => {

    if(prevState.cart !== this.state.cart) {

       this.total()
    }

  }
  render() {
    const {token, user} = this.props 
   
   
    //console.log(user.worksAt[0].id)
    const nameCatProducte = (this.state.all_Product !== undefined ) ? this.state.all_Product.map((item,index)=>{
      return <a href="#"  className="list-group-item list-group-item-action " key={index} onClick= {()=>this.get_Product(item._id)}> {item.name}</a> 
     
  }) : <div></div>

  const product_category = (this.state.product_cat !== undefined) ? this.state.product_cat.map((item,index)=>{
    console.log(item._id," : ",item.name," : ",item.productImage)
    //{item.productImage}
    return  <div key={index} className="col-md-4">
                <div className="card">
                    <div className="img-container">
                        <div className="d-flex justify-content-between align-items-center p-2 first"> 
                          
                          <img src={(item.productImage !== undefined) ? 'http://localhost:3001/'+ item.productImage : "https://www.anonymapparel.com/wp-content/plugins/woocommerce/assets/images/placeholder.png"} className="img-fluid"></img>
                        </div> 
                    
                   
                    <div className="product-detail-container">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">{item.name}</h6> 
                            <span className="text-danger font-weight-bold">{item.price} - MAD</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            
                        </div>
                        <div className="mt-3"> 
                          <button onClick={()=>this.add_Cart(item._id,item.name,item.price,item.quantity)} className="btn btn-primary btn-block">Ajouter</button> 
                        </div>
                    </div>
                       </div>
                </div>
              
            </div>
            

  
    
}) : <div>Not yet</div>

const displayCart = (this.state.cart !== undefined  || this.state.cart.quantity !== undefined ) ? this.state.cart.map((item,index)=>{
  return <div key={index}>
    <li >
    {item.quantity} * {item.name} = {item.quantity*item.price} MAD {" "}
    <button className="btn btn-danger" onClick={()=>this.deleteFromCart(item.name)}><i className="fa fa-trash" aria-hidden="true"></i></button>
    {"  "}
  <button className="btn btn-secondary" onClick={()=>this.minus(item.name)}><i className="fa fa-minus"></i>  </button>
    
  </li> 
  
    </div>
}) : <div>Not yet</div>

const total = this.state.cart.reduce((sum,total)=>sum = sum + total.quantity * total.price,0)

  return (
    <div>
    {this.props.user !== null  ? (
     <div className="row">
      <div className="col-sm-2 ">
        <div className="position-fixed">
           <div className="bg-light border-right" id="sidebar-wrapper">
           <div className="list-group list-group-flush">
             {nameCatProducte}
       
          
            
            
              
         
            
            </div>
          </div>
        </div>
        
      </div>
      <div className="col-sm-7">
      <div className="container-fluid mt-3 mb-3">
        <div className="row g-2">
          {product_category}
        </div>
        </div>
          
        
      </div>
      <div className="col-sm-3">
        <div className="position-fixed">
            <ul>
                {displayCart} 
                <li> <strong>Total : {total}</strong> </li>
            </ul>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button type="button" onClick={()=>this.add_New_Order()} className="btn btn-success">Valider</button>
            </div>
        </div>
      </div>
      
    </div>
    
    ) :  ( <Login/> ) 
  }
  </div>
  );

}
}

const mapStateToProps = (state) => {
  return {
      token: state.auth.token,
      user: state.auth.user
  }
}

export default connect(mapStateToProps)(App);
