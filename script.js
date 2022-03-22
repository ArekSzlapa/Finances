const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");

const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteAllBtn = document.querySelector(".delete-all");
const deleteBtn = document.querySelector(".delete");
const addTransactionBtn = document.querySelector(".add-transaction");

let root = document.documentElement;
let id = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};

const hidePanel = () => {
  addTransactionPanel.style.display = "none";
  clearModal();
};

const checkForm = () => {
  const errorMsg = document.querySelector(".error");
  if (
    nameInput.value !== "" &&
    amountInput.value !== "" &&
    categorySelect.value !== "none"
  ) {
    errorMsg.style.visibility = "hidden";
    createNewTransaction();
  } else {
    errorMsg.style.visibility = "visible";
  }
};

const clearModal = () => {
  nameInput.value = "";
  amountInput.value = "";
  categorySelect.value = "none";
};

const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction");
  newTransaction.setAttribute("id", id);
  selectCategory();
  checkCategory(selectedCategory);
  newTransaction.innerHTML = `
  <p class="transaction-name">
  ${categoryIcon}${nameInput.value}
  </p>
  <p class="transaction-amount">
  ${amountInput.value}zł
  <button class="delete" onclick="deleteTransaction(${id})"><i class="fas fa-times"></i></button>
  </p>`;

  amountInput.value > 0
    ? incomeSection.appendChild(newTransaction) &&
      newTransaction.classList.add("income")
    : expensesSection.appendChild(newTransaction) &&
      newTransaction.classList.add("expense");

  moneyArr.push(parseFloat(amountInput.value));
  countMoney(moneyArr);
  hidePanel();
  id++;
};

const selectCategory = () => {
  selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const checkCategory = (transaction) => {
  switch (transaction) {
    case "[ + ] Income":
      categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
      break;
    case "[ - ] Shopping":
      categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
      break;
    case "[ - ] Food":
      categoryIcon = '<i class="fas fa-hamburger"></i>';
      break;
    case "[ - ] Movies":
      categoryIcon = '<i class="fas fa-film"></i>';
      break;
  }
};

const countMoney = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  availableMoney.textContent = `${newMoney}zł`;
};

const deleteTransaction = (id) => {
  const transactionToDelete = document.getElementById(id);
  const transactionAmount = parseFloat(
    transactionToDelete.childNodes[3].innerText
  );
  const indexOfTransaction = moneyArr.indexOf(transactionAmount);

  moneyArr.splice(indexOfTransaction, 1);

  transactionToDelete.classList.contains("income")
    ? incomeSection.removeChild(transactionToDelete)
    : expensesSection.removeChild(transactionToDelete);
  countMoney(moneyArr);
};

const deleteAllTransactions = () => {
  expensesSection.innerHTML = "<h3>Expenses:</h3>";
  incomeSection.innerHTML = "<h3>Income:</h3>";
  availableMoney.textContent = "0zł";
  moneyArr = [0];
};

const changeStyleToLight = () => {
  root.style.setProperty("--first-color", "#F9F9F9");
  root.style.setProperty("--second-color", "#14161F");
  root.style.setProperty("--border-color", "rgba(0, 0, 0, .2)");
};
const changeStyleToDark = () => {
  root.style.setProperty("--first-color", "#14161F");
  root.style.setProperty("--second-color", "#F9F9F9");
  root.style.setProperty("--border-color", "rgba(255, 255, 255, .4)");
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", hidePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAllTransactions);
lightBtn.addEventListener("click", changeStyleToLight);
darkBtn.addEventListener("click", changeStyleToDark);
