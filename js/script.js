if (typeof $ !== 'undefined') {
$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (window.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (window.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html, body').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html, body').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html, body').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    if (document.querySelector('.typing')) {
    const typed1 = new Typed(".typing", {
        strings: ["Data Analyst", "Backend Developer", "Freelancer", "AI-ML Developer", "System Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    }

    if (document.querySelector('.typing-2')) {
    const typed2 = new Typed(".typing-2", {
        strings: ["Data Analyst", "Backend Developer", "Freelancer", "AI-ML Developer", "System Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    }

    // owl carousel script
    if (document.querySelector('.carousel')) {
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
    }

});
}

/* Single source of truth for the Web3Forms API key.
   Update here only if you rotate the key. */
var WEB3FORMS_KEY = 'c0e1fa20-6b02-4e0b-82fc-06e6b0eb3256';

/* =========================================================
   Contact Form  (index.html  →  #contactForm)
   Submits to Web3Forms API and shows an inline status msg.
   ========================================================= */
function handleContactSubmit(event) {
    event.preventDefault();

    var form = document.getElementById('contactForm');
    var btn = document.getElementById('contactSubmitBtn');
    var msg = document.getElementById('contactFormMsg');

    // Loading state
    btn.disabled = true;
    btn.textContent = 'Sending…';
    msg.style.display = 'none';

    var data = {
        access_key: WEB3FORMS_KEY,
        subject: 'New Contact Message - Portfolio',
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        message_subject: form.querySelector('[name="message_subject"]').value,
        message: form.querySelector('[name="message"]').value
    };

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(function (res) { return res.json(); })
        .then(function (json) {
            if (json.success) {
                form.reset();
                msg.style.display = 'block';
                msg.style.color = '#4CAF50';
                msg.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
            } else {
                console.error('Web3Forms error:', json);
                msg.style.display = 'block';
                msg.style.color = '#e74c3c';
                msg.textContent = 'Something went wrong. Please email me directly at parthlad4125@gmail.com';
            }
        })
        .catch(function (err) {
            console.error('Web3Forms fetch error:', err);
            msg.style.display = 'block';
            msg.style.color = '#e74c3c';
            msg.textContent = 'Network error. Please email me directly at parthlad4125@gmail.com';
        })
        .finally(function () {
            btn.disabled = false;
            btn.textContent = 'Send message';
        });
}

/* =========================================================
   Hire / Inquiry Form  (hire.html  →  #inquiryForm)
   Submits to Web3Forms API; shows the existing success modal
   on success, or an inline error message on failure.
   ========================================================= */
function handleInquirySubmit(event) {
    event.preventDefault();

    var form = document.getElementById('inquiryForm');
    var btn = form.querySelector('button[type="submit"]');

    // Create the error message element once if it doesn't exist yet
    var errMsg = document.getElementById('inquiryErrMsg');
    if (!errMsg) {
        errMsg = document.createElement('p');
        errMsg.id = 'inquiryErrMsg';
        errMsg.style.cssText = 'margin-top:12px;font-size:14px;color:#e74c3c;display:none;';
        btn.parentNode.insertBefore(errMsg, btn.nextSibling);
    }
    errMsg.style.display = 'none';

    // Loading state
    btn.disabled = true;
    btn.textContent = 'Sending…';

    var data = {
        access_key: WEB3FORMS_KEY,
        subject: 'New Hire Inquiry - Portfolio',
        name: document.getElementById('name').value,
        project_name: document.getElementById('project_name').value,
        email: document.getElementById('email').value,
        phone: (document.getElementById('country_code') ? document.getElementById('country_code').value + ' ' : '') + document.getElementById('phone').value,
        message: document.getElementById('requirements').value
    };

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(function (res) { return res.json(); })
        .then(function (json) {
            if (json.success) {
                // Show the existing success modal
                document.getElementById('modalOverlay').classList.add('active');
            } else {
                console.error('Web3Forms error:', json);
                errMsg.style.display = 'block';
                errMsg.textContent = 'Something went wrong. Please email me directly at parthlad4125@gmail.com';
            }
        })
        .catch(function (err) {
            console.error('Web3Forms fetch error:', err);
            errMsg.style.display = 'block';
            errMsg.textContent = 'Network error. Please email me directly at parthlad4125@gmail.com';
        })
        .finally(function () {
            btn.disabled = false;
            btn.textContent = 'Send Inquiry';
        });
}

function closeSuccessModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('inquiryForm').reset();
}

// Phone number validation logic based on country code
document.addEventListener("DOMContentLoaded", function () {
    var countryCodeSelect = document.getElementById('country_code');
    var phoneInput = document.getElementById('phone');

    if (countryCodeSelect && phoneInput) {
        var updatePhoneValidation = function () {
            var country = countryCodeSelect.value;
            var pattern = "";
            var title = "";

            switch (country) {
                case "+91": // India
                    pattern = "[0-9]{10}";
                    title = "Please enter exactly 10 digits for an Indian phone number";
                    break;
                case "+1": // USA
                    pattern = "[0-9]{10}";
                    title = "Please enter exactly 10 digits for a US phone number";
                    break;
                case "+44": // UK
                    pattern = "[0-9]{10,11}";
                    title = "Please enter 10 or 11 digits for a UK phone number";
                    break;
                case "+61": // Australia
                    pattern = "[0-9]{9}";
                    title = "Please enter exactly 9 digits for an Australian phone number";
                    break;
                case "+81": // Japan
                    pattern = "[0-9]{10,11}";
                    title = "Please enter 10 or 11 digits for a Japanese phone number";
                    break;
                default:
                    pattern = "[0-9]{7,15}";
                    title = "Please enter a valid phone number containing 7 to 15 digits";
            }

            phoneInput.setAttribute("pattern", pattern);
            phoneInput.setAttribute("title", title);
        };

        // Initialize on load
        updatePhoneValidation();

        // Update on change
        countryCodeSelect.addEventListener("change", function () {
            updatePhoneValidation();
        });
    }
});
