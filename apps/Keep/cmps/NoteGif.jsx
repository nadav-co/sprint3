import { keepService } from "../services/keep-service.js"

export class NoteGif extends React.Component {

    state = {
        isDeleted: false
    }

    onDelete = () => {
        this.setState({isDeleted: true})
        keepService.deleteLine(this.props.id, this.props.idx)
    }

    render(){
        if (this.state.isDeleted) return null
        return(
        <div className="note-video">
            <button className="delete" onClick={this.onDelete}>x</button>
            <video autoPlay loop>
                <source src={this.props.info} type="video/mp4" />
                <source src={this.props.info} type="video/ogg" />
            </video>
        </div>
        )
    }
}