import l from '../../common/logger';
import Pet from '../models/Pet';

class PetsService {
  async all(limit, offset, category) {
    l.info(
      `${this.constructor.name}.all(limit=${limit}, offset=${offset}, category=${category})`
    );
    const query = category ? { category } : {};

    try {
      const pets = await Pet.paginate(query, { limit, offset });
      return pets;
    } catch (error) {
      return error;
    }
  }

  async byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    try {
      const pet = await Pet.findOne({ _id: id });
      return pet;
    } catch (error) {
      return error;
    }
  }

  async create(body) {
    l.info(`${this.constructor.name}.create()`);
    try {
      const pet = new Pet(body);
      const result = await pet.save();
      return result;
    } catch (error) {
      return error;
    }
  }

  async update(id, body) {
    l.info(`${this.constructor.name}.update(${id})`);
    try {
      const pet = await Pet.findOneAndUpdate({ _id: id }, body, { new: true });
      if (pet) {
        return pet;
      } else {
        return { error: 'Pet not found.' };
      }
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    l.info(`${this.constructor.name}.delete(${id})`);
    try {
      const result = await Pet.deleteOne({ _id: id });
      return { result: !!result.n };
    } catch (error) {
      return error;
    }
  }

  async archive(id, status) {
    l.info(`${this.constructor.name}.archive(${id}, ${status})`);
    try {
      const update = status ? { archived: true } : { archived: false };
      const result = await Pet.updateOne({ _id: id }, update);
      return { result: !!result.nModified };
    } catch (error) {
      return error;
    }
  }
}

export default new PetsService();
