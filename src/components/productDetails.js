import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product:{}
        }
    }

    getProducts() {
        axios.get(`http://localhost:8081/api/products/id/`+this.props.match.params.id)
            .then(result => {
                const product = result.data;
                this.setState({ product });
                //console.log(this.state.notes);
            })
            .catch(error => console.log('there is some error ', error))
    }

    componentDidMount() {
        this.getProducts();
    }

    delete = () => {
        
        axios.delete("http://localhost:8081/api/products/"+this.state.product._id).then((result) => {
            console.log("Deleted")
            this.props.history.push("/products")
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Details of {this.state.product?this.state.product.name:""}</h3>
                <table className="table">
                    <thead className="thead-light">
                       
                    </thead>
                    <tbody>
                      
                                <tr >
                                    
                                    <td>Product Name</td>
                                   
                                    <td>{this.state.product.name}</td>
                                 
                                     </tr>

                                     <tr >
                                    
                                    <td>Company</td>
                                   
                                    <td>{this.state.product.company?this.state.product.company.name:""}</td>
                                 
                                     </tr>

                                     <tr >
                                    
                                    <td>Code/Model</td>
                                   
                                    <td>{this.state.product.code}</td>
                                 
                                     </tr>

                                     <tr >
                                    
                                    <td>Details</td>
                                   
                                    <td>{this.state.product.details}</td>
                                 
                                     </tr>
                                     

                            
                      
                    </tbody>
                </table>

                <button  className="btn  btn-warning" onClick={() =>{this.props.history.goBack()}}>Go Back</button>
                &nbsp;&nbsp;&nbsp;
                <button  className="btn  btn-info" onClick={() => this.props.history.push("/edit/products/"+this.state.product._id)}>Edit</button>
                &nbsp;&nbsp;&nbsp;
                <button  className="btn  btn-danger" onClick={() => this.delete()}>Delete</button>

            </div>
        )
    }
}