const { NavLink } = ReactRouterDOM;

export function Header() {

        return (
           <header className="flex">
               <span><img className="logo" src="../assets/img/logo.jpg"/></span>
               <ul className="navbar flex">
                   <li><NavLink exact to="/">Home</NavLink></li>
                   <li><NavLink to="/about">About</NavLink></li>
                   <li><NavLink to="/book">Books</NavLink></li>
                   <li><NavLink to="/keep">Keep</NavLink></li>
                   <li><NavLink to="/mail/list">Mail</NavLink></li>
               </ul>
           </header>
        )
    
}