document.addEventListener('DOMContentLoaded', function () {
    //lấy thông tin user trong localstorage
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const user = JSON.parse(userInfo);
        // Hiển thị thông tin user
        document.getElementById('customer-mail').textContent = user.email || '';
        document.getElementById('customer-name').textContent = user.fullName || '';
        document.getElementById('customer-fullname').textContent = user.fullName || '';
        document.getElementById('customer-phone').textContent = user.phone || '';
        document.getElementById('customer-address').textContent = user.address || '';
        
    }

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const accountSidebarButtons = document.querySelectorAll('.account-sidebar .sidebar-btn');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function () {
            if (mobileNav.style.display === 'flex') {
                mobileNav.style.display = 'none';
            } else {
                mobileNav.style.display = 'flex';
            }
        });
    }

    accountSidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            accountSidebarButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');

            // Here you would typically load different content based on the active button
            // For example:
            // if (this.textContent.includes('Đổi mật khẩu')) {
            //     // Show change password form, hide account info
            // } else {
            //     // Show account info, hide change password form
            // }
            console.log(this.textContent.trim() + " clicked");
        });
    });

    const editBtn = document.querySelector('.edit-info-btn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            window.location.href = '../pages/editcustomer.html';
        });
    }

});