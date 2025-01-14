export default (io) => {
    //No olvidar quitar esos "status"
    const namespaceWebAdmin = io.of('/orders/status/webadmin');
    const namespaceClient = io.of('/orders/status/client');
    const namespaceDelivery = io.of('/orders/status/delivery');

    namespaceWebAdmin.on('connection', (socket) => {

        /*
        socket.on('en-proceso', (message) => {
          namespaceClient.emit('actualizar-orden', message.id_orden, message.nuevoEstado);
        });
        */
    
        socket.on('en-proceso', (message) => {
          namespaceClient.emit('actualizar-orden', message);
        });

        socket.on('preparado', (message) => {
          namespaceClient.emit('actualizar-orden', message);
        });

        socket.on('en-camino', (message) => {
          namespaceClient.emit('actualizar-orden', message);
        });

        socket.on('completado', (message) => {
          namespaceClient.emit('actualizar-orden', message);
        });

        socket.on('cancelado', (message) => {
          namespaceClient.emit('actualizar-orden', message);
        });


        //De WebAdmin a Cocina
        socket.on('nueva-orden-en-proceso', (message, id_orden) => {
          namespaceWebAdmin.emit('listar-orden-en-proceso', message, id_orden);
        });

        //De Cocina al Delivery
        socket.on('nueva-orden-preparada', (message) => {
          namespaceDelivery.emit('listar-orden-preparada', message);
        });

        socket.on('tiempo-entrega', (message) => {
          namespaceClient.emit('actualizar-tiempo-entrega', message);
        });
      
        socket.on('disconnect', () => {
          console.log('UN USUARIO SE DESCONECTÓ DE SOCKET IO');
        });
    });

    namespaceClient.on('connection', (socket) => {
    
        socket.on('nueva-orden-pendiente', (message) => {
          namespaceWebAdmin.emit('listar-orden', message);
        });

        /*
        socket.on('nueva-orden-preparada', (message) => {
          namespaceWebAdmin.emit('listar-orden', message);
        });
        */
        
        socket.on('nueva-orden-en-camino', (message) => {
          namespaceWebAdmin.emit('listar-orden', message);
        });

        socket.on('nueva-orden-cancelada', (message) => {
          namespaceWebAdmin.emit('listar-orden', message);
        });

      
        socket.on('disconnect', () => {
          console.log('UN USUARIO SE DESCONECTÓ DE SOCKET IO');
        });
    });


    namespaceDelivery.on('connection', (socket) => {

      socket.on('en-camino', (message) => {
        namespaceClient.emit('actualizar-orden', message);
      });

      socket.on('completado', (message) => {
        namespaceClient.emit('actualizar-orden', message);
      });
    
      socket.on('disconnect', () => {
        console.log('UN USUARIO SE DESCONECTÓ DE SOCKET IO');
      });
    });
};