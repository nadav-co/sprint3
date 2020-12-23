import { keepService } from "../services/keep-service.js"

export class NoteTodos extends React.Component{ 
    
    state ={
        type: 'NoteTodos',
        info:null
    }

    componentDidMount() {
        const {info} = this.props
        this.setState({info})

    }

    onInput = (ev) => {
        const infoCopy = {...this.state.info}
        if(+ev.target.name || +ev.target.name === 0) infoCopy.todos[ev.target.name].txt =  ev.target.value
        else infoCopy.label = ev.target.value
        this.setState({info: infoCopy}, this.onSave)
    }
    
    onSave = () =>  keepService.saveChanges(this.props.id, this.props.idx, this.state)


    render(){
        if (!this.state.info) return <h1>loading</h1>
        const {info} = this.props
        return(
            <div className="todos">
            <input onChange={this.onInput} name="label" type="text" className="todo-title" value={this.state.info.label}/>
            <ul>
                {info.todos.map((todo,idx) => <li key={idx}><input onChange={this.onInput} name={idx} type="text" value={this.state.info.todos[idx].txt}/></li>)}
            </ul>
        </div>
    )
        }
}
