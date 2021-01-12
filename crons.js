const CronJob = require('cron').CronJob;
const { getTasksByStatus, getUserById, prepareEmailMessage } = require('./helper');
const { sendMail } = require('./notifier');
var DateDiff = require('date-diff');
var dateFormat = require('dateformat');
// Every 1 min => 0 */1 * * * *
// Every day midnight => 0 0 0 * * *
// Evry 1 min monday to friday => 0 */1 * * * 1-5
// Evry 5 second monday to friday => */5 * * * * 1-5
const job = new CronJob('0 */1 * * * 1-5', function () {
    const d = new Date();
    const pendingTasks = getTasksByStatus('pending');
    pendingTasks.forEach(task => {
        const assignee = getUserById(task.assigneeId);
        const ccEmails = createCCEmails(assignee, task.dateCreated);
        const message = prepareEmailMessage(assignee.email, ccEmails);
        sendMail(message);
    });
});
job.start();

const createCCEmails = (user, dateCreated) => {
    const supervisor = getUserById(user.supervisor);
    const mails = [supervisor.email];
    const today = new Date(dateFormat(new Date(), "yyyy-mm-dd"));
    const createdDate = new Date(dateFormat(new Date(dateCreated), "yyyy-mm-dd"));
    var diff = new DateDiff(today, createdDate);
    let days = diff.days();
    while (true) {
        const remainder = days - 5;
        days = remainder;
        if (remainder > 0) {
            if (user.supervisor) {
                const nextLevelSupervisor = getUserById(user.supervisor);
                mails.push(user.email);
                user = nextLevelSupervisor;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    return mails;
}