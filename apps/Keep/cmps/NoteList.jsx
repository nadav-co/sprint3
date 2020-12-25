import { DynamicCmp } from "./DynamicCmp.jsx";
import { NotePreview } from "./NotePreview.jsx";

export class NoteList extends React.Component{

    state = {
        filter:''
    }

    onChange = (ev) => {
        this.setState({filter: ev.target.value})
        this.props.onChangeFilter(ev.target.value)
    }


    render(){
    const {pinned, unPinned} = this.props
    return (
        <section className="notes-container .slide-top">
            <input className="search-bar" onChange={this.onChange} type="text" placeholder="Search" value={this.state.filter}/>
            <h2>Pinned</h2>
            <div className="pinned flex">
                {pinned.map((note) => <NotePreview key={note.id} note={note}/>)}
            </div>
            <hr/>


            <div className="unpinned flex">
                {unPinned.map((note) => <NotePreview key={note.id} note={note}/>)}
            </div>

        </section>
            )
    }
}