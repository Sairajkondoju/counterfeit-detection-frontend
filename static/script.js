// Creative JavaScript for Counterfeit Detection UI

document.addEventListener('DOMContentLoaded', function() {
    // Drag and drop functionality
    const fileInputs = document.querySelectorAll('.file-input');

    fileInputs.forEach(input => {
        const label = input.previousElementSibling;

        // Drag over
        input.addEventListener('dragover', function(e) {
            e.preventDefault();
            input.classList.add('dragover');
        });

        // Drag leave
        input.addEventListener('dragleave', function(e) {
            e.preventDefault();
            input.classList.remove('dragover');
        });

        // Drop
        input.addEventListener('drop', function(e) {
            e.preventDefault();
            input.classList.remove('dragover');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                updateFileName(input, files[0].name);
            }
        });

        // File selection
        input.addEventListener('change', function(e) {
            if (input.files.length > 0) {
                updateFileName(input, input.files[0].name);
            }
        });
    });

    function updateFileName(input, fileName) {
        const label = input.previousElementSibling;
        label.innerHTML = `<strong>Selected:</strong> ${fileName}`;
        label.style.color = 'var(--success-color)';
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe chart containers
    document.querySelectorAll('.chart-container').forEach(container => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(container);
    });

    // Loading animation for form submission
    const form = document.querySelector('.upload-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span class="loading"></span> Analyzing...';
            submitBtn.disabled = true;

            // Re-enable after 30 seconds as fallback
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 30000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Progress indicator for results page
    if (document.querySelector('.result-summary')) {
        const riskScore = parseInt(document.querySelector('.risk-score').textContent.split('/')[0]);
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-fill" style="width: ${riskScore}%"></div>
        `;

        document.querySelector('.result-summary').appendChild(progressBar);
    }
});

// Add CSS for progress bar dynamically
const style = document.createElement('style');
style.textContent = `
    .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(255,255,255,0.3);
        border-radius: 4px;
        margin-top: 1rem;
        overflow: hidden;
    }
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        border-radius: 4px;
        transition: width 1s ease;
    }
`;
document.head.appendChild(style);