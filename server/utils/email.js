import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmailNotification = async (task) => {
    const msg = {
        to: task.email,  // Recipient's email address
        from: 'your_email@example.com',  // Your email address
        subject: 'Task Status Update',
        text: `Your task "${task.title}" has been updated to: ${task.status}`,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
