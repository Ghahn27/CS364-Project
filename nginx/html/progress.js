async function DisplayTable(){
    try{
        const response = await fetch(`/api/exercise`, {credentials: "include"});
        const data = await response.json();
        console.log(data);
        const length = data.length;
        var temp="";
        for(i=0;i<length;i++){
            temp+="<tr>";
            temp+="<td>"+data[i].workoutname+"</td>";
            temp+="<td>"+data[i].numsets+"</td>";
            temp+="<td>"+data[i].reps+"</td>";
            temp+="<td>"+data[i].numweight+"</td>";
            temp+="<td>"+data[i].dtg+"</td>";
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