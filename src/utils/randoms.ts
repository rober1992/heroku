export const randoms = (cantidad: number) => {
    let lista: any = {};
    for (let i = 0; i < cantidad; i++) {
      let myKey: number = Math.round(Math.random() * (cantidad - 1) + 1);
      if (myKey in lista) {
        lista[myKey]++;
      } else lista[myKey] = 1;
    }
    return lista;
};

  process.on('message', (msg: any) => {
    msg = JSON.parse(msg);
    if (msg.command == 'start') {
      console.log('Start Process');
      const result = randoms(msg.cantidad);
      if (process && process.send) {
        process.send(result);
      }
    }
});