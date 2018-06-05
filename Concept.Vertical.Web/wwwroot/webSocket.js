const registrations = {};

window.register = (routingKey, callback) => {
  registrations[routingKey] = registrations[routingKey] || [];
  registrations[routingKey].push(callback);
};

const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
  .withUrl('/application')
  .build();

connection
  .start()
  .then(() => {
    connection.on('dataReceived', message => {
      var callbacks = registrations[message.routingKey];
      if(!callbacks){
        return;
      }
      callbacks.forEach(callback => callback(message.payload));
    })
  });