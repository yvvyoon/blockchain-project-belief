class MedicalReportForm extends React.Component{
    send=()=>{
        const data={
            pcode:this.pcode.value,
            name:this.name.value,
            ssn:this.ssn.value,
            // addr:this.addr.value,
            // email:this.email.value,
            // visitDate:this.visitDate.value,
            // desease:this.desease.value,
            // deseaseCode:this.deseaseCode.value,
            // content:this.content.value
        }
        alert(JSON.stringify(data));
        
        axios.post('/medical/medicalFormInsertOne', data)
        .then((response)=>{
            alert(response.data);
            console.log(response);
            
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
       
            const label={
            fontSize:'17px'            
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
            const select={
                padding:'13px'
            }
            const     textarea={
            width:'400px',
            height:'100px',
            padding:'10px',
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
            const center={
                align:'center'
            }
            
        return (
          
            <div style={main}>
                <div style={first}>
                <form action="" method="post">
                <h1>Medical Report Form</h1>
                <h4>Please fill all entries.</h4><hr/>
                <label style={label}>환자코드 :</label>
                <input style={input}  placeholder="p003" ref={ref=>this.pcode=ref}/>
                <label style={label}>Name :</label>
                <input style={input}  placeholder="Park" ref={ref=>this.name=ref}/>
                <label style={label}>주민등록번호 :</label>
                <input style={input}  placeholder="901010-1010111" ref={ref=>this.ssn=ref}/>
                {/* <label style={label}>주소 :</label>
                <input style={input}  placeholder="Busan" ref={ref=>this.addr=ref}/>
                <label style={label}>Email :</label>
                <input style={input}  placeholder="park@test.com" type="email" ref={ref=>this.email=ref}/>
                <label style={label}>진료일 :</label>
                <input style={input}  type="date" ref={ref=>this.visitDate=ref} />
                <label style={label}>상병부위 :</label>
                <input style={input}  placeholder="hand" ref={ref=>this.desease=ref} />
                <label style={label}>상병명 :</label> */}
                {/* <select name="select" style={select} ref={ref=>this.deseaseCode=ref}>
                <option value="value1">001</option> 
                <option value="value2">002</option>
                <option value="value3">003</option>
                </select><br/><br/>
                <label style={label}>진료내용 :</label>
                <textarea style={textarea}  placeholder="hand shake..." 
                ref={ref=>this.content=ref}>
                </textarea> */}
               
                <input style={input_type_submit} onClick={this.send} type="submit" value="Send"/>
               
                </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render( 
    <MedicalReportForm / > ,
    document.getElementById('react-medical-report-form')
);