import ImagesService from '../../services/images.service';

export class ImagesController {
  upload(req, res) {
    ImagesService.upload(req.body.imageData, req.body.businessId).then((r) =>
      res.json(r)
    );
  }
}
export default new ImagesController();
