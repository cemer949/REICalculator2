function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function handleInput(inputElement) {
  let cursorPos = inputElement.selectionStart;
  let rawValue = inputElement.value.replace(/,/g, '');
  let formattedValue = formatNumberWithCommas(rawValue);
  inputElement.value = formattedValue;
  cursorPos = cursorPos - (formattedValue.length - rawValue.length);
  inputElement.setSelectionRange(cursorPos, cursorPos);
}

document.querySelectorAll('input[type=text]').forEach(input => {
  input.addEventListener('input', () => handleInput(input));
});

document.getElementById('calculate').addEventListener('click', function() {
  var arv = parseFloat(document.getElementById('arv').value.replace(/,/g, ''));
  var repairCost = parseFloat(document.getElementById('repair-cost').value.replace(/,/g, ''));
  var assignmentFee = parseFloat(document.getElementById('assignment-fee').value.replace(/,/g, ''));
  var offerPercentage = parseFloat(document.getElementById('offer-percentage').value);

  var offer = calculateOffer(arv, offerPercentage, repairCost, assignmentFee);

  var result = document.getElementById('result');
  result.innerHTML = `<p>Offer: $${offer.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>`;
});

function calculateOffer(arv, percentage, repairCost, assignmentFee) {
  return arv * (percentage / 100) - repairCost - assignmentFee;
}
