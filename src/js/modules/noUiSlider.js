import noUiSlider from 'nouislider';
import { debounce, prettify } from './helpers/Helper';
class NoUiSlider {
  static initAll() {
    const $rangeSliders = document.querySelectorAll('[data-rangeSlidersMB]');

    $rangeSliders.forEach(($rangeSlider) => {
      const start = +$rangeSlider.dataset.rangeslidersmbStart;
      const min = +$rangeSlider.dataset.rangeslidersmbMin;
      const max = +$rangeSlider.dataset.rangeslidersmbMax;
      const step = +$rangeSlider.dataset.rangeslidersmbStep;

      const $name = $rangeSlider.dataset.rangeslidersmb;

      const template = `
      <label class="range-slider__label">
        <p class="range-slider__name">${$name}</p>
        <input class="range-slider__input" type="text" />
        <div class="range-slider__slider" id="slider"></div>
      </label>
      `;

      $rangeSlider.innerHTML = template;

      const $slider = $rangeSlider.querySelector('.range-slider__slider');
      const $input = $rangeSlider.querySelector('.range-slider__input');

      noUiSlider.create($slider, {
        start: start || 0,
        connect: [true, false],
        step: step || 0,
        range: {
          min: min || 0,
          max: max,
        },
      });

      $input.addEventListener(
        'input',
        debounce(() => {
          $input.value = prettify($input.value.replace(/[^\d]/g, ''));
          $slider.noUiSlider.set($input.value.replace(' ', ''));
        }, 800)
      );

      $slider.noUiSlider.on('update', function(values, handle) {
        $input.value = prettify(Math.round(values[handle]));
      });
    });
  }
}

window.NoUiSlider = NoUiSlider;

window.addEventListener('DOMContentLoaded', () => NoUiSlider.initAll());
