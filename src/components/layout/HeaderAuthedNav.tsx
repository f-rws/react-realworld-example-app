import { z } from "zod";
import { authedUserSchema } from "@/models/user.ts";

type Props = {
    authedUser: z.infer<typeof authedUserSchema>;
};

export const HeaderAuthedNav = ({ authedUser }: Props) => {
    // TODO: Linkに置き換える
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
                        src={authedUser.image}
                        className="user-pic"
                        alt="ログインユーザーのアイコン"
                    />
                    {authedUser.username}
                </a>
            </li>
        </>
    );
};
