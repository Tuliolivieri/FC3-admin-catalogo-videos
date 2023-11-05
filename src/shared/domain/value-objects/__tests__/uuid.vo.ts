import { InvalidUuidError, Uuid } from '../uuid.vo';
import { validate as uuidValidate } from 'uuid';

describe('Uuid Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  test('Should throw error when uuid is invalid', () => {
    const invalidUuid = 'a-invalid-uuid';

    expect(() => {
      new Uuid(invalidUuid);
    }).toThrowError(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('Should create a valid uuid', () => {
    const uuid = new Uuid();

    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test('Should accept a valid uuid', () => {
    const uuid = new Uuid('ef62c677-6499-4477-9848-d8c580a4d262');

    expect(uuid.id).toBe('ef62c677-6499-4477-9848-d8c580a4d262');
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
