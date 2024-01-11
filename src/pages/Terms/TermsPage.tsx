import "./TermsPage.css";
import { useEffect } from "react";
export default function TermsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="terms-container">
            <h1>Regulamin forum</h1>

            <h2>1. Cel forum</h2>
            <p>Forum jest miejscem, gdzie użytkownicy mogą dzielić się wiedzą, doświadczeniami i pomagać sobie nawzajem związanie z aplikacją Sprout. Wymagamy szacunku i profesjonalizmu w komunikacji między użytkownikami.</p>

            <h2>2. Rejestracja i konto</h2>
            <p>
                <ol>
                    <li><strong>Zakładanie konta:</strong> Każdy użytkownik ma dostęp do forum logując się na konto użytkownika w apliacji Sprout</li>
                    <li><strong>Bezpieczeństwo konta:</strong> Użytkownik jest odpowiedzialny za bezpieczeństwo swojego konta i nie powinien udostępniać danych logowania innym osobom.</li>
                    <li><strong>Usunięcie konta:</strong> Możesz usunąć swoje konto przechodząc do jego ustawień</li>
                </ol>
            </p>

            <h2>3. Zasady korzystania</h2>
            <p>
                <ol>
                    <li><strong>Szanuj innych użytkowników:</strong> Wszelkie wpisy naruszające prawa innych użytkowników, zawierające obraźliwe treści lub propagujące nienawiść będą usuwane.</li>
                    <li><strong>Tematyka:</strong> Posty powinny dotyczyć aplikacji Sprout, być związane z tematyką forum i być konstruktywne.</li>
                    <li><strong>Reklamy:</strong> Reklamy lub spamowanie są niedozwolone.</li>
                </ol>
            </p>

            <h2>4. Moderacja</h2>
            <p>
                <ol>
                    <li><strong>Decyzje moderatorów:</strong> Decyzje moderatorów forum są ostateczne i mają na celu utrzymanie porządku i zgodności z regulaminem.</li>
                    <li><strong>Usuwanie treści:</strong> Moderatorzy mają prawo usuwać treści niezgodne z regulaminem oraz podejmować inne działania w celu utrzymania porządku na forum.</li>
                </ol>
            </p>

            <h2>5. Kontakt</h2>
            <p>W przypadku pytań, wątpliwości lub zgłoszeń dotyczących regulaminu, skontaktuj się z nami przy pomocy formularza kontaktowego..</p>

            <h1>Dziękujemy za przestrzeganie regulaminu forum i konstruktywny udział w społeczności aplikacji Sprout!</h1>

        </div>
    )
}