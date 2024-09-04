export const HeaderAuthenticatedNav = () => {
    // TODO: Linkに置き換える
    // TODO: ユーザー情報を追加する
    return (
        <>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="/editor"
                >
                    <i className="ion-compose" />
                    &nbsp;New Article
                </a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="/settings"
                >
                    <i className="ion-gear-a" />
                    &nbsp;Settings
                </a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link"
                    href="/profile/eric-simons"
                >
                    <img
                        src=""
                        className="user-pic"
                    />
                    Eric Simons
                </a>
            </li>
        </>
    );
};
