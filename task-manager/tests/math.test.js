const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

it("Should calculate total with tip", () => {
  const total = calculateTip(100, 0.3);

  expect(total).toBe(130);
});

it("should calculate total with default tip", () => {
  const total = calculateTip(100);
  expect(total).toBe(125);
});

it("should convert 32 F to 0 C", () => {
  expect(fahrenheitToCelsius(32)).toBe(0);
});

it("should convert 0 C to 32 F", () => {
  expect(celsiusToFahrenheit(0)).toBe(32);
});

// it("should Async demo", (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

it("should add two numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

it("should add two number async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
