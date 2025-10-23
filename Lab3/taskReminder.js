const readline=require("readline")
const eventEmmiter=require("events");
const event=new eventEmmiter();
let rem,name,task;
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function repeat(){
     rl.question("how many task you want to add ",(task1)=>{
        console.log(task1);
        task=task1;
    if(task>0){
        rl.question("Enter the task description: ",(name1)=>{
        console.log(name1);
        name=name1;
    rl.question("Enter the reminder for the task: ",(rem1)=>{
        console.log(Number.parseInt(rem1))
        rem=rem1;
        event.emit("reminder");
    })
    })
    task--;
    

    event.on("reminder",(rem2)=>{
        setTimeout((rem)=>{
        console.log("The task is: "+name)
        console.log("The Time is Over")
        }  ,rem);
    })
    

}

else{
    return 0
}



repeat()

/*
const readline = require("readline");
const EventEmitter = require("events");
const event = new EventEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];
let taskCount = 0;

// This function adds one task
function addTask(index) {
  rl.question("Enter the description for task"+ (index + 1)+" : ", (name) => {
    rl.question("Enter the reminder time (in milliseconds) for task "+(index + 1)+":"+ , (rem) => {
      let reminderTime = parseInt(rem);
      tasks.push({ name, reminderTime });

      // Emit reminder event for this task
      event.emit("reminder", name, reminderTime);

      if (index + 1 < taskCount) {
        addTask(index + 1); // Recursively ask for next task
      } else {
        rl.close();
      }
    });
  });
}

// Listener for reminders
event.on("reminder", (name, reminderTime) => {
  setTimeout(() => {
    console.log("Reminder The task is: "+name);
    console.log(" The time is over.");
  }, reminderTime);
});

// Ask how many tasks
rl.question("How many tasks do you want to add? ", (task1) => {
  taskCount = parseInt(task1);
  if (taskCount > 0) {
    addTask(0);
  } else {
    console.log("No tasks to add.");
    rl.close();
  }
});
