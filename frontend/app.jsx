import * as React from 'react'
import * as ReactDOM from 'react-dom'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: null };
    }

    async componentDidMount() {
        await query('tasks')
            .orderBy('createdAt')
            .fetchAndRefresh(tasks => this.setState({ tasks }))
    }

    render() {
        const { tasks } = this.state;
        
        if (tasks === null) {
            return 'Loading tasks';
        }

        return <div>
            <AppNavbar/>
            {tasks.map(task => <TaskItem task={task} key={task.id}/>)}

            <NewTodo/>
        </div>
    }
}

class NewTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return <form onSubmit={this.handleSubmit} disabled={this.state.loading}>
            <div className="form-group d-flex flex-row">
                <input
                    type="text"
                    className="form-control"
                    placeholder="New todo"
                    value={this.state.title}
                    onChange={event => this.setState({ title: event.target.value })}
                    disabled={this.state.loading}
                />

                <button type="submit" className="btn btn-primary" disabled={this.state.loading}>Save</button>
            </div>
        </form>
    }

    async handleSubmit(event) {
        const form = event.target;

        event.preventDefault();

        this.setState({ loading: true });
        await createRecord('tasks', { title: this.state.title, userId: await getCurrentUserId() });

        this.setState({ loading: false, title: '' });
    }
}


function TaskItem({ task }) {
    const taskIdAttr = "task-" + task.id;

    return <div className="form-group form-check">
        <input
            id={taskIdAttr}
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => updateRecordById('tasks', task.id, { isCompleted: !task.isCompleted })}
            className="mr-2"
        />
        <label className="form-check-label" htmlFor={taskIdAttr}>{task.title}</label>

        <button className="btn btn-link text-danger" onClick={() => deleteRecordById('tasks', task.id) }>Delete</button>
    </div>
}

class AppNavbar extends React.Component {
    constructor() {
        super()
        this.state = { user: null }
    }
    async componentDidMount() {
        this.setState({ user: await getCurrentUser() });
    }
    render() {
        const { user } = this.state;
        return <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user?.email}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#" onClick={() => logout()}>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
    }
}

ReactDOM.render(<TodoList/>, document.getElementById('todo-manager'));