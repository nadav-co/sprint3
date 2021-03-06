import { keepService } from "../services/keep-service.js"

export class NoteImg extends React.Component {

    state = {
        isDeleted:false 
    }

    onDelete = () => {
        this.setState({isDeleted: true})
        keepService.deleteLine(this.props.id, this.props.idx)
    }

    render(){
        if (this.state.isDeleted) return null
        return(
        <div className="note-img">
            <button className="delete" onClick={this.onDelete}>x</button>
            <img src={this.props.info} alt=""/>
        </div>
        )
    }
}