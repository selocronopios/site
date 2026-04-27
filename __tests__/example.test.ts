describe('Example Test Suite', () => {
  test('deve passar - exemplo básico', () => {
    expect(true).toBe(true);
  });

  test('deve somar números corretamente', () => {
    const resultado = 1 + 1;
    expect(resultado).toBe(2);
  });
});
