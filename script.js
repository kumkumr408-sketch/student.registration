// Get HTML elements

const form =
    document.getElementById("registrationForm");

const page1 =
    document.getElementById("page1");

const page2 =
    document.getElementById("page2");

const confirmation =
    document.getElementById("confirmation");


const nextBtn =
    document.getElementById("nextBtn");

const backBtn =
    document.getElementById("backBtn");

const registerAgainBtn =
    document.getElementById("registerAgainBtn");


const step1 =
    document.getElementById("step1");

const step2 =
    document.getElementById("step2");


const nameInput =
    document.getElementById("name");

const classInput =
    document.getElementById("class");

const branchInput =
    document.getElementById("branch");

const mobileInput =
    document.getElementById("mobile");


// Function to show error

function setError(input, errorElement, message) {

    input.classList.toggle(
        "invalid",
        Boolean(message)
    );

    errorElement.textContent = message;
}


// Validate student details

function validateStudentDetails() {

    let valid = true;

    const name =
        nameInput.value.trim();

    const className =
        classInput.value.trim();

    const branch =
        branchInput.value.trim();

    const mobile =
        mobileInput.value.trim();


    // Name validation

    if (name === "") {

        setError(
            nameInput,
            document.getElementById("nameError"),
            "Please enter your name."
        );

        valid = false;

    } else {

        setError(
            nameInput,
            document.getElementById("nameError"),
            ""
        );
    }


    // Class validation

    if (className === "") {

        setError(
            classInput,
            document.getElementById("classError"),
            "Please enter your class."
        );

        valid = false;

    } else {

        setError(
            classInput,
            document.getElementById("classError"),
            ""
        );
    }


    // Branch validation

    if (branch === "") {

        setError(
            branchInput,
            document.getElementById("branchError"),
            "Please enter your branch."
        );

        valid = false;

    } else {

        setError(
            branchInput,
            document.getElementById("branchError"),
            ""
        );
    }


    // Mobile validation

    if (mobile === "") {

        setError(
            mobileInput,
            document.getElementById("mobileError"),
            "Please enter your mobile number."
        );

        valid = false;

    } else if (!/^\d{10}$/.test(mobile)) {

        setError(
            mobileInput,
            document.getElementById("mobileError"),
            "Mobile number must contain exactly 10 digits."
        );

        valid = false;

    } else {

        setError(
            mobileInput,
            document.getElementById("mobileError"),
            ""
        );
    }


    return valid;
}


// Show Page 1 or Page 2

function showPage(pageNumber) {

    if (pageNumber === 1) {

        page1.classList.add("active");

        page2.classList.remove("active");


        step1.classList.add("active");

        step1.classList.remove("completed");

        step2.classList.remove("active");

    }

    else {

        page1.classList.remove("active");

        page2.classList.add("active");


        step1.classList.remove("active");

        step1.classList.add("completed");

        step2.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Next button

nextBtn.addEventListener(
    "click",
    function () {

        if (validateStudentDetails()) {

            showPage(2);

        }

    }
);


// Back button

backBtn.addEventListener(
    "click",
    function () {

        showPage(1);

    }
);


// Allow only numbers in mobile field

mobileInput.addEventListener(
    "input",
    function () {

        mobileInput.value =
            mobileInput.value
                .replace(/\D/g, "")
                .slice(0, 10);

    }
);


// Validate fields while typing

document
    .querySelectorAll("#page1 input")
    .forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                if (
                    input.classList.contains("invalid")
                ) {

                    validateStudentDetails();

                }

            }
        );

    });


// Submit form

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Get selected events

        const selected =
            [
                ...document.querySelectorAll(
                    'input[name="events"]:checked'
                )
            ].map(
                checkbox => checkbox.value
            );


        const eventsError =
            document.getElementById(
                "eventsError"
            );


        // Check event selection

        if (selected.length === 0) {

            eventsError.textContent =
                "Please select at least one event.";

            return;
        }


        eventsError.textContent = "";


        // Display student name

        document.getElementById(
            "confirmName"
        ).textContent =
            nameInput.value.trim();


        // Display selected events

        const selectedEvents =
            document.getElementById(
                "selectedEvents"
            );


        selectedEvents.innerHTML = "";


        selected.forEach(
            function (eventName) {

                const badge =
                    document.createElement("span");

                badge.className =
                    "selected-event";

                badge.textContent =
                    eventName;

                selectedEvents.appendChild(
                    badge
                );

            }
        );


        // Hide form and progress

        form.style.display = "none";

        document.querySelector(
            ".progress"
        ).style.display = "none";


        // Show confirmation

        confirmation.classList.add("show");


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// Register another student

registerAgainBtn.addEventListener(
    "click",
    function () {

        // Reset form

        form.reset();


        // Show form

        form.style.display = "block";


        document.querySelector(
            ".progress"
        ).style.display = "flex";


        // Hide confirmation

        confirmation.classList.remove(
            "show"
        );


        // Clear errors

        document
            .querySelectorAll(".error")
            .forEach(function (error) {

                error.textContent = "";

            });


        // Remove invalid styles

        document
            .querySelectorAll("input")
            .forEach(function (input) {

                input.classList.remove(
                    "invalid"
                );

            });


        // Go to first page

        showPage(1);

    }
);