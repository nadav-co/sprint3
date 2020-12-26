const { Link } = ReactRouterDOM;

export function BookPreview(props){
    const book = props.book
    var currency
    switch(book.listPrice.currencyCode) {
        case 'USD':
            currency = '$'
            break
        case 'EUR':
            currency = '€'
            break
        case 'ILS':
            currency = '₪'
            break
    }


    return (
        <Link to={`/book/details/${book.id}`}>
            <div  className="book-prev flex col">
                <img src={book.thumbnail} alt=""/>
                <h1>{book.title}</h1>
                <h3>Price: <span className={book.listPrice.amount < 20 ? 'green' : book.listPrice.amount > 150 ? 'red' : ''}>{book.listPrice.amount} </span> {currency}</h3>
            </div>
        </Link>
            
                
        ) 
}
    
    

