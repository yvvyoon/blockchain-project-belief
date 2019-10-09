var { Component } = React;
var { Router, Route, IndexRoute, Link } = ReactRouter;

class Main extends Component {
    render() {
        return (
            <div>
                <h1>Hyperledger Fabric Study</h1>
                <ul className="header" >
                    <li><Link exact to="/">Home</Link></li>
                    <li><Link to="/basic">BasicNetwork</Link></li>
                    <li><Link to="/first">FirstNetwork</Link></li>
                </ul>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <div>
                <h2>HELLO</h2>
                <p>안녕하세요? 하이퍼레저에 접속하는 노드 웹 예제입니다. 잘해보죠~!!!</p>
            </div>
        );
    }
}
class BasicNetwork extends Component {
    basic_network = () => {
        axios.get('/basic_network')
            .then((response) => {
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });
    }
    send = () => {
        alert(this.amount.value);
        axios.post('/basic_network', { "amount": this.amount.value })
            .then((response) => {
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>BasicNetwork</h2>
                <p><button onClick={this.basic_network}>연결</button></p>
                <br />
                <div>a가 b에게 {' '}
                    <input placeholder='송금량' ref={ref => this.amount = ref} />원을 {' '}
                    <button onClick={this.send}  > 보내기</button><br />
                </div>
            </div>
        );
    }
}
class FirstNetwork extends Component {

    render() {
        return (
            <div>
                <h2>FirstNetwork에 연결 해보세요</h2>
            </div>
        );
    }
}

ReactDOM.render(
    (<Router>
        <Route path="/" component={Main} >
            <Route path="basic" component={BasicNetwork} />
            <Route path="first" component={FirstNetwork} />
            <IndexRoute component={Home} />
        </Route>
    </Router>)
    , document.getElementById("root")
);