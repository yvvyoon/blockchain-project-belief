class GetHistoryCond extends React.Component {
    send = () => {
        const data = {
            member_no: this.member_no.value,
            startTime: this.startTime.value,
            endTime: this.endTime.value
        }

        alert(JSON.stringify(data));

        axios.post('/medical/getHistoryCondPost', data)
            .then((response) => {
                alert(response.data);

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const main = {
            width: '900px',
            height: '800px',
            margin: '30px auto'
        }

        const first = {
            width: '400px',
            height: '740px',
            boxShadow: '0 0 0 1px rgba(14,41,57,0.12),0 2px 5px rgba(14,41,57,0.44),inset 0 -1px 2px rgba(14,41,57,0.15)',
            float: 'left',
            padding: '10px 50px 0',
            background: 'linear-gradient(#fff,#f2f6f9)'
        }

        const label = {
            fontSize: '17px'
        }
        
        const input = {
            width: '400px',
            padding: '5px',
            marginTop: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #cbcbcb',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.18)',
            fontSize: '16px'
        }

        const select = {
            padding: '13px'
        }

        const textarea = {
            width: '400px',
            height: '100px',
            padding: '10px',
            marginTop: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #cbcbcb',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.18)',
            fontSize: '16px'
        }

        const input_type_submit = {
            background: 'linear-gradient(to bottom,#22abe9 5%,#36caf0 100%)',
            boxShadow: 'inset 0 1px 0 0 #7bdcf4',
            border: '1px solid #0F799E',
            color: '#fff',
            fontSize: '19px',
            fontWeight: '700',
            cursor: 'pointer',
            textShadow: '0 1px 0 #13506D'
        }

        const center = {
            align: 'center'
        }

        return (
            <div style={main}>
                <div style={first}>
                    <form action="" method="post">
                        <h1>Medical Report Form</h1>
                        <h4>Please fill all entries.</h4><hr />
                        <label style={label}>사원번호 :</label>
                        <input style={input} placeholder="p003" ref={ref => this.member_no = ref} />
                        <label style={label}>시작시간 :</label>
                        <input style={input} placeholder="p003" ref={ref => this.startTime = ref} />
                        <label style={label}>종료시간 :</label>
                        <input style={input} placeholder="p003" ref={ref => this.endTime = ref} />
                        <input style={input_type_submit} onClick={this.send} type="submit" value="Send" />
                        <textarea name="" id="historyArea" cols="30" rows="10"></textarea>
                    </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <GetHistoryCond />,
    document.getElementById('react-history-cond-form')
);