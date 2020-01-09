import RangePicker from './index.js';

describe("RangePicker", () => {
  let rangePicker;

  beforeEach(() => {

    rangePicker = new RangePicker({
      from: new Date(2019, 9, 2),
      to:   new Date(2019, 10, 5)
    });

    document.body.append(rangePicker.elem);
  });

  afterEach(() => {
    rangePicker.destroy();
  });

  it("Initially shows only input", () => {
    expect(document.querySelector('.rangepicker__input')).toBeInstanceOf(HTMLElement);
    expect(document.querySelector('.rangepicker__selector').innerHTML).toEqual("");
  });

  it("Opens on click", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__selector').firstElementChild.offsetHeight).not.toEqual(0);
  });

  it("Closes on second click", function() {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__selector').firstElementChild.offsetHeight).toEqual(0);
  });

  it("Shows selected dates from-to in input", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__input').textContent).toMatch(/02.10.2019/);
    expect(document.querySelector('.rangepicker__input').textContent).toMatch(/05.11.2019/);
  });


  // ...
});
