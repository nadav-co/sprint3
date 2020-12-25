import { NoteGif } from "./NoteGif.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteText } from "./NoteText.jsx";
import { NoteTodos } from "./NoteTodos.jsx";
import { NoteVideo } from "./NoteVideo.jsx";

export function DynamicCmp(props){
    const {id, idx, line, colors} = props

    switch (line.type) {
    
        case 'NoteText':
            return <NoteText colors={colors}  id={id} info={line.info}  idx={idx}/>
        case 'NoteImg':
            return <NoteImg id={id} info={line.info} idx={idx}/>
        case 'NoteVideo':
            return <NoteVideo id={id} info={line.info} idx={idx}/>
        case 'NoteGif':
            return <NoteGif id={id} info={line.info} idx={idx}/>
        case 'NoteTodos':
            return <NoteTodos colors={colors} id={id} info={line.info} idx={idx}/>
    }
    return null
}