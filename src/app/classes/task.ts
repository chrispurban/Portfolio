export interface Task {
    _id:string;
    owner:string;
    subject:string;
    issue:string;
    notes:string;
    deadline:string;
    history:object;
    //messages:Message[];
}

export function example(){
  return {
    _id:"guest_0",
    subject:"Welcome",
    issue:"Click me to get started!",
    notes:[
        "Use the buttons at the bottom to ferry items between workflow states.",
        "Web addresses left here such as chrispurban.com are converted to links.",
        "Login sessions are handled live via auth0.com, with options to either validate against Google or email a code to you."
      ].map((x)=>"- "+x).join("\n"),
    deadline:"",
    history:[{id:workflow(0).id, time:new Date().toISOString()}],
    updatedAt:new Date().toISOString()
  }
}

// task = {subject:'', issue:'', notes:'', deadline:'', history:[]};
// this.task.history.push( {id:workflow(0).id, time:new Date().toISOString() });

export function workflow(x?){
  if(typeof x == "object"){
    let y = x
    y.state = y.history[y.history.length - 1]; // append current state time and its code
    y.state.phase = model.findIndex((state)=>state.id==y.state.id); // numeric position in workflow
    return y;
  }else if(typeof x == "number"){
    return model[x]; // only looking for information on one state
  }else{
    return model; // looking for the entire workflow, say, to generate groups
  }
}

const model = [
  {id:"A",name:"Draft",icon:"💡"},
  {id:"B",name:"Queued",icon:"🛎️️"},
  {id:"C",name:"Building",icon:"🏗️"},
  {id:"D",name:"Refining",icon:"🧹"},
  {id:"E",name:"Complete",icon:"🎉"}
]


/*
workflow(task) run as called from the server to load with current state properties
task.state.time // entered the state
workflow(task.state.phase).name // describe the state it occupies
workflow(task.state.phase + 1).code // what to save next in the history as it's advanced
*/

/*
export class Task {
  constructor(
    public _id?: string,
    public subject: string,
    public issue: string,
    public history: object,
    public owner: string
    //public messages: Message[]
  ){}
}
*/
