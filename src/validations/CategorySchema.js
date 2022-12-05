import * as Yup from "yup"

export const CategorySchema = Yup.object().shape({
    category_Name: Yup.string()
                      .required("Kategori adı boş bırakılamaz!"),

})