import { keepService } from "../services/keep-service.js"
import { bus } from "../../../services/event-bus-service.js"
import { DynamicCmp } from "./DynamicCmp.jsx"
import { LineAdd } from "./LineAdd.jsx"

export class NotePreview extends React.Component {

    state = {
        deleted:false,
        borderColor:'rgb(0, 153, 255)',
        backgroundColor:'rgb(246, 246, 246)'
    }

    onDelete = () => {
        this.setState({deleted: true})
        keepService.deleteNote(this.props.note.id)
    }
    onTogglePin = (note) => {
        const noteCopy = {...note}
            noteCopy.isPinned = !note.isPinned
            this.onSave(noteCopy)
            
       
        // this.setState({note:noteCopy},this.onSave)
    }

    onSave = (noteCopy) => {
        // console.log(this.state.note)
        keepService.saveNoteChange(noteCopy)
        .then(bus.emit('reloadNotes'))
        
    }

    handleChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    render() {
        const {note} = this.props
        const {borderColor} = this.state
        const {backgroundColor} = this.state
        if (!note || this.state.deleted) return null
        return (
            <div className="note flex" style={{borderColor,backgroundColor}}>
                <button className="delete" onClick={this.onDelete}>x</button> 
                <ul className="actions flex">
                    <li className="pin" onClick={()=>this.onTogglePin(note)}>&#128204;</li>
                    <li><label htmlFor={`borderColor${note.id}`}><img src="../assets/img/border.png" alt="fuckkkkk"/></label></li>
                    <li><input onChange={this.handleChange} type="color" name="borderColor" value={this.state.borderColor} id={`borderColor${note.id}`} hidden/></li>
                    <li><label htmlFor={`backgroundColor${note.id}`}><img src="../assets/img/fill.png" alt="fuckkkk2" alt="fuckkkkk"/></label></li>
                    <li><input onChange={this.handleChange} type="color" name="backgroundColor" id={`backgroundColor${note.id}`} value={this.state.backgroundColor} hidden/></li>
                </ul>

                {note.lines.map((line, idx) => <DynamicCmp id={note.id} key={line.id} idx={idx} line={line} />)}
                <LineAdd id={note.id}/>
            </div>
        )
    }
}