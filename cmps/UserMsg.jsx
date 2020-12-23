import {bus} from '../services/event-bus-service.js'


export class UserMsg extends React.Component {
    
    state = {
      msg:null
    }

    unsubscribe = null

    componentDidMount() {
        this.unsubscribe = bus.on('userMsg',this.onUserMsg)

    }

    componentWillUnmount() {
        this.unsubscribe()
        this.setState({msg:null})
    }
    
    onUserMsg = (msg) =>{
        this.setState({msg})
        setTimeout(() => this.setState({msg:null}),3000)
    }

    render() {
        const msg = this.state.msg
        if (!msg) return null
        return (
            <section className={`user-msg ${msg.status}`}>
                <button onClick={() => this.setState({msg: null})}>X</button>
                <h1>{msg.txt}</h1>
                {msg.link && <a href={msg.link}>Check it Out</a>}
            </section>
        )
    }
}