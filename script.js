function checkHealth() {
    const temp = parseFloat(document.getElementById('temp').value);
    const widal = document.getElementById('widal').value;
    const culture = document.getElementById('culture').value;
    const wbc = parseInt(document.getElementById('wbc').value);
    const platelet = parseInt(document.getElementById('platelet').value);
    const pain = document.getElementById('pain').value;
    const rash = document.getElementById('rash').value;
    const fatigue = document.getElementById('fatigue').value;
    const headache = document.getElementById('headache').value;
  
    // Validate all fields are filled
    const form = document.getElementById('healthForm');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
  
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = "block";
    
    // Calculate risk score (0-10)
    let riskScore = 0;
    
    // Temperature scoring
    if (temp >= 103) riskScore += 3;
    else if (temp >= 102) riskScore += 2;
    else if (temp >= 100.4) riskScore += 1;
    
    // Test results
    if (widal === 'positive') riskScore += 2;
    if (culture === 'positive') riskScore += 3;
    
    // Blood counts
    if (wbc < 4000) riskScore += 1;
    if (platelet < 150000) riskScore += 1;
    
    // Symptoms
    if (pain === 'yes') riskScore += 1;
    if (fatigue === 'yes') riskScore += 1;
    if (headache === 'yes') riskScore += 1;
    if (rash === 'yes') riskScore += 1;
    
    // Determine result
    let result, resultClass;
    
    if (riskScore >= 8) {
      result = `
        <div class="result-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <strong>High Risk of Typhoid</strong><br><br>
        Based on your symptoms and test results, there is a high likelihood of typhoid fever.<br><br>
        <strong>Recommendation:</strong> Seek immediate medical attention. Typhoid fever requires prompt antibiotic treatment.
      `;
      resultClass = "positive-result";
    } else if (riskScore >= 5) {
      result = `
        <div class="result-icon"><i class="fas fa-exclamation-circle"></i></div>
        <strong>Moderate Risk of Typhoid</strong><br><br>
        Some indicators suggest possible typhoid infection, but not all criteria are met.<br><br>
        <strong>Recommendation:</strong> Consult a healthcare provider for proper testing and diagnosis.
      `;
      resultClass = "positive-result";
    } else {
      result = `
        <div class="result-icon"><i class="fas fa-check-circle"></i></div>
        <strong>Low Risk of Typhoid</strong><br><br>
        Your symptoms and test results don't strongly indicate typhoid fever.<br><br>
        <strong>Recommendation:</strong> Continue to monitor symptoms. If they worsen, consult a doctor.
      `;
      resultClass = "negative-result";
    }
    
    resultDiv.innerHTML = result;
    resultDiv.className = resultClass;
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Add input validation
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', function() {
      const min = parseFloat(this.min);
      const max = parseFloat(this.max);
      const value = parseFloat(this.value);
      
      if (value < min) this.value = min;
      if (value > max) this.value = max;
    });
  });