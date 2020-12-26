import { BookPreview } from "../cmps/BookPreview.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { AddBook } from "../cmps/AddBook.jsx"
import { bookService } from "../services/book-service.js"
import { bus } from "../../../services/event-bus-service.js"

export class BookList extends React.Component{

    state = {
        books: [],
        filterBy:{
            name: '',
            minPrice: -Infinity,
            maxPrice: Infinity
        },
    }

    unSubscribe = null

    componentDidMount() {
        this.onReloadBooks()
        this.unSubscribe = bus.on('getBooks',()=> this.state.books)
    }

    componentWillUnmount() {
        this.unSubscribe()
    }
    
    onReloadBooks = () => {
        bookService.query()
        .then((books) => this.setState({ books}))
    }

    getBooksForDisplay = () => {
        const {filterBy} = this.state
        return this.state.books.filter(book => {
            return book.title.toLowerCase().includes(filterBy.name.toLowerCase()) && book.listPrice.amount > filterBy.minPrice && book.listPrice.amount < filterBy.maxPrice
        })
    }

    setFilter = (filterBy) => {
        this.setState({filterBy})
        
    }

    render(){
        const {books} = this.state
        return(
        <section>
            <header className="book-header flex">
                <BookFilter setFilter={this.setFilter}/>
                <AddBook reloadBooks={this.onReloadBooks}/>
            </header>
            <div className="books-container">
                {books.map(book => <BookPreview key={book.id} book={book}/>)}
            </div>
            
        </section>
        )
        
    }
}