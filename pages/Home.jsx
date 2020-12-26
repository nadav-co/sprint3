const { Link } = ReactRouterDOM;
import homeMail from '../assets/img/home-mail.jpg'


export class Home extends React.Component {

    state = {

    }

    componentDidMount() {

    }

    render() {
        return (
            <section className="home-container">
                <h1 className="home-page-headline">
                    Welcome To AppSus
                </h1>
                <div className="img-container">
                    <Link to="/mail/list">   <div className="home-img mail roll-in-top" > <img src={homeMail} alt="" /></div></Link>
                    <Link to="/keep"> <div className="home-img keep roll-in-left"> <img src="../assets/img/home-keep2.png" alt="" /></div></Link>
                    <Link to="/book"> <div className="home-img book roll-in-right"> <img src="../assets/img/home-book.jpg" alt="" /></div></Link>
                </div>
            </section>
        )
    }
}