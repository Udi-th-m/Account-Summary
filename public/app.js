const MOCKAPI_BASE = "https://6916f911a7a34288a27f15b7.mockapi.io/eazypayouts/api/v1/balance";

const companySelect = document.getElementById("companySelect");
const accountSelect = document.getElementById("accountSelect");
const balanceCard = document.getElementById("balanceCard");
const balanceValue = document.getElementById("balanceValue");
const transactionsBody = document.getElementById("transactionsBody");
const emptyState = document.getElementById("emptyState");

let allAccounts = [];
let currentAccounts = [];

// Load everything
window.addEventListener("DOMContentLoaded", () => {
  loadCompanies();
  loadAllAccounts();
});

// ---------------- API ----------------

function fetchCompanies() {
  return fetch(MOCKAPI_BASE + "/companies").then(res => res.json());
}

function fetchAllAccounts() {
  return fetch(MOCKAPI_BASE + "/Account").then(res => res.json());
}

// ---------------- LOADERS ----------------

function loadCompanies() {
  fetchCompanies().then(companies => {
    companies.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.name;
      companySelect.appendChild(opt);
    });
  });
}

function loadAllAccounts() {
  fetchAllAccounts().then(accounts => {
    allAccounts = accounts || [];
    loadDefaultView();        // <<-- SHOW ALL DATA BY DEFAULT
  });
}

// ---------------- DEFAULT VIEW ----------------

function loadDefaultView() {
  currentAccounts = allAccounts.slice(); // copy array

  // MERGE ALL TRANSACTIONS
  let merged = [];

  currentAccounts.forEach(acc => {
    if (Array.isArray(acc.transactions)) {
      acc.transactions.forEach(t => {
        merged.push({
          ...t,
          accountName: acc.accountName
        });
      });
    }
  });

  // SHOW TOTAL BALANCE
  const totalBalance = currentAccounts.reduce((sum, acc) =>
    sum + Number(acc.availableBalance || 0), 0
  );

  balanceCard.style.display = "block";
  balanceValue.textContent = "₹ " + formatAmount(totalBalance);

  // RENDER TABLE
  renderTransactions(merged);

  emptyState.textContent = "Showing all accounts by default.";
}

// ---------------- DROPDOWNS ----------------

companySelect.addEventListener("change", (e) => {
  const companyId = e.target.value;
  accountSelect.innerHTML = '<option value="">Account Name</option>';
  accountSelect.disabled = true;
  clearTable();

  if (!companyId) {
    loadDefaultView();
    return;
  }

  currentAccounts = allAccounts.filter(a => String(a.companyId) === String(companyId));

  currentAccounts.forEach(acc => {
    const opt = document.createElement("option");
    opt.value = acc.id;
    opt.textContent = acc.accountName;
    accountSelect.appendChild(opt);
  });

  accountSelect.disabled = currentAccounts.length === 0;

  // Show company-level merged transactions
  let companyMerged = [];
  currentAccounts.forEach(acc => {
    acc.transactions?.forEach(t =>
      companyMerged.push({ ...t, accountName: acc.accountName })
    );
  });

  renderTransactions(companyMerged);

  const companyBalance = currentAccounts.reduce((sum, acc) =>
    sum + Number(acc.availableBalance || 0), 0
  );

  balanceCard.style.display = "block";
  balanceValue.textContent = "₹ " + formatAmount(companyBalance);

  emptyState.textContent = companyMerged.length
    ? ""
    : "No transactions for this company.";
});

accountSelect.addEventListener("change", (e) => {
  const accountId = e.target.value;

  if (!accountId) {
    // If user clears account selection → show company-level data again
    companySelect.dispatchEvent(new Event("change"));
    return;
  }

  const account = currentAccounts.find(a => String(a.id) === String(accountId));

  clearTable();

  if (!account) return;

  balanceCard.style.display = "block";
  balanceValue.textContent = "₹ " + formatAmount(account.availableBalance);

  renderTransactions(account.transactions);

  emptyState.textContent = account.transactions.length
    ? ""
    : "No transactions for this account.";
});

// ---------------- HELPERS ----------------

function renderTransactions(list) {
  transactionsBody.innerHTML = "";

  list.forEach(t => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${t.date}</td>
      <td>₹ ${formatAmount(t.amount)}</td>
      <td>₹ ${formatAmount(t.balance)}</td>
      <td>${t.utr}</td>
      <td>${t.upi}</td>
    `;

    transactionsBody.appendChild(tr);
  });
}

function clearTable() {
  transactionsBody.innerHTML = "";
}

function formatAmount(v) {
  v = Number(v) || 0;
  return v.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}