import Helper from './helpers/Helper';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default class ClassToggler {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);

    this.$el = options.$el;
    this.$openBtns = options.$openBtns;
    this.$closeBtns = options.$closeBtns;
    this.$toggleBtns = options.$toggleBtns;
    this.$additionalElements = options.$additionalElements;
    this.closeOnDocumentClick = options.closeOnDocumentClick;
    this.htmlClass = options.htmlClass;

    this.openCallback = options.openCallback;
    this.closeCallback = options.closeCallback;

    this._errors = options.errors;

    this._isOpen = false;
    this.scrollLock = options.scrollLock;

    if (!options.id && !options.noId) {
      this._setId();
    } else {
      this.id = options.id;
    }

    this.superInit();
  }

  superInit() {
    // Bind toggle btns
    if (this.$toggleBtns.length) {
      this.$toggleBtns.forEach(($btn) =>
        $btn.addEventListener('click', this.toggle.bind(this))
      );
    }

    // bind open btns
    if (this.$openBtns.length) {
      this.$openBtns.forEach(($btn) =>
        $btn.addEventListener('click', this.open.bind(this))
      );
    }

    // bind close btns
    if (this.$closeBtns.length) {
      this.$closeBtns.forEach(($btn) =>
        $btn.addEventListener('click', this.close.bind(this))
      );
    }

    // bind close by document click
    if (this.closeOnDocumentClick) {
      document.addEventListener('click', this._documentClickHandler.bind(this));
    }
  }

  open(e) {
    this.$el.classList.add(this.htmlClass);

    if (this.$additionalElements.length) {
      this.$additionalElements.forEach(($el) =>
        $el.classList.add(this.htmlClass)
      );
    }

    if (this.scrollLock) {
      disablePageScroll(this.$el);
    }

    // eslint-disable-next-line no-useless-call
    this.openCallback.call(
      this,
      // eslint-disable-next-line no-void
      e && e.currentTarget ? e.currentTarget : void 0
    );

    this._isOpen = true;
  }

  close(e) {
    this.$el.classList.remove(this.htmlClass);

    if (this.$additionalElements.length) {
      this.$additionalElements.forEach(($el) =>
        $el.classList.remove(this.htmlClass)
      );
    }

    if (this.scrollLock) {
      enablePageScroll(this.$el);
    }

    // eslint-disable-next-line no-useless-call
    this.closeCallback.call(
      this,
      // eslint-disable-next-line no-void
      e && e.currentTarget ? e.currentTarget : void 0
    );

    this._isOpen = false;
  }

  toggle(e) {
    if (!this._isOpen) {
      this.open(e);
    } else {
      this.close(e);
    }
  }

  _documentClickHandler(e) {
    // check, if e.target one of our btns (open, close or toggle);
    if (this._isTargetTriggerBtns(e)) return false;

    const isTargetChildOfEl = Helper.isDescendant(this.$el, e.target);

    if (this._isOpen && !isTargetChildOfEl) {
      this.close(e);
      e.preventDefault();
    }
  }

  _isTargetTriggerBtns(e) {
    // check, if e.target one of our btns (open, close or toggle);
    const allTriggersBtns = [
      ...this.$toggleBtns,
      ...this.$openBtns,
      ...this.$closeBtns,
    ];

    for (const $btn of allTriggersBtns) {
      if (Helper.isDescendant($btn, e.target)) {
        return true;
      }
    }
  }

  _setId() {
    const id = this.$el.getAttribute('id');
    if (!id) {
      this._throwError('set_id');
      return;
    }

    this.id = id;
  }

  _throwError(error, ...params) {
    let errorText = this._errors[error];

    // if (message.params) {
    //   message.params.map((param) => {
    //     msg = msg.replace('{}', param);
    //   });
    // }

    if (!errorText) errorText = `Unknow error "${error}"`;

    throw new Error(errorText);
  }
}

const errors = {
  set_id:
    'You need set id, use "id" on html element, or pass it in options (must bee a uniq string)',
};

const defaultOptions = {
  $el: undefined,
  $openBtns: [],
  $closeBtns: [],
  $toggleBtns: [],

  // Elements which class will be switched together with the $el,
  // for example overlay
  $additionalElements: [],
  closeOnDocumentClick: false,
  htmlClass: 'active',
  errors: errors,
  noId: false, // set true for single els (for example menu)
  scrollLock: false, // locking <body> scroll

  openCallback() {},

  closeCallback() {},
};
