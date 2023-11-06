import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  let validateSpy: any;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate');
  });

  describe('Constructor', () => {
    test('Should create a category with default values', () => {
      const category = new Category({
        name: 'Movie Name',
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie Name');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    });
    
    test('Should create a category with all values', () => {
      const createdAt = new Date();

      const category = new Category({
        name: 'Movie Name',
        description: 'Movie Description',
        isActive: false,
        createdAt,
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie Name');
      expect(category.description).toBe('Movie Description');
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBe(createdAt);
    });

    test('Should create a category with name and description', () => {
      const category = new Category({
        name: 'Movie Name',
        description: 'Movie Description',
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie Name');
      expect(category.description).toBe('Movie Description');
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    })
  });

  describe('Create Command', () => {
    test('Should Create a Category with Name', () => {
      const category = Category.create({ name: 'Movie Name' });

      expect(category.categoryId).toBeUndefined;
      expect(category.name).toBe('Movie Name');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('Should Create a Category with Name and Description', () => {
      const category = Category.create({
        name: 'Movie Name',
        description: 'Movie Description',
      });

      expect(category.categoryId).toBeUndefined;
      expect(category.name).toBe('Movie Name');
      expect(category.description).toBe('Movie Description');
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
    test('Should Create a Category with Name, Description and isActive', () => {
      const category = Category.create({
        name: 'Movie Name',
        description: 'Movie Description',
        isActive: false,
      });

      expect(category.categoryId).toBeUndefined;
      expect(category.name).toBe('Movie Name');
      expect(category.description).toBe('Movie Description');
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Category Id field', () => {
    const arrange = [
      { categoryId: null}, { categoryId: undefined }, { categoryId: new Uuid() }
    ];

    test.each(arrange)('Id = %j', ({ categoryId }) => {
      const category = new Category({
        name: 'Movie Name',
        categoryId: categoryId as any,
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      
      if(categoryId instanceof Uuid) {
        expect(category.categoryId).toBe(categoryId);
      }
    });
  });

  test('Should change Name', () => {
    const category = Category.create({ name: 'Some Name' });

    category.changeName('Other Name');

    expect(category.name).toBe('Other Name');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('Should change Description', () => {
    const category = Category.create({
      name: 'Some Name',
      description: 'Some Description',
    });

    category.changeDescription('Other Description');

    expect(category.description).toBe('Other Description');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('Should update a Category', () => {
    const category = Category.create({ name: 'Some Name', description: 'Some Description' });

    category.update({
      name: 'Other Name',
      description: 'Other Description'
    });

    expect(category.name).toBe('Other Name');
    expect(category.description).toBe('Other Description');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  test('Should active a Category', () => {
    const category = new Category({
      name: 'Some Name',
      isActive: false,
    });

    category.activate();

    expect(category.isActive).toBeTruthy();
  });

  test('Should disable a Category', () => {
    const category = new Category({
      name: 'Some Name',
      isActive: true,
    });

    category.deactivate();

    expect(category.isActive).toBeFalsy();
  });
});

describe('Category Validator', () => {
  describe('Create Command', () => {
    test('Should an invalid category with name property', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: [
          'name should not be empty',
        ],
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => Category.create({ name: 't'.repeat(256) })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
        ],
      });
    });

    test('Should an invalid category with description property', () => {
      expect(() => Category.create({
        name: 'Movie Name',
        description: 5 as any,
      })).containsErrorMessages({
        description: ['description must be a string'],
      });
    });

    test('Should an invalid category with isActive property', () => {
      expect(() => Category.create({
        name: 'Movie Name',
        isActive: 5 as any,
      })).containsErrorMessages({
        isActive: ['isActive must be a boolean value'],
      });
    });
  });

  describe('changeName method', () => {
    it('Should a invalid category using name property', () => {
      const category = Category.create({ name: 'Movie' });
      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => category.changeName('')).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => category.changeName(5 as any)).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => category.changeName('t'.repeat(256))).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
    });
  });

  describe('changeDescription method', () => {
    it('Should a invalid category using description property', () => {
      const category = Category.create({ name: 'Movie' });
      expect(() => category.changeDescription(5 as any)).containsErrorMessages({
        description: ['description must be a string'],
      });
    });
  });
});
