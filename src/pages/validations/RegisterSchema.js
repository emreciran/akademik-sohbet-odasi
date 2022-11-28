import * as Yup from "yup"

export const RegisterSchema = Yup.object().shape({
    name: Yup.string()
             .required("Ad alanı zorunludur!"),

    surname: Yup.string()
                .required("Soyad alanı zorunludur!"),

    username: Yup.string()
                 .required("Kullanıcı adı alanı zorunludur!"),
             
    email: Yup.string()
              .email()
              .required("Email alanı zorunludur!"),

    password: Yup.string()
                 .required("Şifre alanı zorunludur!"),

    confirmPassword: Yup.string()
                        .required("Şifre tekrar alanı zorunludur!"),
})