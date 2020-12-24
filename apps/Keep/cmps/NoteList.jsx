import { DynamicCmp } from "./DynamicCmp.jsx";
import { NotePreview } from "./NotePreview.jsx";

export function NoteList(props){
    const {pinned, unPinned} = props
    return (
        <section className="notes-container">
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