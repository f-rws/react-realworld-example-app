import { Link } from "@tanstack/react-router";

export const Header = () => {
    /*
     * TODO:
     *  - ログインユーザー、ログアウトユーザーに対応する
     *  - ルーティングを実装する
     * */
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
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/login"
                        >
                            Sign in
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/register"
                        >
                            Sign up
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
