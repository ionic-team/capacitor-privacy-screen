import { PrivacyScreenPlugin } from '@capacitor/privacy-screen';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    PrivacyScreenPlugin.echo({ value: inputValue })
}
