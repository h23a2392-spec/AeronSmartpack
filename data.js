// Get URL parameter ?id=XXXX
function getUserId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

// Load JSON based on id
async function loadUserData() {
    const userId = getUserId();

    if (!userId) {
        document.getElementById("error").innerText = "No ID provided in QR.";
        return;
    }

    try {
        const response = await fetch(`./data/${userId}.json`);

        if (!response.ok) {
            throw new Error("User file not found.");
        }

        const data = await response.json();

        // Auto fill HTML
        document.getElementById("ownerName").innerText = data.OwnerName;
        document.getElementById("country").innerText = data.Country;
        document.getElementById("bloodType").innerText = data.BloodType;
        document.getElementById("allergies").innerText = data.Allergies;
        document.getElementById("emergencyContact").innerText = data.EmergencyContact;
        document.getElementById("ifFound").innerText = data.IfFound;

    } catch (err) {
        document.getElementById("error").innerText = "User data not found.";
    }
}

window.onload = loadUserData;
