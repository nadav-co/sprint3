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

    onDelete = () => {
        this.setState({type: '',info: ''})
        keepService.deleteLine(this.props.id, this.props.idx)
    }

    toggelDone = (idx) => {
        const {info} = {...this.state}
        info.todos[idx].isDone = !info.todos[idx].isDone
        this.setState({info})
        this.onSave()
    }

    render(){
        if (!this.state.info) return null
        const {info} = this.props
        const backgroundColor = this.props.colors ? this.props.colors.backgroundColor : 'rgb(246, 246, 246)'
        const borderColor = this.props.colors ? this.props.colors.borderColor : 'rgb(0, 153, 255)'
        return(
            <div className="note-todos">
                <button className="delete" onClick={this.onDelete}>x</button>
            <input style={{backgroundColor}} onChange={this.onInput} name="label" type="text" className="todo-title" value={this.state.info.label}/>
            <ul>
                {info.todos.map((todo,idx) => <li className="flex" key={idx}><div onClick={()=>this.toggelDone(idx)} className="is-done" style={{borderColor, backgroundColor: (todo.isDone) ? borderColor : backgroundColor}}></div><input style={{backgroundColor}} onChange={this.onInput} name={idx} type="text" value={this.state.info.todos[idx].txt}/></li>)}
            </ul>
        </div>
    )
        }
}
