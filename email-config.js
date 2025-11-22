// config do emailjs
const EMAIL_CONFIG = {
    serviceID: 'service_3s0q5rv',
    templateID: 'template_3nyw1xm',
    publicKey: 'YLw2T7wqGJMGqXsca',
    replyTo: 'Sacsuporte@barbieroit.com.br',
    fromName: 'BarbieroIT'
};

// enviar email
function sendContactEmail(formData) {
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    const isEmailJSConfigured =
        EMAIL_CONFIG.serviceID !== 'YOUR_SERVICE_ID' &&
        EMAIL_CONFIG.templateID !== 'YOUR_TEMPLATE_ID' &&
        EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';

    if (isEmailJSConfigured && typeof emailjs !== 'undefined') {
        // produção
        const templateParams = {
            to_email: formData.email,
            to_name: formData.nome + ' ' + formData.sobrenome,
            from_name: EMAIL_CONFIG.fromName,
            reply_to: EMAIL_CONFIG.replyTo,
            phone: formData.telefone,
            subject: formData.assunto
        };

        return emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templateID,
            templateParams,
            EMAIL_CONFIG.publicKey
        )
        .then(function(response) {
            console.log('✅ Email enviado com sucesso!', response.status);
            return { success: true, message: 'Solicitação enviada com sucesso! Verifique seu email.' };
        })
        .catch(function(error) {
            console.error('❌ Erro ao enviar email:', error);
            return { success: false, message: 'Erro ao enviar solicitação. Tente novamente.' };
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    } else {
        // desenvolvimento local
        return fetch('/send_contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                console.log('✅ Email enviado via servidor local!');
            } else {
                console.error('❌ Erro no servidor local');
            }
            return result;
        })
        .catch(error => {
            console.error('❌ Erro na requisição:', error);
            return { success: false, message: 'Erro ao enviar solicitação. Tente novamente.' };
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
}
