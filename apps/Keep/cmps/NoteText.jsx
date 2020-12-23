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

    render(){
        const txt = this.state.info
        return <textarea name="text" id="" value={txt} onChange={this.onInput}></textarea>
    }
}