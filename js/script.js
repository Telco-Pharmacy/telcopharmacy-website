/* ==========================================
   TELCO PHARMACY
   MAIN JAVASCRIPT
========================================== */


/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

if (menu && navLinks) {

    menu.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {

            menu.innerHTML = "✕";

        } else {

            menu.innerHTML = "☰";

        }

    });

}


links.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

        if (menu) {

            menu.innerHTML = "☰";

        }

    });

});


/* ==========================================
   EMAILJS INITIALIZATION
========================================== */

if (typeof emailjs !== "undefined" && typeof APP_CONFIG !== "undefined") {

    emailjs.init({

        publicKey: APP_CONFIG.EMAILJS.PUBLIC_KEY

    });

}


/* ==========================================
   APPOINTMENT FORM
========================================== */

const appointmentForm =
    document.getElementById("appointmentForm");


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const formData = {

                fullname:
                    document.getElementById("fullname").value,

                email:
                    document.getElementById("email").value,

                phone:
                    document.getElementById("phone").value,

                service:
                    document.getElementById("service").value,

                message:
                    document.getElementById("message").value

            };


            emailjs.send(

                APP_CONFIG.EMAILJS.SERVICE_ID,

                APP_CONFIG.EMAILJS.TEMPLATE_ID,

                formData

            )

            .then(function () {

                const successMessage =
                    document.getElementById(
                        "successMessage"
                    );


                if (successMessage) {

                    successMessage.style.display = "block";

                    successMessage.scrollIntoView({

                        behavior: "smooth"

                    });

                }


                appointmentForm.reset();

            })


            .catch(function (error) {

                alert(
                    "Unable to send your appointment request at the moment. Please try again or contact us on WhatsApp."
                );

                console.error(
                    "EmailJS Error:",
                    error
                );

            });

        }

    );

}
