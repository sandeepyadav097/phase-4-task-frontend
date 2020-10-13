import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class Product extends Component{
    constructor(props){
        super(props)
        this.state ={
            products:[],
            companyName:''
        }
    }

    componentDidMount = () =>{
            console.log(this.props)
            axios.get(`http://localhost:8081/api/products/company/${this.props.match.params.id}`).then((result)=>{
            console.log(result.data)
            if(result.data.length>0){
                this.setState({products:result.data, companyName:result.data[0].company.name})
               
            }
            }).catch((err) =>{
                console.log(err)

            })
    }

    render() {
        return (
            <div className="container">
                <hr/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
                <span style={{fontSize:20}}>{this.state.companyName} Products</span>

<div>
<span><button className="btn  btn-success" onClick={() =>{this.props.history.push(`/add/products`)}}>Add products</button></span>
&nbsp;&nbsp;&nbsp;
<span><button className="btn  btn-warning" onClick={() =>{this.props.history.push(`/edit/companies/${this.props.match.params.id}`)}}>Edit Company Info</button></span>
&nbsp;&nbsp;&nbsp;
                <span><button className="btn  btn-info" onClick={() =>{this.props.history.goBack()}}>Go back</button></span>
               
            
                </div>
      
              </div>


            {this.state.products.length>0?    <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">S no.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Details</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((listValue, index) => {
                           // console.log(listValue.company)
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><Link to={'/products/id/'+listValue._id}>{listValue.name}</Link></td>

                                    <td>{listValue.code}</td>
                                    <td>{listValue.details}</td>
                                    {/* <td><Link to={'/notes/'+listValue._id}>See Details</Link></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>:
                <div className="container text-center" style={{display:'flex', flexDirection:'column', marginTop:40}}>
                    <h4>
                        No Products Added Yet !!
                        <br/>
                    
                        </h4>
                        <h1> &#128577;</h1>  
                </div>
           }

             </div>
        )
    }
}
