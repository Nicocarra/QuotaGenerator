import { setPage } from '../App.js';
import jsPDF from 'jspdf';

export function renderQuoteGenerator() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>Create Quote</h1>
      <nav>
        <button id="backToDashboardBtn">Back to Dashboard</button>
      </nav>
    </header>
    <main>
      <form id="quoteForm">
        <h2>Client Information</h2>
        <label for="clientName">Client Name:</label>
        <input type="text" id="clientName" name="clientName" required>
        <label for="clientAddress">Address:</label>
        <textarea id="clientAddress" name="clientAddress" required></textarea>
        <label for="clientEmail">Email:</label>
        <input type="email" id="clientEmail" name="clientEmail" required>
        <label for="clientPhone">Phone:</label>
        <input type="tel" id="clientPhone" name="clientPhone" required>

        <h2>Quote Details</h2>
        <label for="quoteDate">Quote Date:</label>
        <input type="date" id="quoteDate" name="quoteDate" required>
        <label for="quoteNumber">Quote Number:</label>
        <input type="text" id="quoteNumber" name="quoteNumber" required>

        <h2>Line Items</h2>
        <div id="lineItems"></div>
        <button type="button" id="addLineItemBtn">Add Line Item</button>

        <h2>Total</h2>
        <p id="totalAmount">Total: $0.00</p>

        <h2>Terms and Conditions</h2>
        <textarea id="terms" name="terms" rows="5"></textarea>

        <button type="button" id="generatePdfBtn">Generate PDF</button>
      </form>
    </main>
    <footer>
      <p>&copy; 2025 Quota Generator</p>
    </footer>
  `;

  let lineItemCount = 0;

  function addLineItem() {
    lineItemCount++;
    const lineItemDiv = document.createElement('div');
    lineItemDiv.className = 'line-item';
    lineItemDiv.innerHTML = `
      <label for="description${lineItemCount}">Description:</label>
      <input type="text" id="description${lineItemCount}" name="description${lineItemCount}" required>
      <label for="quantity${lineItemCount}">Quantity:</label>
      <input type="number" id="quantity${lineItemCount}" name="quantity${lineItemCount}" min="1" value="1" required>
      <label for="unitPrice${lineItemCount}">Unit Price:</label>
      <input type="number" id="unitPrice${lineItemCount}" name="unitPrice${lineItemCount}" min="0" step="0.01" required>
      <p id="total${lineItemCount}">Total: $0.00</p>
    `;
    document.getElementById('lineItems').appendChild(lineItemDiv);

    const quantityInput = document.getElementById(`quantity${lineItemCount}`);
    const unitPriceInput = document.getElementById(`unitPrice${lineItemCount}`);
    const totalP = document.getElementById(`total${lineItemCount}`);

    function updateTotal() {
      const quantity = parseFloat(quantityInput.value) || 0;
      const unitPrice = parseFloat(unitPriceInput.value) || 0;
      const total = quantity * unitPrice;
      totalP.textContent = `Total: $${total.toFixed(2)}`;
      updateGrandTotal();
    }

    quantityInput.addEventListener('input', updateTotal);
    unitPriceInput.addEventListener('input', updateTotal);
  }

  function updateGrandTotal() {
    let grandTotal = 0;
    document.querySelectorAll('.line-item').forEach((item, index) => {
      const quantity = parseFloat(document.getElementById(`quantity${index + 1}`).value) || 0;
      const unitPrice = parseFloat(document.getElementById(`unitPrice${index + 1}`).value) || 0;
      grandTotal += quantity * unitPrice;
    });
    document.getElementById('totalAmount').textContent = `Total: $${grandTotal.toFixed(2)}`;
  }

  document.getElementById('addLineItemBtn').addEventListener('click', addLineItem);

  document.getElementById('generatePdfBtn').addEventListener('click', () => {
    const clientName = document.getElementById('clientName').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const quoteDate = document.getElementById('quoteDate').value;
    const quoteNumber = document.getElementById('quoteNumber').value;
    const terms = document.getElementById('terms').value;

    const lineItems = [];
    document.querySelectorAll('.line-item').forEach((item, index) => {
      const description = document.getElementById(`description${index + 1}`).value;
      const quantity = document.getElementById(`quantity${index + 1}`).value;
      const unitPrice = document.getElementById(`unitPrice${index + 1}`).value;
      const total = (parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2);
      lineItems.push({ description, quantity, unitPrice, total });
    });
    const grandTotal = lineItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Quote', 10, 10);
    doc.setFontSize(12);
    doc.text(`Client: ${clientName}`, 10, 20);
    doc.text(`Address: ${clientAddress}`, 10, 30);
    doc.text(`Email: ${clientEmail}`, 10, 40);
    doc.text(`Phone: ${clientPhone}`, 10, 50);
    doc.text(`Quote Date: ${quoteDate}`, 10, 60);
    doc.text(`Quote Number: ${quoteNumber}`, 10, 70);

    let y = 80;
    doc.text('Line Items:', 10, y);
    y += 10;
    lineItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.description} - Qty: ${item.quantity} - Unit: $${item.unitPrice} - Total: $${item.total}`, 10, y);
      y += 10;
    });

    doc.text(`Grand Total: $${grandTotal}`, 10, y + 10);
    doc.text('Terms and Conditions:', 10, y + 20);
    doc.text(terms, 10, y + 30);

    doc.save(`quote_${quoteNumber}.pdf`);
  });

  document.getElementById('backToDashboardBtn').addEventListener('click', () => {
    setPage('dashboard');
  });
}