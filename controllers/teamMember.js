const models = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const teamMembers = await models.teamMember.findAll();
    res.send(teamMembers);
  } catch (err) {
    res.send(500);
  }

  return next();
};

exports.get = async (req, res, next) => {
  try {
    const teamMember = await models.teamMember.findByPk(req.params.id);

    if (!teamMember) {
      res.send(404);
      return next();
    }

    res.send(teamMember);
  } catch (err) {
    console.error(err);
    res.send(500);
  }

  return next();
};

exports.create = async (req, res, next) => {
  if (!req.body.teamMember) {
    res.send('Missing `teamMember` information');
    return next();
  }

  try {
    const teamMember = await models.teamMember.create(req.body.teamMember);    
    res.send(teamMember);
    
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res.send(400, err.toString());
    } else {
      console.error(err);
      res.send(500);
    }
  }
  
  return next();
};

exports.update = async (req, res, next) => {
  if (!req.body.data) {
    res.send('Missing teamMember data');
    return next();
  }

  try {
    const teamMember = await models.teamMember.findByPk(req.params.id);

    if (!teamMember) {
      res.send(404);
      return next();
    }

    const updatedteamMember = await teamMember.update(req.body.data);

    res.send(updatedteamMember);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res.send(400, err.toString());
    } else {
      console.error(err);
      res.send(500);
    }
  }
  
  return next();
};

// Add teamMember members
exports.addMembers = async (req, res, next) => {
  if (!req.body.teamMemberMember) {
    res.send('Missing `teamMember member` information');
    return next();
  }

  try {
    const teamMemberMember = await models.teamMemberMember.create(req.body.teamMemberMember);
    res.send(teamMemberMember);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res.send(400, err.toString());
    } else {
      console.error(err);
      res.send(500);
    }
  }
  
  return next();
};

exports.remove = async (req, res, next) => {
  try {
    await models.teamMember.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send();
  } catch (err) {
    console.error(err);
    res.send(500);
  }

  return next();
};