import { bus } from "../../services/event-bus-service.js"
import { KeepHeader } from "./cmps/KeepHeader.jsx"
import { NoteList } from "./cmps/NoteList.jsx"
import { keepService } from "./services/keep-service.js"

export class KeepApp extends React.Component {

    state = {
        notes: [],
     
    }

    componentDidMount() {
        this.reloadNotes()
        this.unsubscribe = bus.on('reloadNotes', this.reloadNotes)
    
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    reloadNotes = () => {
        keepService.query()
            .then(notes => {
                this.setState({ notes })
        })
        // .then(this.setPinnedNotes)
        // .then(this.setUnpinnedNotes)
    }

    



     

    render() {
        if (!this.state.notes ) return <h1>Loading...</h1>
        const pinned = this.state.notes.filter(note => note.isPinned)
        const unPinned = this.state.notes.filter(note => !note.isPinned)

        return (
            <section>
                <KeepHeader />
                <NoteList pinned={pinned} unPinned={unPinned} />
            </section>
        )
    }
}