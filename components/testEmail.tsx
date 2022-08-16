import IconButton from "./iconButton";
import { useSession } from "next-auth/react";
import { useState } from "react";

function sendTests(email, updateStatus) {
    const data = {
        firstName: "Test",
        lastName: "Email",
        email: email,
        phone: "5555555555",
        prefDate: "1/1/2099",
        prefTime: "1/1/2099",
        altDate: "1/2/2099",
        altTime: "1/2/2099",
        make: "Porsche",
        model: "test",
        year: "1999 ",
        vinNumber: "123456789",
        reason: "testing Email, please ignore.",
    };
    fetch(`/api/requestQuote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            updateStatus(true);
        });
}

function TestEmails() {
    const { data: session } = useSession();

    const [emailSent, setEmailSent] = useState(false);

    return emailSent ? (
        <IconButton
            text="Test Email sent to session.user.email."
            callback={() => {
                setEmailSent(false);
            }}
            icon={<></>}
        />
    ) : (
        <IconButton
            text="Test Email"
            callback={() => {
                sendTests(session.user.email, setEmailSent);
            }}
            icon={<></>}
        />
    );
}

export default TestEmails;
