function callLoginAPI(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Show loading state
  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Đang xử lý...";

  // Use current host to determine API URL - same as registration
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://tiemsachnhaem-be-mu.vercel.app';

  fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(async res => {
    const text = await res.text();
    console.log('Raw server response:', text);
    
    try {
      const data = JSON.parse(text);
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }
      return data;
    } catch (e) {
      console.error('Response parsing error:', e);
      throw new Error('Email hoặc mật khẩu không đúng');
    }
  })
  .then(data => {
    console.log("Login successful:", {
      userId: data.user?._id,
      role: data.user?.role
    });
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirect based on role
    if (data.user?.role === 'admin') {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  })
  .catch(error => {
    console.error("Login error:", error);
    alert(error.message);
  })
  .finally(() => {
    submitButton.disabled = false;
    submitButton.textContent = "Đăng Nhập";
  });

  return false;
}

// Helper functions for form validation
function setEmailError(input) {
  const errorMessage = input.value.trim() ? 'Email không hợp lệ!' : 'Vui lòng nhập email!';
  input.setCustomValidity(errorMessage);
}

function setRequiredError(input, message) {
  input.setCustomValidity(message);
}

function myfunction() {
  const passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}