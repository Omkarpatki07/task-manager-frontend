function KanbanBoard({ tasks }) {
  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div style={boardStyle}>
      <Column title="To Do" tasks={columns.todo} />
      <Column title="In Progress" tasks={columns.inprogress} />
      <Column title="Done" tasks={columns.done} />
    </div>
  );
}

function Column({ title, tasks }) {
  return (
    <div style={columnStyle}>
      <h3 style={{ marginBottom: "15px" }}>{title}</h3>
      {tasks.map((task) => (
        <div key={task._id} style={cardStyle}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

const boardStyle = {
  display: "flex",
  gap: "20px",
};

const columnStyle = {
  flex: 1,
  background: "#ffffff",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  minHeight: "400px",
};

const cardStyle = {
  background: "#f9f9f9",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "12px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
};

export default KanbanBoard;
