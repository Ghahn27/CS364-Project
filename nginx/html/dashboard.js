

function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

function selectOption(value) {
    document.querySelector('.dropdownB').textContent = value;
    document.getElementById('dropdownMenu').classList.remove('show');
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdownB')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


async function checkAdmin(){
    const response = await fetch("/api/session", {credentials: "include"});
    const data = await response.json();

    console.log(data);
    if (data.loggedIn && data.user.role === "admin") {
        document.getElementById("adminBtn").style.display = "block";
    }

}

checkAdmin();

async function getWorkouts() {
    try {
        const response = await fetch("/api/workout", {
            credentials: "include"
        });

        const workouts = await response.json();
        console.log("Workouts:", workouts);

        const menu = document.getElementById("dropdownMenu");

        workouts.forEach(WO => {
            const div = document.createElement("div");

            const justName = WO.workoutname.split("_")[0];

            div.textContent = justName;

            div.onclick = () => selectOption(justName);

            menu.appendChild(div);
            
        });
    } catch (error) {
        console.error("Could not get workout name", error);
    }
}

getWorkouts();




