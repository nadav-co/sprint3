const { NavLink } = ReactRouterDOM;

export function Header() {

        return (
           <header className="flex">
               <span>Logo</span>
               <ul className="navbar flex">
                   <li><NavLink exact to="/">Home</NavLink></li>
                   <li><NavLink to="/about">About</NavLink></li>
                   <li><NavLink to="/book">Books</NavLink></li>
                   <li><NavLink to="/keep-app">Keep</NavLink></li>
                   <li><NavLink to="/mail-app">Mail</NavLink></li>
               </ul>
           </header>
        )
    
}