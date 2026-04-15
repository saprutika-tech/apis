require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedData = async () => {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    const users = [
        { name: 'John Doe', email: 'john@example.com', phone: '9876543210', qrCode: 'QR_USER_001', address: '123 Main St' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', qrCode: 'QR_USER_002', address: '456 Oak Ave' },
        { name: 'Bob Wilson', email: 'bob@example.com', phone: '9876543212', qrCode: 'QR_USER_003', address: '789 Pine Rd' }
    ];

    const created = await User.insertMany(users);
    console.log('Sample users seeded:');
    created.forEach(u => console.log(`  - ${u.name} (${u.qrCode}) | ID: ${u._id} | Phone: ${u.phone}`));

    await mongoose.connection.close();
    console.log('\nDone! Use the user IDs above for check-in/checkout testing.');
    process.exit(0);
};

seedData().catch(err => {
    console.error('Seed error:', err.message);
    process.exit(1);
});
