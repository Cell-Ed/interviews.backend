import PetsService from '../../services/pets.service';

export class PetsController {
  all(req, res) {
    const { limit, offset, category } = req.query;
    const _offset = offset ? +offset : 0;
    const _limit = limit ? +limit : 10;
    PetsService.all(_limit, _offset, category).then((r) => res.json(r));
  }

  byId(req, res) {
    PetsService.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req, res) {
    PetsService.create(req.body.name).then((r) =>
      res.status(201).location(`/api/v1/pet/${r.id}`).json(r)
    );
  }

  delete(req, res) {
    PetsService.delete(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  }

  archive(req, res) {
    PetsService.archive(req.params.id, req.body.status)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  }
}
export default new PetsController();
