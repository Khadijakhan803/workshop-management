const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors()); 

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
