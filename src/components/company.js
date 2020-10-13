import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class Company extends Component{
    constructor(props){
        super(props)
        this.state ={
            companies:[]
        }
    }

    componentDidMount = () =>{
            axios.get('http://localhost:8081/api/companies').then((result)=>{
            console.log(result.data)
            this.setState({companies:result.data})
            }).catch((err) =>{
                console.log(err)

            })
    }

    render() {
        return (
            <div className="container">
                <hr/>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
                <span style={{fontSize:20}}>Companies</span>
                <span><Link to={'/add/company'}> <button  className="btn  btn-warning">Add Company</button>
                </Link>
                </span>

                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">S no.</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companies.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><Link to={"/companyProducts/"+listValue._id}>{listValue.name}</Link></td>
                                    <td>{listValue.street}</td>
                                    <td>{listValue.phone}</td>
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
