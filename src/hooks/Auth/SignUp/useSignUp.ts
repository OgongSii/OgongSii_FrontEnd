import { useCallback, useState } from "react";
import { usePostSignUp } from "../../../queries/SignUp/signup.query";
import { authType } from "../../../types/Auth/login.type";
import { B1ndToast } from "@b1nd/b1nd-toastify";

export function useSignUp() {
  const [id, SetId] = useState<string>("");
  const [pw1, SetPw1] = useState<string>("");
  const [pw2, SetPw2] = useState<string>("");

  const signUp = usePostSignUp();

  const onSignUpChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "id") SetId(e.target.value);
      else if (e.target.name === "pw1") SetPw1(e.target.value);
      else SetPw2(e.target.value);
    },
    []
  );

  const onSignUpClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (id && pw1 && pw2 && pw1 === pw2) {
        const data: authType = {
          name: id,
          password: pw1,
        };
        signUp.mutate(data, {
          onSuccess: (res) => {
            B1ndToast.showSuccess("회원가입 성공!");
          },
          onError: () => {
            B1ndToast.showError("회원가입 실패!");
          },
          onSettled: () => {
            SetId("");
            SetPw1("");
            SetPw2("");
          },
        });
      } else B1ndToast.showInfo("제대로 입력해주세요!");
    },
    [id, pw1, pw2]
  );

  return { onSignUpChange, id, pw1, pw2, onSignUpClick };
}