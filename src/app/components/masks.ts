// export function cep(e: React.FormEvent<HTMLInputElement>) {
//   e.currentTarget.maxLength = 9;
//   let value = e.currentTarget.value;
//   value = value.replace(/\D/g, "");
//   value = value.replace(/^(\d{5})(\d)/, "$1-$2");
//   e.currentTarget.value = value
//   return e
// }

export function currency(e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  e.currentTarget.value = value
  return e
}

export function currencyString(valor: string) {
  let value = valor
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value
}

export function percentString(valor: string) {
  let value = valor
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  return value
}

export function percent(e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  e.currentTarget.value = value
  return e
}

