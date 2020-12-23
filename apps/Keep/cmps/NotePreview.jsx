import { DynamicCmp } from "./DynamicCmp.jsx"

export class NotePreview extends React.Component {
    
    state = {
        note:null
    }

    componentDidMount() {
        const {note} = this.props
        this.setState({note})
    }

    onInput = (idx) =>{
        console.log(idx);
    }

    render() {
        const {note} = this.state
        if (!note) return <h1>Loading...</h1>
        return (
            <div className="note">
                {note.lines.map((line, idx) => <DynamicCmp onInput={this.onInput} id={note.id} key={idx} idx={idx} line={line} />)}
            </div>
        )
    }
}