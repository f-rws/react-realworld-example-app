import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { LoginForm } from "./index.tsx";

const user = userEvent.setup();

function setup() {
    const onClickSignIn = vi.fn();
    render(<LoginForm onSubmit={onClickSignIn} />);

    const emailInput = screen.getByRole("textbox", { name: "email" });
    const button = screen.getByRole("button");

    return {
        onClickSignIn,
        emailInput,
        button,
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
});
