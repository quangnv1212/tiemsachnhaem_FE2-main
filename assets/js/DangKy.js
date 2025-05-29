function myfunction() {
    const passInput = document.getElementById('password');
    const eyeIcon = document.querySelector('.eye-icon');
    if (passInput.type === 'password') {
      passInput.type = 'text';
      eyeIcon.src = '../assets/Hình/eye-slash.jpg'; // Đổi sang icon ẩn
      eyeIcon.alt = 'Ẩn mật khẩu';
    } else {
      passInput.type = 'password';
      eyeIcon.src = '../assets/Hình/view.png'; // Đổi sang icon hiện
      eyeIcon.alt = 'Hiện mật khẩu';
    }
  }

// Update the email validation function
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

  // Modify the DOMContentLoaded event listener
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const inputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        password: document.getElementById('password')
    };

    // Create error elements if they don't exist
    Object.keys(inputs).forEach(field => {
        const input = inputs[field];
        if (!document.getElementById(`${field}-error`)) {
            const errorDiv = document.createElement('div');
            errorDiv.id = `${field}-error`;
            errorDiv.className = 'error-message hidden';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    });

    // Add real-time validation for each input
    if (inputs.fullName) {
        inputs.fullName.addEventListener('input', function() {
            const error = document.getElementById('fullName-error');
            if (!this.value.trim()) {
                showError(this, error, 'Vui lòng nhập họ tên!');
            } else if (this.value.trim().length < 2) {
                showError(this, error, 'Họ tên phải có ít nhất 2 ký tự!');
            } else {
                hideError(this, error);
            }
        });
    }

    if (inputs.email) {
        inputs.email.addEventListener('input', function() {
            const error = document.getElementById('email-error');
            const email = this.value.trim();
            
            if (!email) {
                showError(this, error, 'Vui lòng nhập địa chỉ email!');
            } else if (!validateEmail(email)) {
                showError(this, error, 'Email không hợp lệ! (Ví dụ: example@domain.com)');
            } else {
                hideError(this, error);
            }
        });
    }

    if (inputs.password) {
        inputs.password.addEventListener('input', function() {
            const error = document.getElementById('password-error');
            const password = this.value.trim();
            
            if (!password) {
                showError(this, error, 'Vui lòng nhập mật khẩu!');
            } else if (!validatePassword(password)) {
                showError(this, error, 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!');
            } else {
                hideError(this, error);
            }
        });
    }
});

// Add these helper functions
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.add('hidden');
}

// Modify the existing validateForm function
function validateForm(event) {
    event.preventDefault();
    
    const inputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        password: document.getElementById('password')
    };
    
    let isValid = true;

    // Validate all fields
    if (inputs.fullName && (!inputs.fullName.value.trim() || inputs.fullName.value.trim().length < 2)) {
        showError(inputs.fullName, document.getElementById('fullName-error'), 
            'Họ tên phải có ít nhất 2 ký tự!');
        isValid = false;
    }

    if (inputs.email && !validateEmail(inputs.email.value.trim())) {
        showError(inputs.email, document.getElementById('email-error'), 
            'Email không hợp lệ! (Ví dụ: example@domain.com)');
        isValid = false;
    }

    if (inputs.password && !validatePassword(inputs.password.value.trim())) {
        showError(inputs.password, document.getElementById('password-error'), 
            'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!');
        isValid = false;
    }

    if (isValid) {
        // Call your API here
        alert('Form hợp lệ - sẵn sàng gửi!');
    }

    return isValid;
}

// Hàm tùy chỉnh thông báo lỗi cho các trường bắt buộc
function setRequiredError(input, message) {
if (!input.value.trim()) {
  input.setCustomValidity(message); // Đặt thông báo khi trường trống
} else {
  input.setCustomValidity(''); // Xóa thông báo nếu có nội dung
}
input.addEventListener('input', function() {
  if (!this.value.trim()) {
    this.setCustomValidity(message); // Đặt lại thông báo khi xóa nội dung
  } else {
    this.setCustomValidity(''); // Xóa thông báo khi có nội dung
  }
});
}

