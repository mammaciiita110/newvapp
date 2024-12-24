const axios = require('axios');

exports.handler = async function(event, context) {
    return new Promise((resolve, reject) => {
        try {
            // Get the userId from the query string parameters
            let userId = event.queryStringParameters.userId;

            // Modify the userId to only include the first three letters and replace the rest with *
            if (userId.length > 4) {
              userId = userId.substring(0, 4) + '\\*'.repeat(userId.length - 4); // Escape asterisks
            }


            const logMessage = `${userId}: ${event.queryStringParameters.action}`;

            // Format the message for Discord
            const discordWebhookUrl = 'https://discord.com/api/webhooks/1291422870945398930/UaXvGdTQM-0B7SgdwgXxP37mvXAOyDqimUyGVpGrkuxpRFXkGrEi6FHAeUJDW-arliEb';
            const discordPayload = {
                content: logMessage
            };

            // Send the formatted message to Discord
            axios.post(discordWebhookUrl, discordPayload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((discordResponse) => {
                if (discordResponse.status === 200) {
                    resolve({
                        statusCode: 200,
                        body: 'Log message sent to Discord.'
                    });
                } else {
                    reject({
                        statusCode: discordResponse.status,
                        body: 'Failed to send message to Discord webhook'
                    });
                }
            }).catch((error) => {
                console.error('Error sending message to Discord:', error.message);
                reject({
                    statusCode: 500,
                    body: 'Error sending message to Discord'
                });
            });
        } catch (error) {
            console.error('Error processing request:', error.message);
            reject({
                statusCode: 500,
                body: 'Error processing request'
            });
        }
    });
};
