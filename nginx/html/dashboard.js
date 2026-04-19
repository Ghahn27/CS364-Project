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

async function fetchUsers() {
    const response = await fetch("/api/users", { credentials: "include" });
    const users = await response.json();

    if (response.ok) {
        // get HTML table (going to add returned values to the table)
        const userTable = document.getElementById("userList");
        userTable.innerHTML = ""; // clear the previous content of the table

        // for each user in result, create table row and append to table in DOM
        users.forEach(user => {  
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.role}</td>`;
            userTable.appendChild(row);
        });

    } else {
        alert("Unauthorized access! - remove this alert from dashboard.js (line:18) when 'done'"); // comment this out when confident
        window.location.href = "/website.html";
    }
}

fetchUsers();
