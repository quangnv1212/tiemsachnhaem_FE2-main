function callRegisterAPI(event) {
  event.preventDefault();

  // Get all required fields
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const address = document.getElementById("address").value.trim();

  // Show loading state
  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Đang xử lý...";

  // Use current host to determine API URL
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://tiemsachnhaem-be-mu.vercel.app';

  fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      phoneNumber,
      address
    })
  })
  .then(async res => {
    const text = await res.text();
    console.log('Server response:', text);
    
    try {
      const data = JSON.parse(text);
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }
      return data;
    } catch (e) {
      console.error('Response parsing error:', e);
      throw new Error(text || 'Registration failed');
    }
  })
  .then(data => {
    console.log("Registration successful:", data);
    alert("Đăng ký thành công!");
    window.location.href = "../pages/dangnhap1.html";
  })
  .catch(error => {
    console.error("Registration error:", error);
    alert(error.message);
  })
  .finally(() => {
    submitButton.disabled = false;
    submitButton.textContent = "Đăng Ký";
  });

  return false;
}
