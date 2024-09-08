import { Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth/useAuth.ts";
import { useAuthedUser } from "@/contexts/authed-user/useAuthedUser.ts";
import { HeaderAuthedNav } from "./HeaderAuthedNav.tsx";
import { HeaderNonAuthedNav } from "./HeaderNonAuthedNav.tsx";

export const Header = () => {
    const { isLoggedIn } = useAuth();
    const { authedUser } = useAuthedUser();

    /*
     * TODO: activeなページにclassを追加する
     */
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a
                    className="navbar-brand"
                    href="/"
                >
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link
                            to={"/"}
                            className="nav-link"
                        >
                            Home
                        </Link>
                    </li>
                    {isLoggedIn && authedUser ? <HeaderAuthedNav authedUser={authedUser} /> : <HeaderNonAuthedNav />}
                </ul>
            </div>
        </nav>
    );
};
