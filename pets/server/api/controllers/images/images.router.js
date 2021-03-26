import * as express from 'express';
import imagesController from './images.controller';

export default express.Router().post('/', imagesController.upload);
