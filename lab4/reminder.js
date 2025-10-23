const readline = require("readline");
const EventEmitter = require("events");
const fs=require("fs");
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
    rl.question("Enter the reminder  for task "+(index + 1)+":" , (rem) => {
      let reminderTime = parseInt(rem*1000);
      tasks.push({ name, reminderTime });

      // Emit reminder event for this task
      event.emit("reminder", name, reminderTime);

    //Storing in file  
    fs.appendFileSync("data.csv","\nThe task is:"+name+"\n")
    fs.appendFileSync("data.csv","The reminder for the task "+name+" is: "+rem+" seconds\n")
    const data=fs.readFileSync("data.csv","utf8")

    
      if (index + 1 < taskCount) {
        addTask(index + 1); // Recursively ask for next task
      } else {
        rl.close();
      }
    });
  });
}

const taskreminder=()=>{
    // Listener for reminders
    event.on("reminder", (name, reminderTime) => {
    setTimeout(() => {
        console.log("Reminder The task is: "+name);
        console.log("The time is over.\n");
    }, reminderTime);
    });
}
taskreminder()

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

module.exports=({addTask,taskreminder});




/*



const readline = require("readline");
const EventEmitter = require("events");
const fs=require("fs");
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
    rl.question("Enter the reminder  for task "+(index + 1)+":" , (rem) => {
      let reminderTime = parseInt(rem*1000);
      tasks.push({ name, reminderTime });

      // Emit reminder event for this task
      event.emit("reminder", name, reminderTime);

    //Storing in file  
    fs.appendFileSync("data.csv","\nThe task is:"+name+"\n")
    fs.appendFileSync("data.csv","The reminder for the task "+name+" is: "+rem+" seconds\n")
    const data=fs.readFileSync("data.csv","utf8")

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
    console.log("The time is over.\n");
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


*/

