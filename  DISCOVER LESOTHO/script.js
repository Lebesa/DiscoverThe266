document.addEventListener("DOMContentLoaded", function () {

    let themeButton = document.getElementById("themeButton");

    if (localStorage.getItem("websiteTheme") == "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeButton) {
        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Light mode";
        }

        themeButton.onclick = function () {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("websiteTheme", "dark");
                themeButton.textContent = "Light mode";
            } else {
                localStorage.setItem("websiteTheme", "light");
                themeButton.textContent = "Dark mode";
            }
        };
    }

    let searchBox = document.getElementById("destinationSearch");
    let categoryFilter = document.getElementById("categoryFilter");
    let destinations = document.getElementsByClassName("destination-item");
    let noResults = document.getElementById("noResults");

    function searchDestinations() {
        let text = searchBox.value.trim().toLowerCase();
        let category = categoryFilter.value;
        let count = 0;

        for (let i = 0; i < destinations.length; i++) {
            let name = destinations[i].getAttribute("data-name");
            let type = destinations[i].getAttribute("data-category");

            if (name.includes(text) && (category == "all" || type == category)) {
                destinations[i].style.display = "";
                count++;
            } else {
                destinations[i].style.display = "none";
            }
        }

        if (count == 0) {
            noResults.classList.remove("d-none");
        } else {
            noResults.classList.add("d-none");
        }
    }

    if (searchBox && categoryFilter) {
        searchBox.oninput = searchDestinations;
        categoryFilter.onchange = searchDestinations;
    }

    let bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        bookingForm.onsubmit = function (event) {
            event.preventDefault();
            if (bookingForm.checkValidity()) {
                let name = document.getElementById("bookingName").value.trim();
                document.getElementById("bookingMessage").textContent = "Thank you, " + name + ". Your booking enquiry is ready.";
                bookingForm.reset();
            } else {
                bookingForm.reportValidity();
            }
        };
    }

    let contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.onsubmit = function (event) {
            event.preventDefault();
            if (contactForm.checkValidity()) {
                document.getElementById("contactMessage").textContent = "Thank you. Your message has been recorded for this demonstration.";
                contactForm.reset();
            } else {
                contactForm.reportValidity();
            }
        };
    }

    let calculateButton = document.getElementById("calculateButton");

    if (calculateButton) {
        let calcPeople = document.getElementById("calcPeople");
        let rate = document.getElementById("rate");
        let totalCost = document.getElementById("totalCost");

        function calculate() {
            let total = Number(calcPeople.value) * Number(rate.value);
            if (calcPeople.value < 1 || calcPeople.value > 20 || rate.value < 0 || isNaN(total)) {
                totalCost.textContent = "Please enter valid numbers.";
            } else {
                totalCost.textContent = "Estimated total: M" + total.toFixed(2);
            }
        }

        calculateButton.onclick = calculate;
        calcPeople.oninput = calculate;
        rate.oninput = calculate;
    }

    let visitDate = document.getElementById("visitDate");

    if (visitDate) {
        let today = new Date();
        let month = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");
        visitDate.min = today.getFullYear() + "-" + month + "-" + day;
    }

});
