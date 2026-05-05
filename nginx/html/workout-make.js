
let exNum = 4;

function addExercise(event){
    exNum++;
    const form = document.querySelector(".ExerciseForm form");
    const addBtn = document.getElementById("addEx");
    const label = document.createElement("label");
    label.textContent = "Exercise " + exNum;
    label.htmlFor = "ex" + exNum;
    const input = document.createElement("input");
    input.type = "text";
    input.id = "ex" + exNum;
    input.placeholder = "Input exercise";
    form.insertBefore(label, addBtn);
    form.insertBefore(input, addBtn);
}

function removeExercise() {
    if(exNum <= 1) {
        return;
    }
    document.getElementById("ex" + exNum).remove();
    document.querySelector("label[for='ex" + exNum + "']").remove();
    exNum--;
}

async function submitWorkout(event) {
    event.preventDefault();

    const workoutName = document.getElementById("WOName").value;
    const exercises = [];

    for(let i = 1; i <= exNum; i++) {
        const name = document.getElementById("ex" + i)?.value;
        if(name) exercises.push(name);
    }

    const response = await fetch("/api/workout", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ workoutname: workoutName, exercises })
    })
    const data = await response.json();
    alert(data.message);
}