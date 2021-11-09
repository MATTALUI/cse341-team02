// NOTE: This file is used to help initialize permissions for Mongo when running
// with docker-compose; you can ignore all of this if you're not using it.
db.createUser({
  user: "user",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "team02-project"
    }
  ]
});
