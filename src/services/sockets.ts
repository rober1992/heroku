import { mensajes } from "../models/messagesModels";
import { Server } from "socket.io";




export const initWsServer = (app : any) => {
    const myWSServer = new Server(app);


    myWSServer.on('connection', function (socket : any) {
        console.log('\n\nUn cliente se ha conectado');
        console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
        console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);

        socket.on('askData', async () => {
            console.log('ME LLEGO DATA');
            const messages = await mensajes.find().lean();
            if (messages.length > 0) {
                socket.emit('messages', messages);
            }
        });

        socket.on('new-message', async (data : any) => {
            const newMsg = await mensajes.create(data);
            myWSServer.emit('messages', [newMsg]);
          });
        
    })

    
    
    return myWSServer;
}

