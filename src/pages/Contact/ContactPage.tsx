import "./ContactPage.css";
import { useForm, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, [])
  const schema = yup
    .object({
      firstName: yup
        .string()
        .min(3, "Proszę podać poprawne imię")
        .required("Proszę wpisać imię"),
      email: yup
        .string()
        .email("Niepoprawny adres e-mail")
        .required("Proszę wpisać adres email"),
      gender: yup
        .string()
        .oneOf(["Pani", "Pan", "Inna", "Nie chce podawać"])
        .optional(),
      message: yup
        .string()
        .min(10, "Opisz nam szerzej Twój problem")
        .max(500, "Skróć wiadomość do 500 znaków")
        .required("Proszę wpisać wiadomość"),
      recaptcha: yup
        .string()
        .required("Proszę potwierdzić, że nie jesteś robotem"),
    })
    .required();

  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const naviagte = useNavigate();

  return (
    <div className="contact-main-container">
      <div className="contact-text-container">
        <div className="contact-header-text">
          <p>Skontaktuj się z nami!</p>
        </div>
        <div className="contact-lower-text">
          <p>
            Jesteśmy tu dla Ciebie! Bezpieczeństwo i satysfakcja naszych
            użytkowników są dla nas priorytetem, dlatego szybko odpowiemy na
            Twoje zapytania i sugestie. Twój głos ma dla nas znaczenie, dlatego
            nie wahaj się podzielić swoimi uwagami.
          </p>
          <p>
            Dziękujemy za korzystanie z naszej aplikacji i za zaufanie, jakim
            nas obdarzyłeś. Jesteśmy gotowi pomóc w każdy możliwy sposób!
          </p>
        </div>
      </div>

      <Form
        className="contact-righ-container"
        action="http://localhost:8080/contact/submit-message"
        encType={"application/json"}
        onSuccess={() => {
          alert(
            "Wiadomość wysłano. Postaramy się odpowiedzieć w jak najkrótszym czasie na podany adres e-mail."
          );
          naviagte("/");
        }}
        onError={() => {
          alert(
            "Niestety wiadomości nie udało się wysłać. Spróbuj za chwilę ponownie."
          );
        }}
        control={control}
      >
        <input {...register("firstName")} placeholder="Imię" />
        <p>{errors.firstName?.message}</p>

        <input {...register("email")} placeholder="Adres e-mail" />
        <p>{errors.email?.message}</p>

        <select {...register("gender")} defaultValue="">
          <option value="Pani">Pani</option>
          <option value="Pan">Pan</option>
          <option value="Inna">Inna</option>
          <option value="Nie chce podawać">Nie chce podawać</option>
        </select>
        <p>{errors.gender?.message}</p>

        <textarea {...register("message")} placeholder="Wpisz wiadomość" />
        <p>{errors.message?.message}</p>

        <ReCAPTCHA
          sitekey="6Lf5owwpAAAAADuLD9zTbUfYAVwS_Tj4a7hooFuS"
          onChange={(value) => {
            setValue("recaptcha", value);
          }}
        />

        <p>{errors.recaptcha?.message}</p>
        <input type="submit" value="Wyślij" />
      </Form>
    </div>
  );
}
