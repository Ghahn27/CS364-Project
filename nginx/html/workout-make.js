async function submitWorkout(event) {
    event.preventDefault();

    const workoutName = document.getElementById("WOName").value;
    const Sets = document.getElementById("set").value;
    const Reps = document.getElementById("rep").value;
    const Weight = document.getElementById("wei").value;

    const response = await fetch("/api/exercise", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ workoutname: workoutName, numSets: Sets, reps: Reps, numWeight: Weight })
    })
    const data = await response.json();
    alert(data.message);
}