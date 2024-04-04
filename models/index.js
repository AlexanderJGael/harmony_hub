const User = require('./User');
const Messages = require('./message');

User.associate(Messages);
Messages.associate(User);

module.exports = { User, Messages };