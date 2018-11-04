const models = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const teams = await models.team.findAll();
    res.send(teams);
  } catch (err) {
    res.send(500);
  }

  return next();
};

exports.get = async (req, res, next) => {
  try {
    const team = await models.team.findByPk(req.params.id);

    if (!team) {
      res.send(404);
      return next();
    }

    res.send(team);
  } catch (err) {
    console.error(err);
    res.send(500);
  }

  return next();
};

exports.create = async (req, res, next) => {
  if (!req.body.team) {
    res.send('Missing `team` information');
    return next();
  }

  try {
    const team = await models.team.create(req.body.team);

    // Add team leader as the new member in the team
    const member = {
      id: team.id,
      employeeId: team.leader
    }
  
    this.addMembers(member);

    res.send(team);
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
    res.send('Missing team data');
    return next();
  }

  try {
    const team = await models.team.findByPk(req.params.id);

    if (!team) {
      res.send(404);
      return next();
    }

    const updatedteam = await team.update(req.body.data);

    res.send(updatedteam);
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

// Add team members
exports.addMembers = async (member, req, res, next) => {
  try {
    const teamMember = await models.teamMember.create(member);
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
    await models.team.destroy({
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