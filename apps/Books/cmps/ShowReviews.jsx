export function Reviews(props) {
    if (!props.book.reviews) return (
        <section>
            <h2>Reviews (0)</h2>
            <button onClick={props.addReview}>Add Review</button>
        </section>

    )
    return (
        <section className="book-reviews">
            <h2>Reviews ({props.book.reviews && props.book.reviews.length})</h2>
            <button onClick={props.addReview}>Add Review</button>
            {props.book.reviews.map(review => {
                return (
                    <div key={review.id} className="review-card">
                        <button onClick={() => props.deleteReview(review.id)}>x</button>
                        <h1>{review.readerName}</h1>
                        <h1>Rate:{review.rate}</h1>
                        <h1>Read at:{review.readAt}</h1>
                        <p>{review.txt}</p>
                    </div>
                )
            })}
        </section>
    )
}