// Hàm tùy chỉnh thông báo lỗi cho email
function setEmailError(input) {
const email = input.value.trim();
if (!email) {
  input.setCustomValidity('Vui lòng nhập địa chỉ email!');
} else if (!email.includes('@')) {
  input.setCustomValidity('Vui lòng nhập địa chỉ email hợp lệ (phải chứa ký tự @)!');
} else {
  // Kiểm tra định dạng email cơ bản (có @ và phần tên miền)
  const emailParts = email.split('@');
  if (emailParts.length !== 2 || !emailParts[1].includes('.')) {
    input.setCustomValidity('Vui lòng nhập địa chỉ email hợp lệ (phải có tên miền như .com hoặc .vn)!');
  } else {
    input.setCustomValidity(''); // Email hợp lệ
  }
}
input.addEventListener('input', function() {
  const currentEmail = this.value.trim();
  if (!currentEmail) {
    this.setCustomValidity('Vui lòng nhập địa chỉ email!');
  } else if (!currentEmail.includes('@')) {
    this.setCustomValidity('Vui lòng nhập địa chỉ email hợp lệ (phải chứa ký tự @)!');
  } else {
    const emailParts = currentEmail.split('@');
    if (emailParts.length !== 2 || !emailParts[1].includes('.')) {
      this.setCustomValidity('Vui lòng nhập địa chỉ email hợp lệ (phải có tên miền như .com hoặc .vn)!');
    } else {
      this.setCustomValidity(''); // Xóa thông báo nếu hợp lệ
    }
  }
});
}

function handleForgotPassword(event) {
event.preventDefault();

const emailInput = document.getElementById('email');
const email = emailInput.value.trim();
const errorBox = document.getElementById('email-error');

// Ẩn lỗi trước
errorBox.classList.add('hidden');

// Kiểm tra email rỗng
if (!email) {
  errorBox.textContent = 'Vui lòng nhập địa chỉ email!';
  errorBox.classList.remove('hidden');
  emailInput.focus();
  return false;
}

// Kiểm tra định dạng email
const emailParts = email.split('@');
if (!email.includes('@') || emailParts.length !== 2 || !emailParts[1].includes('.')) {
  errorBox.textContent = 'Vui lòng nhập địa chỉ email hợp lệ!';
  errorBox.classList.remove('hidden');
  emailInput.focus();
  return false;
}

// Nếu hợp lệ → chuyển trang
window.location.href = '../pages/quenMK2.html';
return false;
}

function togglePassword(inputId) {
const input = document.getElementById(inputId);
const icon = input.nextElementSibling;

if (input.type === "password") {
  input.type = "text";
  icon.src = "../assets/Hình/eye-slash.jpg";
  icon.alt = "Ẩn mật khẩu";
} else {
  input.type = "password";
  icon.src = "../assets/Hình/view.png";
  icon.alt = "Hiện mật khẩu";
}
}

function validateResetPassword() {
const pass1 = document.getElementById('pass1').value.trim();
const pass2 = document.getElementById('pass2').value.trim();
const errorBox = document.getElementById('reset-error');

errorBox.classList.add('hidden');

if (!pass1 || !pass2) {
  errorBox.textContent = 'Vui lòng nhập đầy đủ mật khẩu!';
  errorBox.classList.remove('hidden');
  return;
}

if (pass1 !== pass2) {
  errorBox.textContent = 'Mật khẩu xác nhận không khớp';
  errorBox.classList.remove('hidden');
  return;
}

    // Nếu hợp lệ
window.location.href = '../pages/quenMK3.html';
}

function handleSubmit(event) {
event.preventDefault(); // Ngăn reload trang

const isValid = validateForm(event); // gọi hàm kiểm tra dữ liệu

if (isValid) {
  callRegisterAPI(event); // gọi API nếu dữ liệu hợp lệ
}

return false; // Ngăn submit mặc định
}