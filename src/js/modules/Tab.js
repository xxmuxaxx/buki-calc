const _instances = {};

export default class TabsController {
  constructor(options) {
    this.id = options.id;
    this.$triggersWrap = options.$triggersWrap;
    this.$elsWrap = options.$elsWrap;
    this.$triggers = options.$triggers;
    this.$els = options.$els;

    this.init();
  }

  init() {
    _instances[this.id] = this;

    this.$triggers.forEach(($trigger) => {
      $trigger.addEventListener('click', () => this.open($trigger));
    });

    this.open(this.$triggers[0]);
  }

  open($trigger) {
    const id = $trigger.getAttribute('data-tab');

    this.$triggers.forEach(($trigger) => {
      $trigger.classList.remove('active');
    });

    $trigger.classList.add('active');

    this.$els.forEach(($el) => {
      const isCurrent = $el.getAttribute('data-tab-content') === id;

      if (isCurrent) {
        $el.classList.add('active');
      } else {
        $el.classList.remove('active');
      }
    });
  }

  close() {}

  static open(instanceId, $trigger) {
    _instances[instanceId].open($trigger);
  }

  static initAll() {
    const $triggersWraps = document.querySelectorAll('[data-tabs]');

    $triggersWraps.forEach(($triggersWrap) => {
      const id = $triggersWrap.getAttribute('data-tabs');
      const $triggers = $triggersWrap.querySelectorAll('[data-tab]');
      const $elsWrap = document.querySelector(`[data-tabs-contents="${id}"]`);
      if (!$elsWrap) return false;
      const $els = $elsWrap.querySelectorAll('[data-tab-content]');

      // eslint-disable-next-line no-new
      new TabsController({
        id: id,
        $triggersWrap,
        $elsWrap,
        $triggers: [...$triggers],
        $els: [...$els],
      });
    });
  }
}

TabsController.initAll();

window.TabsController = TabsController;
