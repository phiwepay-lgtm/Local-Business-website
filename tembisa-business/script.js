/* Small progressive enhancements for Thato's Reliable Services */

document.addEventListener('DOMContentLoaded', function () {
    const serviceLabels = {
        plumbing: 'Plumbing & Home Repairs',
        electrical: 'Electrical Maintenance & Wiring',
        digital: 'Digital Support & Setup',
        gardening: 'Gardening & Property Care',
        multiple: 'more than one service',
        unsure: 'the right service'
    };

    /* Pre-select the service when a visitor follows a "Request This Service" link. */
    const requestedService = new URLSearchParams(window.location.search).get('service');
    const serviceSelect = document.getElementById('service');

    if (serviceSelect && Object.prototype.hasOwnProperty.call(serviceLabels, requestedService)) {
        serviceSelect.value = requestedService;

        const note = document.getElementById('selected-service-note');
        if (note) {
            note.textContent = requestedService === 'unsure'
                ? "No problem — describe what you need and we'll point you in the right direction."
                : "You're enquiring about " + serviceLabels[requestedService] + '. Tell us a little more below.';
            note.hidden = false;
        }
    }

    /* Quick finder buttons scroll to the matching service and briefly highlight it. */
    document.querySelectorAll('[data-scroll-target]').forEach(function (button) {
        button.addEventListener('click', function () {
            const target = document.getElementById(button.getAttribute('data-scroll-target'));
            if (!target) return;

            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.remove('spotlight');
            void target.offsetWidth;
            target.classList.add('spotlight');

            window.setTimeout(function () {
                target.classList.remove('spotlight');
            }, 2000);
        });
    });

    /* Give clear feedback on the demo contact form. */
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const status = document.getElementById('form-status');

            if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
                status.textContent = 'Please add your name, phone number and a short description so we can help.';
                status.style.background = '#fff4e0';
                status.style.color = '#b45309';
                status.hidden = false;
                return;
            }

            const chosen = serviceSelect && serviceLabels[serviceSelect.value]
                ? serviceLabels[serviceSelect.value]
                : serviceLabels.unsure;

            status.textContent = "Thank you! We've noted your enquiry about " + chosen + ". We'll be in touch shortly.";
            status.style.background = '';
            status.style.color = '';
            status.hidden = false;

            form.reset();
            if (serviceSelect) serviceSelect.value = 'unsure';

            const note = document.getElementById('selected-service-note');
            if (note) note.hidden = true;
        });
    }
});
