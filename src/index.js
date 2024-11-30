const express = require('express');
const eventRoutes = require('./routes/eventRoutes.js');

const app = express();
const port = 3002;

app.use(express.json());
app.use('/api/v1/event', eventRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});