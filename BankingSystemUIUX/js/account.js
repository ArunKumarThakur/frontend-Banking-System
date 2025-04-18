const username = document.getElementById("userName");
const dobInput = document.getElementById("dob"); // Renamed to avoid conflict
const form = document.getElementById("userForm");



async function register() {
    try {
        const customerName = username.value.trim(); // Added 'const'
        const dobValue = dobInput.value.trim();    // Changed variable name
        
        const data = {
            "balance" : customerName,
            "customer" : {
                "customerId" : dobValue
            }
        };
        
        const response = await fetch("http://localhost:8080/accounts/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        alert("Account open successfully");
        form.reset(); // Clear the form after successful registration
        return true;
    } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed: " + error.message);
        return false;
    }
}



// form.addEventListener("submit", function(e) {
//     help();
// })

document.getElementById("userForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    await register();
});