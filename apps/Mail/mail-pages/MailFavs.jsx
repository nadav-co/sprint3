import { mailService } from "../services/mail-service.js"
const { Link } = ReactRouterDOM;


export function MailFavs() {



    const favs = mailService.getFavsMails()

    return (
        favs.map(fav => {

            return (
                <div key={fav.id} className={`mail-preview`} >
                    <div className="mail-subject">
                        <span  >{fav.subject}</span>
                    </div>
                    <Link to={`/mail/${fav.id}`}> <p > {fav.body}</p > </Link>
                   {/* {not working !!!!!}  <Link>  <button> safcvxvxcv</button> </Link> */}
                </div>
            )
        })

    )
}
