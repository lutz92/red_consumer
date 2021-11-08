import amqp from 'amqplib/callback_api'
amqp.connect("amqp://localhost", function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = "mongoEvents";
        channel.assertQueue(queue, {durable: true});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            if(msg) {
                console.log(JSON.parse(msg.content.toString()));
                console.log("\n");
                channel.ack(msg);
            }
        }, {noAck: false});      
    });
});