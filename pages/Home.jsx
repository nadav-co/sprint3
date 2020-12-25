export class Home extends React.Component {

    state = {

    }

    componentDidMount() {

    }

    render() {
        return (
            <section>
                <div className="home-container">
                    <div className="home-img mail roll-in-top" > <img src="../assets/img/home-mail.jpg" alt="" /></div>
                    <div className="home-img keep roll-in-left"> <img src="../assets/img/home-keep2.png" alt="" /></div>
                    <div className="home-img book roll-in-right"> <img src="../assets/img/home-book.jpg" alt="" /></div>
                </div>
            </section>
        )
    }
}