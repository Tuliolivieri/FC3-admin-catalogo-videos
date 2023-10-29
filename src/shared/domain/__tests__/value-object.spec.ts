import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe('ValueObject Unit Tests', () => {
  describe('Simple String Value Object', () => {
    test('Should be equals', () => {
      const valueObject1 = new StringValueObject('test');
      const valueObject2 = new StringValueObject('test');
  
      expect(valueObject1.equals(valueObject2)).toBeTruthy();
    });
  
    test('Should not be equals', () => {
      const valueObject1 = new StringValueObject('test');
      const valueObject2 = new StringValueObject('not test');
  
      expect(valueObject1.equals(null as unknown as  ValueObject)).toBeFalsy();
      expect(valueObject1.equals(undefined as unknown as ValueObject)).toBeFalsy();
      expect(valueObject1.equals(valueObject2)).toBeFalsy();
    });
  });

  describe('Complex Value Object', () => {
    test('Should be equals', () => {
      const valueObject1 = new ComplexValueObject('test', 1);
      const valueObject2 = new ComplexValueObject('test', 1);
  
      expect(valueObject1.equals(valueObject2)).toBeTruthy();
    });

    test('Should not be equals', () => {
      const valueObject1 = new ComplexValueObject('test', 1);
      const valueObject2 = new ComplexValueObject('not test' , 1);
  
      expect(valueObject1.equals(null as unknown as  ValueObject)).toBeFalsy();
      expect(valueObject1.equals(undefined as unknown as ValueObject)).toBeFalsy();
      expect(valueObject1.equals(valueObject2)).toBeFalsy();
    });
  });

  
});