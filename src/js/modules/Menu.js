import ClassToggler from './ClassToggler';
export default class Menu extends ClassToggler {
  constructor(options) {
    super(options);
    this.scrollLock = true;
  }
}

const menu = new Menu({
  $el: document.querySelector('.menu'),
  $additionalElements: document.querySelectorAll('.menu-overlay'),
  $closeBtns: document.querySelectorAll('.j_closeMenu'),
  $openBtns: document.querySelectorAll('.j_openMenu'),
  closeOnDocumentClick: true,
  noId: true,
});

export { menu };
