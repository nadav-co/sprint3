import { DynamicCmp } from "./DynamicCmp.jsx";
import { NotePreview } from "./NotePreview.jsx";

export function NoteList(props){
    const {pinned, unPinned} = props
    return (
        <section>
                <h1>pinned</h1>
            <div className="pinned flex">
                {pinned.map((note, idx) => <NotePreview key={idx} note={note}/>)}
            </div>

                <h1>unPinned</h1>
            <div className="unpinned flex">
                {unPinned.map((note, idx) => <NotePreview key={idx} note={note}/>)}
            </div>

        </section>
            )
}