document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TÍNH NĂNG COPY IP NHANH ---
    const copyIpBtn = document.getElementById('copy-ip-btn');
    const toast = document.getElementById('toast');

    if (copyIpBtn) {
        copyIpBtn.addEventListener('click', () => {
            const ipAddress = copyIpBtn.getAttribute('data-ip');
            
            // Sử dụng Clipboard API hiện đại
            navigator.clipboard.writeText(ipAddress).then(() => {
                // Hiển thị thông báo Toast thành công
                toast.classList.add('show');
                
                // Ẩn thông báo sau 3 giây
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Không thể sao chép IP: ', err);
            });
        });
    }

    // --- 2. MENU ĐIỀU HƯỚNG TRÊN MOBILE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksMenu = document.getElementById('nav-links-menu');

    if (mobileMenuBtn && navLinksMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksMenu.classList.toggle('open');
            
            // Thay đổi icon từ Bars (gạch) sang Xmark (đóng) khi click
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Đóng menu khi người dùng click chọn 1 mục bất kỳ
        const navLinks = navLinksMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksMenu.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- 3. ĐỔI TRẠNG THÁI ACTIVE MENU KHI CUỘN TRANG ---
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-btn-discord)');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // Thêm độ lệch để kích hoạt sớm hơn

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id') || '';
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').substring(1);
            
            if (href === currentSectionId || (currentSectionId === '' && href === '#')) {
                item.classList.add('active');
            }
        });
    });
});