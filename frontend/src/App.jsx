
import { useEffect, useMemo, useState } from "react";
import {
  Activity, CalendarDays, CheckCircle2, Circle, Clock3, LayoutDashboard,
  ListTodo, Plus, Sparkles, Target, Trash2, TrendingUp, Zap,
  Menu, X, Search, Brain, Flame
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid
} from "recharts";
import "./index.css";

const initialTasks = [
  { id: 1, title: "Complete project documentation", category: "Study", priority: "High", completed: false },
  { id: 2, title: "Practice Java programming", category: "Learning", priority: "Medium", completed: false },
  { id: 3, title: "Review daily goals", category: "Personal", priority: "Low", completed: true },
];

const weekData = [
  { day: "Mon", tasks: 3 }, { day: "Tue", tasks: 5 },
  { day: "Wed", tasks: 2 }, { day: "Thu", tasks: 6 },
  { day: "Fri", tasks: 4 }, { day: "Sat", tasks: 7 },
  { day: "Sun", tasks: 3 },
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("spandan-tasks")) || initialTasks;
    } catch {
      return initialTasks;
    }
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  useEffect(() => {
    localStorage.setItem("spandan-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;
  const rate = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchesFilter = filter === "All" ||
      (filter === "Completed" ? task.completed : !task.completed);
    return matchesFilter && task.title.toLowerCase().includes(search.toLowerCase());
  }), [tasks, filter, search]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks([{ id: Date.now(), title: title.trim(), category, priority, completed: false }, ...tasks]);
    setTitle("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const recommendation = pending
    ? `You have ${pending} pending task${pending === 1 ? "" : "s"}. Start with a ${tasks.find(t => !t.completed && t.priority === "High") ? "high-priority" : "small"} task and focus for 25 minutes without distractions.`
    : "Amazing work! All your tasks are complete. Take a break and plan your next productive day.";

  const navItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "My Tasks", icon: ListTodo },
    { name: "Schedule", icon: CalendarDays },
    { name: "Goals", icon: Target },
    { name: "AI Assistant", icon: Brain },
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Zap size={23} /></div>
          <div><h2>SPANDAN</h2><span>SMART PRODUCTIVITY</span></div>
          <button className="close-menu" onClick={() => setMobileOpen(false)}><X /></button>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <nav>
          {navItems.map(item => (
            <button key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => { setActivePage(item.name); setMobileOpen(false); }}>
              <item.icon size={19} /> {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="focus-card">
            <div className="focus-icon"><Flame size={19} /></div>
            <strong>Stay consistent!</strong>
            <p>Small steps every day lead to big results.</p>
          </div>
          <div className="profile">
            <div className="avatar">S</div>
            <div><strong>My Workspace</strong><span>Personal account</span></div>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)}><Menu /></button>
          <div><span className="welcome-small">YOUR PERSONAL PRODUCTIVITY SPACE</span><h1>{activePage}</h1></div>
          <div className="top-date"><CalendarDays size={17} /> {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
        </header>

        {activePage === "Overview" || activePage === "My Tasks" ? (
          <>
            <section className="hero">
              <div>
                <span className="hero-tag"><Sparkles size={14} /> YOUR DAY, YOUR PROGRESS</span>
                <h2>Make today <span>count.</span></h2>
                <p>Organize your time, focus on what matters, and achieve more every day.</p>
              </div>
              <div className="hero-art"><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><Zap size={54} /></div>
            </section>

            <section className="stats-grid">
              <div className="stat-card"><div className="stat-top"><span>Total Tasks</span><div className="stat-icon purple"><ListTodo /></div></div><h2>{tasks.length}</h2><p>All your activities</p></div>
              <div className="stat-card"><div className="stat-top"><span>Completed</span><div className="stat-icon green"><CheckCircle2 /></div></div><h2>{completed}</h2><p>Tasks finished</p></div>
              <div className="stat-card"><div className="stat-top"><span>Pending</span><div className="stat-icon orange"><Clock3 /></div></div><h2>{pending}</h2><p>Tasks to focus on</p></div>
              <div className="stat-card"><div className="stat-top"><span>Productivity</span><div className="stat-icon blue"><TrendingUp /></div></div><h2>{rate}%</h2><p>Completion rate</p></div>
            </section>

            <section className="content-grid">
              <div className="panel tasks-panel">
                <div className="panel-heading"><div><span className="eyebrow">STAY ORGANIZED</span><h3>{activePage === "My Tasks" ? "Task Manager" : "Today's Tasks"}</h3></div><span className="task-count">{pending} remaining</span></div>

                <form className="task-form" onSubmit={addTask}>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What do you need to accomplish?" aria-label="Task title" />
                  <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Category">
                    <option>Study</option><option>Work</option><option>Learning</option><option>Personal</option><option>Health</option>
                  </select>
                  <select value={priority} onChange={e => setPriority(e.target.value)} aria-label="Priority">
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                  <button className="add-button" type="submit"><Plus size={18} /> Add</button>
                </form>

                <div className="task-toolbar">
                  <div className="filters">
                    {["All", "Pending", "Completed"].map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? "filter-active" : ""}>{f}</button>)}
                  </div>
                  <div className="search-box"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks" /></div>
                </div>

                <div className="task-list">
                  {filteredTasks.length === 0 && <div className="empty-state"><ListTodo size={30} /><p>No tasks found. Add your first task above!</p></div>}
                  {filteredTasks.map(task => (
                    <div className={`task-row ${task.completed ? "task-done" : ""}`} key={task.id}>
                      <button className="check-button" onClick={() => toggleTask(task.id)} aria-label="Toggle task">
                        {task.completed ? <CheckCircle2 size={21} /> : <Circle size={21} />}
                      </button>
                      <div className="task-details"><strong>{task.title}</strong><span>{task.category}</span></div>
                      <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                      <button className="delete-button" onClick={() => deleteTask(task.id)} aria-label="Delete task"><Trash2 size={17} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="right-column">
                <div className="panel progress-panel">
                  <div className="panel-heading"><div><span className="eyebrow">YOUR PERFORMANCE</span><h3>Daily Progress</h3></div><Activity size={20} /></div>
                  <div className="progress-ring" style={{ "--progress": `${rate}%` }}><div><strong>{rate}%</strong><span>Completed</span></div></div>
                  <div className="progress-legend"><span><i className="dot-green"></i> Completed <b>{completed}</b></span><span><i className="dot-gray"></i> Pending <b>{pending}</b></span></div>
                </div>

                <div className="panel ai-panel">
                  <div className="ai-title"><div className="ai-symbol"><Sparkles size={18} /></div><div><span className="eyebrow">SMART INSIGHTS</span><h3>SPANDAN AI</h3></div></div>
                  <p>{recommendation}</p>
                  <div className="ai-foot"><span><span className="live-dot"></span> Productivity coach</span><Zap size={16} /></div>
                </div>
              </div>
            </section>

            <section className="panel chart-panel">
              <div className="panel-heading"><div><span className="eyebrow">CONSISTENCY MATTERS</span><h3>Weekly Activity</h3></div><span className="chart-caption">Illustrative weekly activity</span></div>
              <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={weekData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#292d3c" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9299ad", fontSize: 12 }} /><Tooltip contentStyle={{ background: "#1b1e2b", border: "1px solid #34384b", borderRadius: 10 }} /><Bar dataKey="tasks" fill="#9274ff" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
            </section>
          </>
        ) : (
          <section className="panel placeholder-panel">
            <div className="placeholder-icon"><Sparkles size={32} /></div>
            <h2>{activePage}</h2>
            <p>{activePage === "Schedule" ? "Plan your day by adding tasks and assigning priorities in My Tasks." : activePage === "Goals" ? "Turn your ambitions into achievable steps. Start by creating tasks linked to your goals." : "Your smart productivity coach analyses your task list and suggests the next best action."}</p>
            <button className="add-button" onClick={() => setActivePage("My Tasks")}>Go to My Tasks <Plus size={17} /></button>
          </section>
        )}

        <footer>© 2026 SPANDAN · AI-POWERED TIME MANAGEMENT · Make every moment count.</footer>
      </main>
    </div>
  );
}
