

function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

function selectOption(value) {
    document.querySelector('.dropdownB').textContent = value;
    document.getElementById('dropdownMenu').classList.remove('show');
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
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





