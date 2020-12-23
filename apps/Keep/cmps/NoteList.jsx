import { DynamicCmp } from "./DynamicCmp.jsx";
import { NotePreview } from "./NotePreview.jsx";

export function NoteList(props){
    const {pinned, unPinned} = props
    return (
        <section>
            <div className="pinned">
                <h1>pinned</h1>
                {pinned.map((note, idx) => <NotePreview key={idx} note={note}/>)}
            </div>

            <div>
                <h1>unPinned</h1>
                {unPinned.map((note, idx) => <NotePreview key={idx} note={note}/>)}
            </div>

        </section>
            )
}