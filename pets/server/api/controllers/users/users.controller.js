import UsersService from '../../services/users.service';

export class UsersController {
  /**
   * Fetch all existing users
   */
  all(req, res) {
    UsersService.all()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  /**
   * Fetch an existing user by id
   */
  byId(req, res) {
    UsersService.byId(req.params.id)
      .then((result) => {
        if (result) {
          res.json(result);
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  /**
   * Create a new user
   */
  create(req, res) {
    UsersService.create(req.body.name)
      .then((r) => {
        res.status(201).location(`/api/v1/pet/${r.id}`).json(r);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  /**
   * Update a user
   */
  update(req, res) {
    UsersService.update(req.params.id, req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  /**
   * Delete a user
   */
  delete(req, res) {
    UsersService.delete(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
}

export default new UsersController();
