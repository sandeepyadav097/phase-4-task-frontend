import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class Product extends Component{
    constructor(props){
        super(props)
        this.state ={
            products:[]
        }
    }

    componentDidMount = () =>{
            axios.get('http://localhost:8081/api/products').then((result)=>{
            console.log(result.data)
            this.setState({products:result.data})
            }).catch((err) =>{
                console.log(err)

            })
    }

    render() {
        return (
            <div className="container">
                <hr/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}>
                <span style={{fontSize:20}}>Products</span>
                <span><Link to={'/add/product'}> <button  className="btn  btn-warning">Add Products</button>
                </Link>
               &nbsp;
                <span><button className="btn  btn-info" onClick={() =>{this.props.history.goBack()}}>Go back</button></span>
               
                </span>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">S no.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Details</th>
                            <th scope="col">Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((listValue, index) => {
                            console.log(listValue.company)
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><Link to={'/products/id/'+listValue._id}>{listValue.name}</Link></td>
                                    <td>{listValue.code}</td>
                                    <td>{listValue.details}</td>
                                    <td>{listValue.company?<Link to={`/companyProducts/${listValue.company._id}`}>{listValue.company.name}</Link>:"Not Added"}</td>
                                  
                                    {/* <td><Link to={'/notes/'+listValue._id}>See Details</Link></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
