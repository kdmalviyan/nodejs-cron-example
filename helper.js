const tasks = [
    {
        id: 1,
        dateCreated: '2021-01-10',
        status: 'pending',
        assigneeId: 1
    },
    {
        id: 2,
        dateCreated: '2020-12-25',
        status: 'pending',
        assigneeId: 2
    }, {
        id: 3,
        dateCreated: '2021-01-12',
        status: 'pending',
        assigneeId: 1
    }, {
        id: 4,
        dateCreated: '2021-01-1',
        status: 'done',
        assigneeId: 1
    }
];

const users = [{
    id: 1,
    name: 'Kuldeep Singh',
    email: 'kdmalviyan@gmail.com',
    supervisor: 2
},
{
    id: 2,
    name: 'Kuldeep Singh',
    email: 'kdmalviyan.1987@gmail.com',
    supervisor: 3
}, {
    id: 3,
    name: 'Kanishka Singh',
    email: 'kanishikad@gmail.com',
}
]

const getTasksByStatus = (status) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    return filteredTasks;
};

const getUserById = (id) => {
    const user = users.find(user => user.id === id);
    return user;
};

const prepareEmailMessage = (toMailId, ccMailIds) => {
    let message = {
        from: 'kdmalviyan@gmail.com',
        to: toMailId,
        cc: ccMailIds,
        subject: 'Notification: Task Pending',
        text: 'One of your task is pending, please take an appropriate action.'
    };
    return message;
}

module.exports = { getTasksByStatus, getUserById, prepareEmailMessage };