import { keepService } from "../services/keep-service.js"

export class NoteVideo extends React.Component {

    state = {
        isDeleted: false
    }

    onDelete = () => {
        this.setState({isDeleted: true})
        keepService.deleteLine(this.props.id, this.props.idx)
    }

    render(){
        if (this.state.isDeleted) return null
        const src = this.props.info
        const isYouTubeVid = src.includes('youtube')

        return(
        <div className="note-video">
            <button className="delete" onClick={this.onDelete}>x</button>
            {isYouTubeVid && <iframe src={src} title="W3Schools Free Online Web Tutorials"></iframe>}
            {!isYouTubeVid && <video autoPlay controls>
                <source src={src} type="video/mp4" />
                <source src={src} type="video/ogg" />
            </video>}
        </div>
        )
    }
}