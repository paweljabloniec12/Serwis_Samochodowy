<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pobranie danych z formularza
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Sprawdzenie czy wszystkie pola zostały wypełnione
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        // Odpowiedź w razie błędu
        http_response_code(400);
        echo "Wszystkie pola są wymagane oraz email musi być poprawny.";
        exit;
    }

    // Adres na który mają być wysyłane wiadomości
    $recipient = "paweljabloniec.st@gmail.com";

    // Tytuł wiadomości
    $subject = "Nowa wiadomość od $name";

    // Treść wiadomości
    $email_content = "Imię: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Wiadomość:\n$message\n";

    // Nagłówki wiadomości
    $email_headers = "From: $name <$email>";

    // Wysłanie wiadomości email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Sukces: Wyślij odpowiedź JSON do klienta
        http_response_code(200);
        echo "Dziękujemy! Twoja wiadomość została wysłana.";
    } else {
        // Błąd: Wyślij odpowiedź błędu
        http_response_code(500);
        echo "Ups! Coś poszło nie tak i nie udało się wysłać wiadomości.";
    }
} else {
    // Jeśli formularz nie został poprawnie wysłany
    http_response_code(403);
    echo "Wystąpił problem z wysłaniem formularza, spróbuj ponownie.";
}
?>
