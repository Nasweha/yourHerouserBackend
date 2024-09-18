const sendGrievanceEmail = require('./services/sendEmail');

const testGrievance = {
    fullname: 'John Doe',
    emailId: 'johndoe@example.com',
    phone: '1234567890',
    date: '2024-09-16',
    address: '123 Test St',
    description: 'This is a test grievance.',
    status: 'Pending',
    userId: 'testuser123'
};

sendGrievanceEmail(testGrievance)
    .then(() => console.log('Test email sent'))
    .catch((error) => console.error('Error sending test email:', error));
