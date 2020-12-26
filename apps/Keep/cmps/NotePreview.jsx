import { keepService } from "../services/keep-service.js"
import { bus } from "../../../services/event-bus-service.js"
import { DynamicCmp } from "./DynamicCmp.jsx"
import { LineAdd } from "./LineAdd.jsx"

const {Link } = ReactRouterDOM;

export class NotePreview extends React.Component {

    state = {
        isDeleted:false,
        borderColor:'rgb(0, 153, 255)',
        backgroundColor:'rgb(246, 246, 246)'
    }

    componentDidMount() {
        const {note} = this.props
        if (note.colors) this.setState({borderColor: note.colors.borderColor, backgroundColor: note.colors.backgroundColor})
    }
    

    onDelete = () => {
        this.setState({isDeleted: true})
        keepService.deleteNote(this.props.note.id)
    }
    onTogglePin = (note) => {
        const noteCopy = {...note}
            noteCopy.isPinned = !note.isPinned
            this.onSave(noteCopy)
    }

    onSave = (noteCopy) => {
        keepService.saveNoteChange(noteCopy)
        .then(bus.emit('reloadNotes'))
    }

    handleChange = (note, ev) => {
        this.setState({[ev.target.name]: ev.target.value},() => this.onSaveColors(note))
    }

    onSaveColors = (note) => {
        const {borderColor} = this.state
        const {backgroundColor} = this.state
        const noteCopy = {...note}
        noteCopy.colors = {borderColor, backgroundColor}
        this.onSave(noteCopy)
    }

    render() {
        const {note} = this.props
        const {borderColor} = this.state
        const {backgroundColor} = this.state
        if (!note || this.state.isDeleted) return null
        return (
            <div className="note flex slide-top" style={{borderColor,backgroundColor}}>
                <button className="delete" onClick={this.onDelete}>x</button>
                
                <ul className="actions flex">
                    <li className="pin" onClick={()=>this.onTogglePin(note)}>&#128204;</li>
                    <li><Link to={`/mail/compose/${note.id}`}><img src="assets/img/send.png" alt=""/></Link></li>
                    <li><label htmlFor={`borderColor${note.id}`}><img src="assets/img/border.png" alt="fuckkkkk"/></label></li>
                    <li><input onChange={(event) => this.handleChange(note, event)} type="color" name="borderColor" value={this.state.borderColor} id={`borderColor${note.id}`} hidden/></li>
                    <li><label htmlFor={`backgroundColor${note.id}`}><img src="assets/img/fill.png" alt="fuckkkk2" alt="fuckkkkk"/></label></li>
                    <li><input onChange={(event) => this.handleChange(note, event)} type="color" name="backgroundColor" id={`backgroundColor${note.id}`} value={this.state.backgroundColor} hidden/></li>
                </ul>

                {note.lines.map((line, idx) => <DynamicCmp colors={note.colors} id={note.id} key={line.id+`${Math.random()}`} idx={idx} line={line} />)}
                <LineAdd id={note.id}/>
            </div>
        )
    }
}