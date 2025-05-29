async function callRegisterAPI(event) {
    event.preventDefault(); // Ngăn reload
  
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate password
    if (!validatePassword(password)) {
        document.getElementById('password-error').classList.remove('hidden');
        return false;
    }
  
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
                phoneNumber: '', // Optional fields
                address: ''     // Optional fields
            })
        });
  
        const data = await response.json();
  
        if (response.ok) {
            alert('Đăng ký thành công!');
            window.location.href = '/dangnhap1.html';
        } else {
            const emailError = document.getElementById('email-error');
            emailError.textContent = data.message || 'Đăng ký thất bại';
            emailError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  
    return false;
  }
  
  // Clear error messages when input changes
  document.getElementById('email').addEventListener('input', function() {
    document.getElementById('email-error').classList.add('hidden');
  });
  
  document.getElementById('password').addEventListener('input', function() {
    document.getElementById('password-error').classList.add('hidden');
  });
