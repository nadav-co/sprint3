import { keepService } from "../services/keep-service.js"

export class NoteText extends React.Component{

    state = {
      type: 'NoteText',
      info: 'my first note',
    }

    componentDidMount() {
        const {info} = this.props
        this.setState({info})
    }

    onInput = (ev) => {
        
            this.setState({info: ev.target.value },this.onSave)
    }

    onSave = () => keepService.saveChanges(this.props.id, this.props.idx, this.state)

    onDelete = () => {
        this.setState({type: '',info: ''})
        keepService.deleteLine(this.props.id, this.props.idx)
    }

    render(){
        const txt = this.state.info
        if (!this.state.type) return null
        return (
        <div className="note-text">
            <button className="delete" onClick={this.onDelete}>x</button>
            <textarea name="text" id="" value={txt} onChange={this.onInput}></textarea>
        </div>
            
        )
    }
}