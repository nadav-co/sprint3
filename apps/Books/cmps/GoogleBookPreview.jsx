export function GoogleBooksPreview(props){
    return (
        <li className="flex">{props.book.volumeInfo.title} <button onClick={props.addBook}>+</button></li>
    )
}