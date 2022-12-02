const tasks = {
  uncompleted: [
    {
      title: "Title",
      note: "Note",
      date: "2022-12-01",
      imgs: [],
      sync: false,
    },
    {
      title: "Task number 2",
      note: "Note number 2",
      date: "",
      imgs: [],
      sync: false,
    },
  ],
  completed: [],
};

export function renderer() {}

export function addTask(elem) {
  tasks.uncompleted.push(elem);
}
