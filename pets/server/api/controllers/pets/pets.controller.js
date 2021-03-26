import PetsService from '../../services/pets.service';

export class PetsController {
  /**
   * Fetch all existing pets
   */
  all(req, res) {
    const { limit, offset, category } = req.query;
    const _offset = offset ? +offset : 0;
    const _limit = limit ? +limit : 10;
    PetsService.all(_limit, _offset, category)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  /**
   * Fetch an existing pet by id
   */
  byId(req, res) {
    PetsService.byId(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  /**
   * Create a new pet
   */
  create(req, res) {
    PetsService.create(req.body)
      .then((result) =>
        res.status(201).location(`/api/v1/pet/${result.id}`).json(result)
      )
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  /**
   * Update a pet
   */
  update(req, res) {
    PetsService.update(req.params.id, req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
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
        res.status(500).json(error);
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
        res.status(500).json(error);
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
        res.status(500).json(error);
      });
  }
}

export default new PetsController();
