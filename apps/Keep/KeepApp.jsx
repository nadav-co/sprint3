import { NoteList } from "./cmps/NoteList.jsx"
import { keepService } from "./services/keep-service.js"

export class KeepApp extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        keepService.query()
        .then(notes => this.setState({ notes}))
        
    }

    get pinnedNotes() {
        return this.state.notes.filter(note => note.isPinned)
    }

    get unPinnedNotes() {
        return this.state.notes.filter(note => !note.isPinned)

    }

    render() {
        if (!this.state.notes) return <h1>Loading...</h1>

        return (
        <section>
            <NoteList pinned={this.pinnedNotes} unPinned={this.unPinnedNotes}/>
        </section>
        )
    }
}