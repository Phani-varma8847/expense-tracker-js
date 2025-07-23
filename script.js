const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

form.addEventListener('submit', addTransaction);

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter both text and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  text.value = '';
  amount.value = '';
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(trans => trans.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const expense = (
    amounts.filter(amount => amount < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
}
