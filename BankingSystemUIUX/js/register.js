const username = document.getElementById("userName");
const dobInput = document.getElementById("dob"); // Renamed to avoid conflict
const form = document.getElementById("userForm");

async function register() {
    try {
        const customerId = "CUS105";
        const customerName = username.value.trim(); // Added 'const'
        const dobValue = dobInput.value.trim();    // Changed variable name
        
        const data = {
            "customerId": customerId,
            "customerName": customerName,
            "dob": dobValue
        };
        
        const response = await fetch("http://localhost:8080/customers/save", {
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

        alert("Register success");
        form.reset(); // Clear the form after successful registration
        return true;
    } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed: " + error.message);
        return false;
    }
}

document.getElementById("userForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    await register();
});