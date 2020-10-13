import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class Details extends Component {

    constructor(props){
        super(props)
        this.state={
             note:{},
             
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        axios.get('http://localhost:3001/notes/'+this.props.match.params.id).then((result) =>{
            this.setState({note:result.data})
        }
            
        ).catch((err) =>{
            console.log(err)
        })
    }

   

    render(){
        return(
            <div className="container">
              
                <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Details of {this.state.note.title}
                        </h3>
                        <br />
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Notes Title</th>
                                    <td>{this.state.note.title}</td>
                                </tr>
                                <tr>
                                    <th>Notes Content</th>
                                    <td>{this.state.note.content}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

<Link className="btn btn-warning" to={"/notes/edit/"+this.props.match.params.id}>Edit</Link> 
&nbsp;&nbsp;&nbsp;
<button  className="btn  btn-info" onClick={() =>{this.props.history.goBack()}}>Go Back</button>

            </div>     </div>
            
        )
    }
}