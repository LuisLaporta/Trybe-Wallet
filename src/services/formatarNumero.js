function formatarNumero(numero) {
  const [parteInteira, parteDecimal] = numero.toFixed(2).split('.');
  const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${parteInteiraFormatada},${parteDecimal}`;
}

export default formatarNumero;
