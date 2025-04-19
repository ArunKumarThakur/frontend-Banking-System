const balance = document.getElementById("balance");
const id = document.getElementById("id"); // Renamed to avoid conflict
const form = document.getElementById("userForm");



async function register() {
    try {
        const amount = balance.value.trim(); 

        if(amount < 500) {
            form.reset();
            alert("Minimum amount should be 500");
            return;
        }
        const customerId = id.value.trim();   
        
        const data = {
            "balance" : amount,
            "customer" : {
                "customerId" : customerId
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
        form.reset(); 
        return true;
    } catch (error) {
        console.error("Registration error:", error);
        alert("Account openeing failed: " + error.message);
        return false;
    }
}





document.getElementById("userForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    await register();
});