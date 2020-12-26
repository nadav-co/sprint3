const { NavLink } = ReactRouterDOM;
export class Header extends React.Component {

    state = {
        active: false
    }

    toggleNav = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        const cls = (this.state.active) ? 'active' : ''
        return (
            <header className="main-header flex">
                <span><img className="logo roll-in-right" src="assets/img/logo.jpg" /></span>
                <img style={{ cursor: 'pointer' }} onClick={this.toggleNav} className="apps-icon" src="./assets/img/apps-icon.jpg" alt="" />
                <ul className={`navbar flex ${cls}`}>
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink activeStyle={{ color: '#7f54e0' }} to="/book">Books</NavLink></li>
                    <li><NavLink activeStyle={{ color: 'rgb(67 180 224)' }} to="/keep">Keep</NavLink></li>
                    <li><NavLink activeStyle={{ color: '#dc4f43' }} to="/mail/list">Mail</NavLink></li>
                </ul>
            </header>
        )
    }
}
