import UsersService from '../../services/users.service';

export class UsersController {
  /**
   * Fetch all existing users
   */
  all(req, res) {
    UsersService.all().then((r) => res.json(r));
  }

  /**
   * Fetch an existing user by id
   */
  byId(req, res) {
    UsersService.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  /**
   * Create a new user
   */
  create(req, res) {
    UsersService.create(req.body.name).then((r) =>
      res.status(201).location(`/api/v1/pet/${r.id}`).json(r)
    );
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
        res.status(400).json(error);
      });
  }
}

export default new UsersController();
