import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { LoginForm } from "./index.tsx";

const user = userEvent.setup();

describe("LoginForm", () => {
    test("メールアドレス以外を入力し、「Sign in」を試みると、バリデーションエラーが表示される", async () => {
        const onClickSignIn = vi.fn();
        render(<LoginForm onSubmit={onClickSignIn} />);

        const input = screen.getByRole("textbox", { name: "email" });
        const button = screen.getByRole("button");

        await user.type(input, "メールアドレスではありません");
        await user.click(button);

        expect(onClickSignIn).not.toHaveBeenCalled();
        expect(input).toHaveAccessibleErrorMessage("メールアドレスを入力してください");
    });
    test("メールアドレスが未入力の場合に「Sign in」を試みると、バリデーションエラーが表示される", async () => {
        const onClickSignIn = vi.fn();
        render(<LoginForm onSubmit={onClickSignIn} />);

        const input = screen.getByRole("textbox", { name: "email" });
        const button = screen.getByRole("button");

        await user.click(button);

        expect(onClickSignIn).not.toHaveBeenCalled();
        expect(input).toHaveAccessibleErrorMessage("必須項目です");
    });
});
