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
                 .required("Şifre alanı zorunludur!")
                 .min(5, 'Şifreniz en az 5 karakterden oluşmalıdır!')
                 .max(50, 'Şifreniz en fazla 50 karakterden oluşmalıdır!')
                 .matches(/[0-9]/, 'Şifrenizde en az 1 sayı olmalıdır!')
                 .matches(/[a-z]/, 'Şifrenizde en az 1 küçük harf olmalıdır!')
                 .matches(/[A-Z]/, 'Şifrenizde en az 1 büyük harf olmalıdır!')
                 .matches(/[^\w]/, 'Şifrenizde en az 1 sembol olmalıdır!'),

    confirmPassword: Yup.string()
                        .required("Şifre tekrar alanı zorunludur!")
                        .oneOf([Yup.ref('password'), null], 'Onay şifresi hatalı!'),
})