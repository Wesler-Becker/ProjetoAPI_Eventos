const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Ordem dos testes
    const order = ['db.test.js', 'eventos.test.ts', 'usuarios.test.ts', 'incricoes.test.ts'];
    return tests.sort((a, b) => order.indexOf(a.path.split('/').pop()) - order.indexOf(b.path.split('/').pop()));
  }
}

module.exports = CustomSequencer;
