const LazyModels = {};

const buildLazyLoader = modelName => () => {
  if (!LazyModels[modelName]) {
    console.log(`Initializing model: ${modelName}`);
    LazyModels[modelName] = require(`./${modelName}`);
  }

  return LazyModels[modelName];
};

module.exports = {
  LazyUser: buildLazyLoader('User'),
  LazyOrganization: buildLazyLoader('Organization'),
  LazyOrganizationUser: buildLazyLoader('OrganizationUser'),
  LazyGroup: buildLazyLoader('Group'),
  LazyMessage: buildLazyLoader('Message'),
  LazyPreference: buildLazyLoader('Preference'),
};
