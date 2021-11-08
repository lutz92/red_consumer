"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var callback_api_1 = __importDefault(require("amqplib/callback_api"));
callback_api_1.default.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = "mongoEvents";
        channel.assertQueue(queue, { durable: true });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            if (msg) {
                console.log(JSON.parse(msg.content.toString()));
                console.log("\n");
                channel.ack(msg);
            }
        }, { noAck: false });
    });
});
