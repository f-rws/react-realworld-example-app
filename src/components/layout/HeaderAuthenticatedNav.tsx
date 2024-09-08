import { z } from "zod";
import { userSchema } from "@/models/user.ts";

const authUserSchema = userSchema.omit({ token: true });
type Props = {
    user: z.infer<typeof authUserSchema>;
};

export const HeaderAuthenticatedNav = ({ user }: Props) => {
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
                        src={user.image}
                        className="user-pic"
                        alt="ログインユーザーのアイコン"
                    />
                    {user.username}
                </a>
            </li>
        </>
    );
};
