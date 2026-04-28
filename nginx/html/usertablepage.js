async function DisplayTable(){
    try{
        const limit = parseInt(document.getElementById("limiter").value);
        const response = await fetch(`/api/users?limit=${limit}`, {credentials: "include"});
        const data = await response.json();
        console.log(data);
        const length = data.length;
        var temp="";
        for(i=0;i<length;i++){
            temp+="<tr>";
            temp+="<td>"+data[i].firstname+"</td>";
            temp+="<td>"+data[i].lastname+"</td>";
            temp+="<td>"+data[i].username+"</td>";
            temp+="<td>"+data[i].email+"</td>";
            temp+="<td>"+data[i].role+"</td>";
            temp+="</tr>";
        }
        document.getElementById("Table").style.display="";
        document.getElementById("data").innerHTML=temp;
    }
    catch (error){
        console.error("Error displaying table:", error);
        alert("Could not display table" + error.message);
    }
}

async function TruncateTable(){
   try {
        const response = await fetch("/api/users/truncate", {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json();

        if (result.success) {
            // Show success alert and redirect to frontpage.html
            alert("Table Truncated Successfully")
            document.getElementById("Table").style.display="none";
            document.getElementById("data").innerHTML="";
        } else {
            // Show error alert if registration fails
            console.log(result);
            alert(result.error || "Failed to Truncate");
        }

    } catch (error) {
        console.error("Error during truncation:", error);
        alert("An error occurred could not truncate");
    }
}

async function PopulateTable(event) {
    console.log("here we are in usertablepage.js");
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById("populatetable"));

    const userData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role")
    };

    const jsonBody = JSON.stringify(userData);

    try {
        const response = await fetch("/api/users/populate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonBody
        });

        const result = await response.json();

        if (response.ok) {
            // Show success alert and redirect to frontpage.html
            console.log("Population OK:");
            console.log(result);
            if(result.success == true){
               alert(`${result.message} for ${result.username}`);
               window.location.href = "usertablepage.html";
            } else {
               alert(`${result.message}`);
            }
        } else {
            // Show error alert if registration fails
            console.log("response not OK");
            console.log(result);
            console.log("Failed to populate:", response.statusText);
            alert(result.error || "Population failed. Please try again.");
        }

    } catch (error) {
        console.error("... error in population");
        console.error("Error during population:", error);
        console.error(`jsonBody: ${jsonBody}`);
        alert("An error occurred. Please try again.");
    }
}