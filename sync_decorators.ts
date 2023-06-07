function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Я метод ${propertyKey} с аргументом ${args}`);

    const result = originalMethod.apply(this, args);
    console.log(`Я метод ${propertyKey} вернул ${result}`);

    return result;
  };

  return descriptor;
}

class Greet {
  @logMethod
  sayHi(name: string) {
    return `Hi, ${name}!`;
  }
}

const max = new Greet();
max.sayHi('Max');

// --------------------------------------------------------------
function validateAge(from: number, to: number) {
  return function (target: Object, propertyName: string) {
    let value = target[propertyName];

    const getter = function () {
      return value;
    };

    const setter = function (newValue: number) {
      if (newValue < from || newValue > to) {
        throw new Error('Возраст не подходит');
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter
    });
  };
}

class Age {
  @validateAge(18, 100)
  age!: number;
}

const max = new Age();

max.age = 25; // Валидный возраст
console.log(max.age);

max.age = 15; // Невалидный возраст - выбросит ошибку

// --------------------------------------------------------------
function validateParams() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      for (const num of args) {
        if (typeof num !== 'number') {
          throw new Error('Какое-то значение не число!');
        }
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class Calculator {
  @validateParams()
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(2, 3));
console.log(calc.add(2, '3'));

// --------------------------------------------------------------
function trackChanges(target: any) {
  const originalConstructor = target;

  const newConstructor: any = function (...args: any[]) {
    const instance = new originalConstructor(...args);

    const handler = {
      set: function (obj: any, prop: string, value: string | number) {
        console.log(`Параметр "${prop}" был изменен с ${obj[prop]} на ${value}`);
        obj[prop] = value;
        return true;
      }
    };

    return new Proxy(instance, handler);
  };

  newConstructor.prototype = originalConstructor.prototype;

  return newConstructor;
}

@trackChanges
class Aboba {
  constructor(public name: string, public age: number) {}
}

const person = new Aboba('Artem', 21);
person.name = 'Max';
person.age = 25;
