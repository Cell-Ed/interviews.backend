import PetsService from '../../services/pets.service';

export class PetsController {
  /**
   * Fetch all existing pets
   */
  all(req, res) {
    const { limit, offset, category } = req.query;
    const _offset = offset ? +offset : 0;
    const _limit = limit ? +limit : 10;
    PetsService.all(_limit, _offset, category).then((r) => res.json(r));
  }

  /**
   * Fetch an existing pet by id
   */
  byId(req, res) {
    PetsService.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  /**
   * Create a new pet
   */
  create(req, res) {
    PetsService.create(req.body).then((r) =>
      res.status(201).location(`/api/v1/pet/${r.id}`).json(r)
    );
  }

  /**
   * Delete a pet
   */
  delete(req, res) {
    PetsService.delete(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  }

  /**
   * Mark a pet as archived (hidden)
   */
  archive(req, res) {
    PetsService.archive(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  }

  /**
   * Mark a pet as unarchived (visible)
   */
  unarchive(req, res) {
    PetsService.unarchive(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  }
}

export default new PetsController();
