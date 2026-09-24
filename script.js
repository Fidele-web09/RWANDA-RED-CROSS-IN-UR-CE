// ========================================
// RWANDA RED CROSS - UR-CE
// Website JavaScript
// Supabase Authentication
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

    signupForm.addEventListener("submit", async function(event) {

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


        // Show loading message
        message.textContent =
            "Creating your account...";

        message.style.color = "#555";


        try {

            const { data, error } =
                await supabaseClient.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        emailRedirectTo:
                            "https://fidele-web09.github.io/RWANDA-RED-CROSS-IN-UR-CE/",

                        data: {

                            full_name: fullName,

                            student_id: studentId,

                            role: role

                        }

                    }

                });


            // Supabase error
            if (error) {

                message.textContent =
                    error.message;

                message.style.color = "#d71920";

                return;
            }


            // Account created
            if (data.user) {

                message.textContent =
                    "Account created successfully! Please check your email to confirm your account.";

                message.style.color = "green";

                /*
                 * Do NOT redirect immediately to login.
                 * The user needs to confirm the email first.
                 */

            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Something went wrong. Please try again.";

            message.style.color = "#d71920";

        }

    });

}


// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        message.textContent =
            "Logging in...";

        message.style.color = "#555";


        try {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({

                    email: email,

                    password: password

                });


            if (error) {

                message.textContent =
                    "Incorrect email or password.";

                message.style.color = "#d71920";

                console.error(error);

                return;
            }


            if (data.user) {

                message.textContent =
                    "Login successful! Welcome.";

                message.style.color = "green";

                setTimeout(function() {

                    window.location.href =
                        "dashboard.html";

                }, 1000);

            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Something went wrong. Please try again.";

            message.style.color = "#d71920";

        }

    });

}


// ========================================
// LOGOUT
// ========================================

async function logoutUser() {

    try {

        const { error } =
            await supabaseClient.auth.signOut();

        if (error) {

            console.error(error);

            return;
        }

        window.location.href =
            "index.html";

    } catch (error) {

        console.error(error);

        window.location.href =
            "index.html";

    }

}
