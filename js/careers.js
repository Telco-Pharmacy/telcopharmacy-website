/* =========================================================
   TELCO PHARMACY & STORES
   CAREERS APPLICATION
   File: js/careers.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const careerForm =
        document.getElementById("career-form");

    const message =
        document.getElementById("career-form-message");


    /* -----------------------------------------------------
       Stop if the Careers form does not exist
    ----------------------------------------------------- */

    if (!careerForm) {
        return;
    }


    /* -----------------------------------------------------
       Form submission
    ----------------------------------------------------- */

    careerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* -------------------------------------------------
           Check EmailJS availability
        ------------------------------------------------- */

        if (
            typeof emailjs === "undefined"
        ) {

            showMessage(
                "Email service is currently unavailable. Please try again later or contact Telco Pharmacy directly.",
                "error"
            );

            return;
        }


        /* -------------------------------------------------
           Check application configuration
        ------------------------------------------------- */

        if (
            typeof APP_CONFIG === "undefined" ||
            !APP_CONFIG.EMAILJS
        ) {

            showMessage(
                "Application service is not configured yet.",
                "error"
            );

            return;
        }


        const serviceId =
            APP_CONFIG.EMAILJS.SERVICE_ID;

        const templateId =
            APP_CONFIG.EMAILJS.CAREERS_TEMPLATE_ID;


        /* -------------------------------------------------
           Make sure IDs exist
        ------------------------------------------------- */

        if (
            !serviceId ||
            !templateId
        ) {

            showMessage(
                "The Careers email service has not been configured yet.",
                "error"
            );

            return;
        }


        /* -------------------------------------------------
           Get submit button
        ------------------------------------------------- */

        const submitButton =
            careerForm.querySelector(
                ".career-submit"
            );


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";
        }


        /* -------------------------------------------------
           Send form through EmailJS
        ------------------------------------------------- */

        emailjs.sendForm(
            serviceId,
            templateId,
            careerForm
        )

        .then(function () {

            showMessage(
                "Thank you for your application. Your information has been submitted successfully. We will review your application and contact you if there is a suitable opportunity.",
                "success"
            );


            careerForm.reset();


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Submit Application";
            }

        })


        .catch(function (error) {

            console.error(
                "Careers EmailJS Error:",
                error
            );


            showMessage(
                "We could not submit your application at this time. Please try again or contact Telco Pharmacy directly.",
                "error"
            );


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Submit Application";
            }

        });

    });


    /* -----------------------------------------------------
       Status message helper
    ----------------------------------------------------- */

    function showMessage(text, type) {

        if (!message) {
            return;
        }


        message.textContent = text;

        message.style.display = "block";


        if (type === "success") {

            message.style.background =
                "#d4edda";

            message.style.color =
                "#155724";

            message.style.border =
                "1px solid #c3e6cb";

        }

        else {

            message.style.background =
                "#f8d7da";

            message.style.color =
                "#721c24";

            message.style.border =
                "1px solid #f5c6cb";

        }


        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

});
