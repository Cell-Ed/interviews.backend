import l from '../../common/logger';
import Pet from '../models/Pet';

class PetsService {
    async all() {
        l.info(`${this.constructor.name}.all()`);
        try {
            const pets = await Pet.find()
            return pets;
        } catch (err) {
            return error;
        }
    }

    async byId(id) {
        l.info(`${this.constructor.name}.byId(${sub})`);
        try {
            const pet = await Pet.findOne({id: id});
            return pet;
        } catch (error) {
            return error;
        }
    }

    async create(body){
        l.info(`${this.constructor.name}.create()`);
        try {
            const pet = new Pet(body);
            const result = await pet.save();
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(sub, body) {
        l.info(`${this.constructor.name}.update(${sub})`);
        try {
          const pet = await Pet.findOneAndUpdate({ sub: sub }, body, { new: true });
          if (pet) {
            return pet;
          }else{
            return { "error": "Pet not found." }
          }
        } catch (err) {
          return err;
        }
    
      }
    
      async delete(sub) {
        l.info(`${this.constructor.name}.delete(${sub})`);
        try {
          const result = await Pet.deleteOne({ sub: sub })
          return { "result": !!result.n }
        } catch (err) {
          return err
        }
      }

}

export default new PetsService();