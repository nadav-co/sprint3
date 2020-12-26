import { GoogleBooksPreview } from "./GoogleBookPreview.jsx"

export function GoogleBooksList(props){
    
return props.googleBooks.map((book, idx) => <GoogleBooksPreview key={book.id} book={book} addBook={()=> props.addBook(idx)}/>)
}
