import   React from 'react';
import { IonCard, IonCardContent, IonItem, IonIcon, IonLabel, IonButton ,IonFab, IonFabButton,
    IonPopover,IonInput,IonSelectOption,IonSelect,IonAlert } from '@ionic/react';

import { add } from 'ionicons/icons';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { connect } from 'react-redux';
import axios from 'axios';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


export interface ProductComponentProps {
   // push : any
   user : any,
   
}
 
export interface ProductComponentState {
    showPopover : any, 
    showPopover2: any,
    event: any, 
    product : any,
    name: any,
    price:any,
    category_Product_name : any,
    cat_pro_id : any,
    status: any,
    id_Product : any,
    image : any,

}
interface InternalValues {
    image: any;
  }

class ProductComponent extends React.Component<ProductComponentProps, ProductComponentState> {

    constructor(props: ProductComponentProps) {
        
        super(props);
        this.state = { 
            product : [],  
            showPopover: false,
            showPopover2: false,
             event: undefined ,
             name:'',
             category_Product_name : [],
             price : '',
             image : null,
             cat_pro_id : "60173921fe4a5216c8330fdf",
             status : "in_stock",
             id_Product : "",
          
        };
        console.log(this.props.user)
    }
    
  

   onFileChange = (fileChangeEvent: any) => {
       const img = fileChangeEvent.target.files[0]
       this.setState({ 

        image: img
    });
    console.log(this.state.image, 'the state ..... ')
  };

  handlupload = (ev : any) => {
      console.log(this.state.image, 'handl Upload ..... ')
  }

   
    
    allProduct = () => {
        const userId = this.props.user === null ? JSON.parse(localStorage.getItem('user')+'')._id : this.props.user
        axios.get(`http://localhost:3001/api/product/${userId}`).then( data => {
            console.log(data)
            this.setState({
                product : data.data
            })
        })
    }

     get_All_Categories_Product = () => {
        return axios.get('http://localhost:3001/api/productCategory').then( data => {
            console.log(data)
            this.setState({
                category_Product_name : data.data
            })
        })
     }

     /* Add new Product */
     handleChange  = (event: any)   => {
        console.log(event.target.value)

        this.setState({ 
            ...this.state,
            [event.target.name]: event.target.value 
        });
    }

   

   
    
