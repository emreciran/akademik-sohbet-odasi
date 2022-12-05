import * as Yup from "yup"

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
              .email()
              .required("Email alanı zorunludur!"),

    password: Yup.string()
                 .required("Şifre alanı zorunludur!")
                 .min(5, "Şifreniz en az 5 karakter olmalıdır!"),
})