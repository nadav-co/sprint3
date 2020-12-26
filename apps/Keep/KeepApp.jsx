import { bus } from "../../services/event-bus-service.js"
import { KeepHeader } from "./cmps/KeepHeader.jsx"
import { NoteDemo } from "./cmps/NoteDemo.jsx"
import { NoteList } from "./cmps/NoteList.jsx"
import { keepService } from "./services/keep-service.js"

export class KeepApp extends React.Component {

    state = {
        notes: [],
        filter: '',
        isDemo: false
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
    }
    onToggleDemo = () => this.setState({isDemo: !this.state.isDemo})

    getNotesForDisp = () => {
    return this.state.notes.filter(note => note.lines.some(line => {
        var {info} = line
        if (typeof info === 'string') return info.toLowerCase().includes(this.state.filter)
        else if (info.todos) return info.todos.some(todo => todo.txt.toLowerCase().includes(this.state.filter) )
    }))
    }

    onChangeFilter = (filter) => {
        this.setState({filter})
    }

    render() {
        if (!this.state.notes ) return <h1>Loading...</h1>
        const notes = this.getNotesForDisp()
        const pinned = notes.filter(note => note.isPinned)
        const unPinned = notes.filter(note => !note.isPinned)

        return (
            <section>
                {!this.props.id && <button className="start-demo" onClick={this.onToggleDemo}>Tutorial</button>}
                <hr/>
                <KeepHeader onToggleDemo={this.onToggleDemo} />
                {!this.state.isDemo &&<NoteList onChangeFilter={this.onChangeFilter} pinned={pinned} unPinned={unPinned} />}
                
                {this.state.isDemo && <NoteDemo toggleDemo={this.onToggleDemo}/>}
                {this.state.isDemo && <div className="demo-screen" onClick={ev => ev.stopPropagation()}></div>}
                {this.state.isDemo && <div className="footer-pusher"></div>}
                
                
            </section>
        )
    }
}