     addNewProduct = async (ev:any) => {
        ev.preventDefault();
 
        let formData = new FormData();
        const userId = this.props.user === null ? JSON.parse(localStorage.getItem('user')+'')._id : this.props.user
        
        formData.append("name", this.state.name);
        formData.append("id_User", userId);
        formData.append("status", this.state.status);
        formData.append("category_Product_id", this.state.cat_pro_id);
        formData.append("price", this.state.price);
        formData.append("productImage", this.state.image, this.state.image.name);
         //   body: formData,
       
      
         axios.post('http://localhost:3001/api/product/add',  formData,
         {  
        
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
         .then( (response:any) => {
        this.setState({
            
           showPopover : false
        })
        alert('Le produit été ajouter')
        this.allProduct()
             
      })
      .catch( (error:any) => {
        console.log(error);
    
      });
     }

     /* ----- End ------*/
     componentDidMount(){
         this.allProduct()
         this.get_All_Categories_Product()
         
     }

     updateProduct = async (ev:any,id:any) => {
         ev.preventDefault();
         let formData = new FormData();
         const userId = this.props.user === null ? JSON.parse(localStorage.getItem('user')+'')._id : this.props.user
        
        formData.append("name", this.state.name);
        formData.append("id_User", userId);
        formData.append("status", this.state.status);
        formData.append("category_Product_id", this.state.cat_pro_id);
        formData.append("price", this.state.price);
        formData.append("productImage", this.state.image, this.state.image.name);
        console.log(formData)
         axios.put(`http://localhost:3001/api/product/update/${id}`,formData,
         {  
        
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
            console.log("la modification effectué avec succes : ",res)
            this.setState({
            
                showPopover2 : false
             })
             alert('Le produit été modifier')
             this.allProduct()
                 
        })
        }
    deleteProduct = (id:any) => {
        return axios.delete(`http://localhost:3001/api/product/delete/${id}`)
                    .then(res=>
                        {console.log('Delete : ',res)
                        alert('le produit été supprimer avec succes')
                        this.allProduct()
                        })
    }
    render() { 
       
        console.log(this.state.category_Product_name)
        const prd = (this.state.product !== undefined || this.state.product !== null || this.state.product !== []) ?  
        this.state.product.map((item:any,index:any) => {
            return <IonCard key={index}>
               <IonItem>
                 <IonIcon icon={pin} slot="start" />
                 <IonLabel>{item.name} -  {item.price}</IonLabel>
                 <IonButton fill="outline" onClick={ (e: any) => {
                                                e.persist();
                                                this.setState({ showPopover2: true, event: e,id_Product:item._id })
                                                }} color="warning" slot="end">Mod</IonButton> 
                 <IonButton onClick={()=>this.deleteProduct(item._id)} color="danger" fill="outline" slot="end">Supp</IonButton>
               </IonItem>
      
               <IonCardContent>
                 
                <strong>Description </strong>  
           </IonCardContent>
             </IonCard>
        }) : <div>Not yet</div>
       // const lisCatPro =0 
        const lisCatPro = (this.state.category_Product_name !== undefined) ?
        this.state.category_Product_name.map((item:any,index:any) => {
            console.log(item.name)
            return <IonSelectOption   key={index} value={item._id}>{item.name}</IonSelectOption>
          }) : <div>Not yet</div>
          
        return ( 
            
            <div > 
                <IonPopover
                    cssClass='my-custom-class'
                    event={this.state.event}
                    isOpen={this.state.showPopover2}
                    onDidDismiss={() => this.setState ({ showPopover2: false, event: undefined })}
                    
                > 
                    <div className="mx-3 text-center">
                      <h3><strong>Modifier</strong></h3>
                    </div>
                    <form className="ion-padding" onSubmit={(e)=>this.updateProduct(e,this.state.id_Product)}>
                        <IonItem>
                            <IonLabel position="floating">Nom de produit</IonLabel>
                            <IonInput name="name"  value={this.state.name} onIonChange={(e)=>this.handleChange(e)}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Catégorie</IonLabel>
                            <IonSelect name="cat_pro_id" value={this.state.cat_pro_id}  onIonChange={(e)=>this.handleChange(e)} >
                                {lisCatPro}
                            </IonSelect>
                        </IonItem>
                         <IonItem>
                            <IonLabel position="floating">Prix</IonLabel>
                            <IonInput name="price" value={this.state.price} onIonChange={(e) => this.handleChange(e)}/>
                        
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Status</IonLabel>
                         
                            <IonSelect name="status" value={this.state.status}  onIonChange={(e)=>this.handleChange(e)} >
                                <IonSelectOption  >En stock</IonSelectOption>
                                <IonSelectOption  >En rupture de stock</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                        <input type="file" onChange={(ev)=>this.onFileChange(ev)} name='file' />
                        
                            
                        </IonItem>
                        <IonButton className="ion-margin-top" type="submit" expand="block">
                            Modifier
                        </IonButton>
                    </form>
                </IonPopover>

                <IonPopover 
                    cssClass='my-custom-class'
                    event={this.state.event}
                    isOpen={this.state.showPopover}
                    onDidDismiss={() => this.setState ({ showPopover: false, event: undefined })}
                >
                    <div className="mx-3 text-center">
                      <h3><strong>Ajouter un nouveau produit</strong></h3>
                    </div>
                    <form className="ion-padding" onSubmit={(e)=>this.addNewProduct(e)}>
                        <IonItem>
                            <IonLabel position="floating">Nom de produit</IonLabel>
                            <IonInput name="name"  value={this.state.name} onIonChange={(e)=>this.handleChange(e)}/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Catégorie</IonLabel>
                            <IonSelect name="cat_pro_id" value={this.state.cat_pro_id}  onIonChange={(e)=>this.handleChange(e)} >
                                {lisCatPro}
                            </IonSelect>
                        </IonItem>
                         <IonItem>
                            <IonLabel position="floating">Prix</IonLabel>
                            <IonInput name="price" value={this.state.price} onIonChange={(e) => this.handleChange(e)}/>
                        </IonItem>
                        
                        <IonItem>
                        <input type="file" onChange={(ev)=>this.onFileChange(ev)} name='file' />
                       
                        </IonItem>
                      
                        <IonButton className="ion-margin-top" type="submit" expand="block">
                            Ajouter
                        </IonButton>
                    </form>
                </IonPopover>

                { prd }
            
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton  onClick={ (e: any) => {
                                                e.persist();
                                                this.setState({ showPopover: true, event: e })
                                                }}
                    >
                        <IonIcon icon={add} /> 
                    </IonFabButton>
                </IonFab>
            </div>
         );
    }
}
const mapStateToProps = (state:any, ownProps: any) => {
    return {
        ...ownProps,
        token: state.auth.token,
        user: state.auth.user
    }
}
 
export default connect(mapStateToProps)(ProductComponent);