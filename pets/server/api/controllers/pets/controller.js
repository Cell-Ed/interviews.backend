import PetService from '../../services/pets.service';

export class Controller {
  all(req, res) {
    PetsService.all().then((r) => res.json(r));
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
}
export default new Controller();
