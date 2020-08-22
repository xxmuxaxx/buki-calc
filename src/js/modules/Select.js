import Dropdown from './Dropdown';

const _instances = [];

export default class Select {
  constructor($wrapper) {
    this.$wrapper = $wrapper;

    this.isSelect = this.$wrapper.hasAttribute('data-dropdown-select');

    this.$select = this.$wrapper.querySelector('[data-dropdown-select-node]');
    this.$namingTitle = this.$wrapper.querySelector('[data-naming]');
    this.namingTitleDefault = this.$namingTitle.getAttribute('data-naming');
    this.$namingTriggers = this.$wrapper.querySelectorAll(
      '[data-naming-triggers] input'
    );
    this.namingTypeTrigger = '';

    this.init();
  }

  init() {
    this.$namingTriggers.forEach(($trigger) => {
      this.namingTypeTrigger = $trigger.getAttribute('type');
      $trigger.addEventListener('click', () => this.changeNaming());
    });
  }

  changeNaming() {
    const $checkedTriggers = this.$wrapper.querySelectorAll('input:checked');

    if (!$checkedTriggers.length) {
      this.$namingTitle.textContent = this.namingTitleDefault;
      this.$namingTitle.value = this.namingTitleDefault;
    } else {
      const checkedTriggers = Array.from($checkedTriggers).map(
        ($checkedTrigger) =>
          $checkedTrigger
            .closest(`.${this.namingTypeTrigger}`)
            .querySelector(`.${this.namingTypeTrigger}__text`).textContent
      );

      const title = checkedTriggers
        .join(', ')
        .replace(/ +/g, ' ')
        .trim();

      const id = $checkedTriggers[0].value;

      this.$namingTitle.textContent = title;
      this.$namingTitle.value = title;

      if (this.$select) this.$select.value = id;

      if (this.isSelect) {
        Dropdown.close(this.$wrapper.getAttribute('id'));
      }
    }
  }

  reset() {
    const $checkedTriggers = this.$wrapper.querySelectorAll('input:checked');

    if ($checkedTriggers.length) {
      $checkedTriggers.forEach(
        ($checkedTrigger) => ($checkedTrigger.checked = false)
      );
    }

    this.$namingTitle.textContent = this.namingTitleDefault;
    this.$namingTitle.value = this.namingTitleDefault;
  }

  static resetAll() {
    _instances.forEach((_instance) => _instance.reset());
  }

  static initAll() {
    const $selectes = document.querySelectorAll('.j_naming');

    $selectes.forEach(($select) => _instances.push(new Select($select)));
  }
}

Select.initAll();

window.Select = Select;
