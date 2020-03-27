const pushSocketIdToArray = (clients, userId, socketId) => {
    if(clients[userId]){
        clients[userId].push(socketId);
    }else{
        clients[userId] = [socketId];
    }
    return clients;
}

const removeSocketIdToArray = (clients, userId, socket)=>{
    clients[userId] = clients[userId].filter(socketId=>socketId !== socket.id);
    if(!clients[userId].length){
        delete clients[userId];
    }
    return clients;
}

const emitNotifyToArray = (clients, userId, io, eventName, data) => {
  return clients[userId].forEach(socketId =>
    io.sockets.connected[socketId].emit(eventName, data)
  ); 
};

module.exports = {
  pushSocketIdToArray,
  removeSocketIdToArray,
  emitNotifyToArray
};
