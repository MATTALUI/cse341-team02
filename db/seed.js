const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../src/models/User');
const Organization = require('../src/models/Organization');
const OrganizationUser = require('../src/models/OrganizationUser');
const Group = require('../src/models/Group');
const Preference = require('../src/models/Preference');
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
  const userEmail = {
    address: 'matt@example.com',
    valid: true,
  };
  const userNumbers = [
    { number: '+19705551234', },
    { number: '+19705555678', valid: true },
  ];
  const extraEmails = [
    { address: 'matt2@example.com', },
    { address: 'matt3@example.com', valid: true },
  ];
  const user = await User.create({
    firstName: 'Matt',
    lastName: 'Hummer',
    email: userEmail,
    phoneNumbers: userNumbers,
    passwordHash: hash,
    extraEmails,
  });
  const bruceUser = await User.create({
    firstName: 'Bruce',
    lastName: 'Wayne',
    email: {
      address: 'notbatman@example.com',
      valid: false,
    },
    phoneNumbers: [],
    passwordHash: hash,
  });
  const junkUser = await User.create({
    firstName: 'Edward',
    lastName: 'Nigma',
    email: {
      address: 'riddler@example.com',
      valid: false,
    },
    phoneNumbers: [],
    passwordHash: hash,
  });
  console.log('Created User: ' + user.toString());
  console.log('Created User: ' + bruceUser.toString());
  console.log('Created User: ' + junkUser.toString());
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
  // Organization Users                                                        //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Organization Users=========================================');
  await OrganizationUser.deleteMany();
  const mainUser = await OrganizationUser.create({
    user: user,
    organization: org,
  });
  const orgUser = await OrganizationUser.create({
    user: bruceUser,
    organization: org,
  });
  console.log('Created OrganizationUser: ' + mainUser.toString());
  console.log('Created OrganizationUser: ' + orgUser.toString());
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
  const group2 = await Group.create({
    name: 'Ward Youth',
    description: 'A place for the younguns.',
    admins: [user, bruceUser],
    organization: org,
    private: false,
  });
  const privateGroup = await Group.create({
    name: 'Secret Society of Relief',
    description: 'It\'s a secret to everybody.',
    admins: [user],
    organization: org,
    private: true,
  });
  console.log('Created Group: ' + group.toString());
  console.log('Created Group: ' + group2.toString());
  console.log('Created Group: ' + privateGroup.toString());
  console.log('======================================================================');

  ///////////////////////////////////////////////////////////////////////////////
  // Preferences                                                               //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Preferences================================================');
  await Preference.deleteMany();
  const preference = await Preference.create({
    user,
    group,
    emails: [userEmail].concat(extraEmails),
    phoneNumbers: userNumbers,
  });
  console.log('Created Group: ' + preference.toString());
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
  const message2 = await Message.create({
    poster: user,
    group: group,
    body: 'Bring cheesepuffs to the party.',
  });
  const message3 = await Message.create({
    poster: user,
    group: group2,
    body: 'Hello, fellow youths.',
  });
  await Promise.all(new Array(25).fill().map(async (_, index) => {
    const message = await Message.create({
      poster: user,
      group: group,
      body: `This is message ${index + 1}`,
    });
    console.log('Created Message: ' + message.toString());
  }));
  console.log('Created Message: ' + message.toString());
  console.log('Created Message: ' + message2.toString());
  console.log('Created Message: ' + message3.toString());
  console.log('======================================================================');


  await mongoose.disconnect();
  console.log('\nThe deed is done.');
})();
