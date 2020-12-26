const { NavLink } = ReactRouterDOM;

export function Header() {

        return (
           <header className="main-header flex">
               <span><img className="logo roll-in-right" src="../assets/img/logo.jpg"/></span>
               <ul className="navbar flex">
                   <li><NavLink exact to="/">Home</NavLink></li>
                   <li><NavLink to="/about">About</NavLink></li>
                   <li><NavLink activeStyle={{ color: '#7f54e0' }} to="/book">Books</NavLink></li>
                   <li><NavLink activeStyle={{ color: 'rgb(67 180 224)' }} to="/keep">Keep</NavLink></li>
                   <li><NavLink activeStyle={{ color: '#dc4f43' }} to="/mail/list">Mail</NavLink></li>
               </ul>
           </header>
        )
    
}