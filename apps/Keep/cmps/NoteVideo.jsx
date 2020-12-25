import { keepService } from "../services/keep-service.js"

export class NoteVideo extends React.Component {

    state = {
        isDeleted: false
    }

    onDelete = () => {
        this.setState({isDeleted: true})
        keepService.deleteLine(this.props.id, this.props.idx)
    }

    get YouTubeUrl(){
        var videoId = this.props.info.split('v=')[1]
        var amperIdx = videoId.indexOf('&')
        if(amperIdx != -1) videoId = videoId.substring(0, amperIdx)
        return `https://www.youtube.com/embed/${videoId}`
    }

    render(){
        if (this.state.isDeleted) return null
        const src = this.props.info
        const isYouTubeVid = src.includes('youtube')

        return(
        <div className="note-video">
            <button className="delete" onClick={this.onDelete}>x</button>
            {isYouTubeVid && <iframe src={this.YouTubeUrl} title="W3Schools Free Online Web Tutorials"></iframe>}
            {!isYouTubeVid && <video autoPlay controls>
                <source src={src} type="video/mp4" />
                <source src={src} type="video/ogg" />
            </video>}
        </div>
        )
    }
}