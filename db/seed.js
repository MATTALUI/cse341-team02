const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../src/models/User');
const Organization = require('../src/models/Organization');
const Group = require('../src/models/Group');
const Message = require('../src/models/Message');

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/team02";


(async () => {
  console.log('\nRunning DB Seeds...');
  await mongoose.connect(MONGO_URL);
  console.log('Connection Made Successfully');

  ///////////////////////////////////////////////////////////////////////////////
  // Users                                                                     //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Users======================================================');
  await User.deleteMany();
  const hash = await bcrypt.hash('password', 6);
  const user = await User.create({
    firstName: 'Matt',
    lastName: 'Hummer',
    email: 'matt@example.com',
    passwordHash: hash,
  });
  console.log('Created User: ' + user.toString());
  console.log('======================================================================');

  ///////////////////////////////////////////////////////////////////////////////
  // Organizations                                                             //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Organizations==============================================');
  await Organization.deleteMany();
  const org = await Organization.create({
    name: 'Supercool 3rd Ward',
    admin: user,
    description: 'This is the best ward.',
  });
  console.log('Created Organization: ' + org.toString());
  console.log('======================================================================');

  ///////////////////////////////////////////////////////////////////////////////
  // Groups                                                                    //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Groups=====================================================');
  await Group.deleteMany();
  const group = await Group.create({
    name: 'Ward Activities',
    description: 'This is the group in charge of ward activities. It will announce upcoming activities and dates.',
    admins: [user],
    organization: org,
    private: false,
  });
  console.log('Created Group: ' + group.toString());
  console.log('======================================================================');

  ///////////////////////////////////////////////////////////////////////////////
  // Messages                                                                  //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Messages===================================================');
  await Message.deleteMany();
  const message = await Message.create({
    poster: user,
    group: group,
    body: 'Hey! It\'s ya boy! Meeting on Friday!',
  });
  console.log('Created Message: ' + message.toString());
  console.log('======================================================================');


  await mongoose.disconnect();
  console.log('\nThe deed is done.');
})();
