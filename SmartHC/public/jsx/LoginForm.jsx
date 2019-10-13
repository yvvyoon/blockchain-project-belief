class LoginForm extends React.Component{
    send=()=>{
        const send_param={
            id:this.id.value,
            pw:this.pw.value
        }
        //alert(JSON.stringify(send_param));
        
        axios.post('/contact/login',send_param)
        .then((response)=>{
            alert(response.data);
            console.log(response);
            window.location.assign("/medical/medical_report_req");
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    
    render(){     
        const main={
            width:'900px',
            height:'800px',
            margin:'30px auto'
            }
        const first={
            width:'400px',
            height:'740px',
            boxShadow:'0 0 0 1px rgba(14,41,57,0.12),0 2px 5px rgba(14,41,57,0.44),inset 0 -1px 2px rgba(14,41,57,0.15)',
            float:'left',
            padding:'10px 50px 0',
            background:'linear-gradient(#fff,#f2f6f9)'
            }
       
            const     input={
            width:'400px',
            padding:'5px',
            marginTop:'10px',
            marginBottom:'10px',
            borderRadius:'5px',
            border:'1px solid #cbcbcb',
            boxShadow:'inset 0 1px 2px rgba(0,0,0,0.18)',
            fontSize:'16px'
            }
            
            const input_type_submit={
            background:'linear-gradient(to bottom,#22abe9 5%,#36caf0 100%)',
            boxShadow:'inset 0 1px 0 0 #7bdcf4',
            border:'1px solid #0F799E',
            color:'#fff',
            fontSize:'19px',
            fontWeight:'700',
            cursor:'pointer',
            textShadow:'0 1px 0 #13506D'            
            }
            
            
        return (
          
            <div style={main}>
                <div style={first}>
                
                <h1>LOGIN</h1>                
            
                <input style={input}  placeholder="ID" ref={ref=>this.id=ref}/>
                <input style={input}  placeholder="PW" ref={ref=>this.pw=ref} type="password" />                
                <input  onClick={this.send}  style={input_type_submit}  type="submit" value="Login"/>
               
                
                </div>
            </div>
           
        )
    }
}
 
ReactDOM.render( 
    <LoginForm / > ,
    document.getElementById('react-login-form')
)
