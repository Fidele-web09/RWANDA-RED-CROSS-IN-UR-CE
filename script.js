// ========================================
// RWANDA RED CROSS - UR-CE
// Website JavaScript
// ========================================


// ========================================
// MOBILE MENU
// ========================================

function toggleMenu() {

    const menu = document.getElementById("navMenu");

    if (menu) {
        menu.classList.toggle("show");
    }
}


// ========================================
// SIGN UP
// ========================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const studentId =
            document.getElementById("studentId").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const role =
            document.getElementById("role").value;

        const message =
            document.getElementById("signupMessage");


        // Check passwords
        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.style.color = "#d71920";

            return;
        }


        // Check password length
        if (password.length < 8) {

            message.textContent =
                "Password must contain at least 8 characters.";

            message.style.color = "#d71920";

            return;
        }


        // Check existing account
        const existingUser =
            localStorage.getItem("redCrossUser");

        if (existingUser) {

            const user =
                JSON.parse(existingUser);

            if (user.email === email) {

                message.textContent =
                    "An account with this email already exists.";

                message.style.color = "#d71920";

                return;
            }
        }


        // Create user
        const newUser = {

            fullName: fullName,

            email: email,

            studentId: studentId,

            password: password,

            role: role

        };


        // Save account
        localStorage.setItem(
            "redCrossUser",
            JSON.stringify(newUser)
        );


        // Success message
        message.textContent =
            "Account created successfully! Redirecting to login...";

        message.style.color = "green";


        // Go to login
        setTimeout(function() {

            window.location.href = "login.html";

        }, 1500);

    });

}



// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


        const password =
            document.getElementById("loginPassword")
            .value;


        const message =
            document.getElementById("loginMessage");


        // Get saved account
        const savedUser =
            localStorage.getItem("redCrossUser");


        // No account
        if (!savedUser) {

            message.textContent =
                "No account found. Please sign up first.";

            message.style.color = "#d71920";

            return;
        }


        const user =
            JSON.parse(savedUser);


        // Check credentials
        if (
            email === user.email &&
            password === user.password
        ) {


            // Create login session
            localStorage.setItem(
                "redCrossLoggedIn",
                "true"
            );


            // Save current user
            localStorage.setItem(
                "redCrossCurrentUser",
                JSON.stringify(user)
            );


            message.textContent =
                "Login successful! Welcome " +
                user.fullName + ".";

            message.style.color = "green";


            // Redirect to dashboard
            setTimeout(function() {

                window.location.href =
                    "dashboard.html";

            }, 1000);


        } else {

            message.textContent =
                "Incorrect email or password.";

            message.style.color = "#d71920";

        }

    });

}



// ========================================
// LOGOUT
// ========================================

function logoutUser() {

    localStorage.removeItem(
        "redCrossLoggedIn"
    );

    localStorage.removeItem(
        "redCrossCurrentUser"
    );


    window.location.href =
        "index.html";
}
