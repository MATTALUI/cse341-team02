const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../src/models/User');
const Organization = require('../src/models/Organization');
const OrganizationUser = require('../src/models/OrganizationUser');
const Group = require('../src/models/Group');
const Preference = require('../src/models/Preference');
const Message = require('../src/models/Message');

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/team02";
const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  console.log('\nRunning DB Seeds...');
  await mongoose.connect(MONGO_URL);
  console.log('Connection Made Successfully');

  ///////////////////////////////////////////////////////////////////////////////
  // Users                                                                     //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Users======================================================');
  await User.deleteMany();
  const hash = await bcrypt.hash(process.env.MAILER_PASSWORD, 6);
  const userEmail = {
    address: process.env.MAILER_EMAIL,
    valid: true,
  };
  const user = await User.create({
    firstName: 'Matt',
    lastName: 'Hummer',
    email: userEmail,
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
    name: 'Longwood',
    admin: user,
    description: 'The official organization for the Longwood Ward',
  });
  const org2 = await Organization.create({
    name: 'Palm Bay 2nd Ward',
    admin: user,
    description: 'Welcome to the Palm Bay 2nd ward. You know what they say: first is the worst and second is the best.',
  });
  const org3 = await Organization.create({
    name: 'La Rama Semoran',
    admin: user,
    description: 'Bienvenidos!',
  });
  console.log('Created Organization: ' + org.toString());
  console.log('Created Organization: ' + org2.toString());
  console.log('Created Organization: ' + org3.toString());
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
  console.log('Created OrganizationUser: ' + mainUser.toString());
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
    description: 'A place for the youngun\'s.',
    admins: [user],
    organization: org,
    private: false,
  });
  const group3 = await Group.create({
    name: 'Party Committee',
    description: 'We throw medium cool parties.',
    admins: [user],
    organization: org2,
    private: false,
  });
  const group4 = await Group.create({
    name: 'Bishop\'s Announcements',
    description: 'Hear directly from our benevolent leader himself.',
    admins: [user],
    organization: org2,
    private: false,
  });
  const group5 = await Group.create({
    name: 'Anuncios',
    admins: [user],
    organization: org3,
    private: false,
  });
  const group6 = await Group.create({
    name: 'Sociedad de Socorro',
    description: 'It\'s a secret to everybody.',
    admins: [user],
    organization: org3,
  });
  const group7 = await Group.create({
    name: 'Fiestas y Siestas',
    admins: [user],
    organization: org3,
    private: true,
  });
  console.log('Created Group: ' + group.toString());
  console.log('Created Group: ' + group2.toString());
  console.log('Created Group: ' + group3.toString());
  console.log('Created Group: ' + group4.toString());
  console.log('Created Group: ' + group5.toString());
  console.log('Created Group: ' + group6.toString());
  console.log('Created Group: ' + group7.toString());
  console.log('======================================================================');

  ///////////////////////////////////////////////////////////////////////////////
  // Preferences                                                               //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Preferences================================================');
  await Preference.deleteMany();
  // No default preferences, you can manage your own you bum.
  console.log('======================================================================');

  ///////////////////////////////////////////////////////////////////////////////
  // Messages                                                                  //
  ///////////////////////////////////////////////////////////////////////////////
  console.log('\n=Resetting Messages===================================================');
  await Message.deleteMany();
  const message = await Message.create({
    poster: user,
    group: group,
    body: 'Meeting on Friday!',
  });
  console.log('Created Message: ' + message.toString());

  const message2 = await Message.create({
    poster: user,
    group: group2,
    body: 'All youth are combined this week for class. Come prepared.',
  });
  console.log('Created Message: ' + message2.toString());

  const message7 = await Message.create({
    poster: user,
    group: group7,
    body: 'Tenemos una fiesta mañana!',
  });
  console.log('Created Message: ' + message7.toString());

  for (let i = 0; i < 25; i++) {
    const message = await Message.create({
      poster: user,
      group: group3,
      body: `There are only ${25 - i} day(s) left until the Party!`,
    });
    console.log('Created Message: ' + message.toString());
    await wait(500);
  };

  const message3 = await Message.create({
    poster: user,
    group: group3,
    body: 'Who is ready to party?',
  });
  console.log('Created Message: ' + message3.toString());
  console.log('======================================================================');


  await mongoose.disconnect();
  console.log('\nThe deed is done.');
})();
