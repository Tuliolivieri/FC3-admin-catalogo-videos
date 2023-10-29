import { Category } from '../category.entity';

describe('Category Unit Tests', () => {
  describe('Constructor', () => {
    test('Should create a category with default values', () => {
      const category = new Category({
        name: 'Movie Name',
      });

      expect(category.categoryId).toBeUndefined();
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

      expect(category.categoryId).toBeUndefined();
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

      expect(category.categoryId).toBeUndefined();
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
    });
  });

  test('Should change Name', () => {
    const category = new Category({ name: 'Some Name' });

    category.changeName('Other Name');

    expect(category.name).toBe('Other Name');
  });

  test('Should change Description', () => {
    const category = new Category({
      name: 'Some Name',
      description: 'Some Description',
    });

    category.changeDescription('Other Description');

    expect(category.description).toBe('Other Description');
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
