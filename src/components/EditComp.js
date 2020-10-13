import React, {Component} from 'react'
import axios from 'axios'

export default class EditComp extends Component  {

    constructor(props){
        super(props)
        this.state = {
            data:{}
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:8081/api/'+this.props.match.params.type+"/id/"+this.props.match.params.id).
        then((result) => {
            this.setState({data:result.data})
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    handleChange = (event) => {
        console.log(event.target.name, event.target.value)
        this.setState({[event.target.name]:event.target.value})

    }


    handleSubmit = (event) =>{
        event.preventDefault()
if(this.props.match.params.type=="companies"){
    var data={name:this.state.name, street:this.state.street, phone:this.state.phone, id:this.state.data._id}
    console.log("inside companies", data)
  
    axios.put('http://localhost:8081/api/companies',data ).
    then((result)=> {
        console.log("Added")
        alert("Updated")
        this.props.history.goBack();

    }).catch((err) =>{
        console.log(err)
    })

}else{

    var data={name:this.state.name, code:this.state.code, details:this.state.details, id:this.state.data._id}
    console.log("inside products", data)
    
    axios.put('http://localhost:8081/api/products/',data ).
    then((result)=> {
        console.log("Added")
        alert("added")
        this.props.history.goBack();

    }).catch((err) =>{
        console.log(err)
    })
}

    }


    render(){
        if(this.props.match.params.type=='companies'){

            return(
                <div className="container">
                <hr/>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
           <span style={{fontSize:20}}>Edit {this.props.match.params.type}</span>
            <button  className="btn  btn-warning" onClick={() =>{this.props.history.goBack()}}>Go Back</button>

           </div>
          <form className="container" onSubmit={this.handleSubmit}>
<div className="form-group">


<label >Company Name</label>
<input required type="text" name="name"  defaultValue={this.state.data.name} onChange={this.handleChange} className="form-control" placeholder="Name"/>

<label >Company Street</label>
<input required type="text" name="street"  defaultValue={this.state.data.street} onChange={this.handleChange} className="form-control" placeholder="Street"/>

<label >Contact</label>
<input required type="text" name="phone"  defaultValue={this.state.data.phone} onChange={this.handleChange} className="form-control" placeholder="Phone"/>

<br/>
<button type="submit" className="btn btn-primary">Update</button>

</div>


</form>

               
           </div>
       
                 )
        }else{
            return(
               
                    <div className="container">
                    <hr/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
               <span style={{fontSize:20}}>Edit {this.props.match.params.type}</span>
                <button  className="btn  btn-warning" onClick={() =>{this.props.history.goBack()}}>Go Back</button>

               </div>
              <form className="container" onSubmit={this.handleSubmit}>
 <div className="form-group">

 <label >Company Name</label>
 <input required type="text" name="name" onChange={this.handleChange} disabled className="form-control"  defaultValue={this.state.data.company?this.state.data.company.name:""}/>

   <label >Product Name</label>
   <input required type="text" name="name"  defaultValue={this.state.data.name} onChange={this.handleChange} className="form-control" placeholder="Name"/>

   <label >Code</label>
   <input required type="text" name="code"  defaultValue={this.state.data.code} onChange={this.handleChange} className="form-control" placeholder="Code/Model"/>

   <label >details</label>
   <input required type="text" name="details"  defaultValue={this.state.data.details} onChange={this.handleChange} className="form-control" placeholder="Details"/>

<br/>
   <button type="submit" className="btn btn-primary">Update</button>

   </div>
 
  
</form>

                   
               </div>
                )
        }
        
    }
} 