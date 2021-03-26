import l from '../../common/logger';
import Pet from '../models/Pet';

class PetsService {
  /**
   * Fetch all pets from the database
   * @param {number} limit - maximum number of records to return
   * @param {number} offset - starting offset for pagination
   * @param {string} category - filter by type of pet
   */
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

  /**
   * Fetch a pet by id from the database
   * @param {string} id
   */
  async byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    try {
      const pet = await Pet.findOne({ _id: id });
      return pet;
    } catch (error) {
      return error;
    }
  }

  /**
   * Create a new pet in the database
   * @param {Object} body
   */
  async create(body) {
    l.info(`${this.constructor.name}.create()`);
    try {
      console.log(body);
      const pet = new Pet(body);
      const result = await pet.save();
      return result;
    } catch (error) {
      return error;
    }
  }

  /**
   * Update an existing pet in the database
   * @param {string} id
   * @param {Object} body
   */
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

  /**
   * Delete a pet from the database
   * @param {string} id
   */
  async delete(id) {
    l.info(`${this.constructor.name}.delete(${id})`);
    try {
      const result = await Pet.deleteOne({ _id: id });
      return { result: !!result.n };
    } catch (error) {
      return error;
    }
  }

  /**
   * Mark a pet as archived (hidden) in the database
   * @param {string} id
   */
  async archive(id) {
    l.info(`${this.constructor.name}.archive(${id})`);
    try {
      const result = await Pet.updateOne({ _id: id }, { archived: true });
      return { result: !!result.nModified };
    } catch (error) {
      return error;
    }
  }

  /**
   * Mark a pet as unarchived (visible) in the database
   * @param {string} id
   */
  async unarchive(id) {
    l.info(`${this.constructor.name}.unarchive(${id})`);
    try {
      const result = await Pet.updateOne({ _id: id }, { archived: false });
      return { result: !!result.nModified };
    } catch (error) {
      return error;
    }
  }
}

export default new PetsService();
