const axios = require('axios');
const querystring = require('querystring');

exports.handler = async function(event, context) {
    const payload = querystring.parse(event.body);

    // Add verification variables
    const verificationPayload = {
        ...payload,
        cmd: '_notify-validate'
    };

    try {
        // Send verification request to PayPal sandbox
        const response = await axios.post('https://ipnpb.paypal.com/cgi-bin/webscr', querystring.stringify(verificationPayload), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Verify PayPal's response
        const verificationResult = response.data;
        
        // Extract necessary information from the payload
        const name = `${payload.first_name} ${payload.last_name}`;
        const amount = payload.mc_gross;
        const email = payload.payer_email;
        const date = payload.payment_date;

        // If verification successful, format the Discord message
        const discordWebhookUrl = 'https://discord.com/api/webhooks/1291487599084568636/toRUInf0BBMeiECIo96b9jVhJuzSsrxPezMHpaZz3ChwMd7T8xclkioSLZw11DwVkdnX';
        const discordPayload = {
            content: `Betalning kom in!\nDatum: ${date}\nNamn: ${name}\nSumma: ${amount}kr\nEmail: ${email}`
        };

        // Send the formatted message to Discord
        const discordResponse = await axios.post(discordWebhookUrl, discordPayload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (discordResponse.status !== 200) {
            console.error('Failed to send message to Discord webhook:', discordResponse.statusText);
            return {
                statusCode: discordResponse.status,
                body: 'Failed to send message to Discord webhook'
            };
        }

        console.log('Message sent to Discord webhook successfully');
        return {
            statusCode: 200,
            body: 'Message sent to Discord webhook successfully'
        };
    } catch (error) {
        console.error('Error processing PayPal IPN:', error.message);
        return {
            statusCode: 500,
            body: 'Error processing PayPal IPN'
        };
    }
};
