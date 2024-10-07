import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { LoginForm } from "./index.tsx";

const user = userEvent.setup();

function setup() {
    const onClickSignIn = vi.fn();
    render(<LoginForm onSubmit={onClickSignIn} />);

    const emailInput = screen.getByRole("textbox", { name: "email" });
    const passwordInput = screen.getByRole("textbox", { name: "password" });
    const button = screen.getByRole("button");

    async function handleValidEmailInput() {
        await user.type(emailInput, "test@gmail.com");
    }
    async function handleValidPasswordInput() {
        await user.type(passwordInput, "password");
    }

    return {
        onClickSignIn,
        emailInput,
        passwordInput,
        button,
        handleValidEmailInput,
        handleValidPasswordInput,
    };
}

describe("LoginForm", () => {
    test("メールアドレス以外を入力し、「Sign in」を試みると、バリデーションエラーが表示される", async () => {
        const { onClickSignIn, emailInput, button } = setup();

        await user.type(emailInput, "メールアドレスではありません");
        await user.click(button);

        expect(onClickSignIn).not.toHaveBeenCalled();
        expect(emailInput).toHaveAccessibleErrorMessage("メールアドレスを入力してください");
    });
    test("メールアドレスが未入力の場合に「Sign in」を試みると、バリデーションエラーが表示される", async () => {
        const { onClickSignIn, emailInput, button } = setup();

        await user.click(button);

        expect(onClickSignIn).not.toHaveBeenCalled();
        expect(emailInput).toHaveAccessibleErrorMessage("必須項目です");
    });
    test("パスワードが未入力の場合に「Sign in」を試みると、バリデーションエラーが表示される", async () => {
        const { onClickSignIn, passwordInput, button } = setup();

        await user.click(button);

        expect(onClickSignIn).not.toHaveBeenCalled();
        expect(passwordInput).toHaveAccessibleErrorMessage("必須項目です");
    });
    test("適正内容で「Sign in」を試みると、onSubmit イベントハンドラー実行される", async () => {
        const { onClickSignIn, button, handleValidEmailInput, handleValidPasswordInput } = setup();

        await handleValidEmailInput();
        await handleValidPasswordInput();
        await user.click(button);

        expect(onClickSignIn).toHaveBeenCalled();
    });
});
