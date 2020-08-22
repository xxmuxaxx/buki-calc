function getScrollBarWidth() {
  var div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollWidth;
}

const scrollBarWidth = getScrollBarWidth();

export default class Helper {
  static isDescendant(parent, child) {
    if (parent === child) {
      return true;
    }
    let node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  static getSiblings(elem) {
    // Setup siblings array and get the first sibling
    const siblings = [];
    let sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }

    return siblings;
  }

  static createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach((key) => (element[key] = props[key]));

    if (children.length) {
      children.forEach((child) => {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }

        if (Array.isArray(child)) {
          child.forEach((childEl) => {
            element.appendChild(childEl);
          });
        } else {
          element.appendChild(child);
        }
      });
    }
    return element;
  }

  static isParentHasClass($el, className) {
    if ($el.classList.contains(className)) return true;

    let node = $el.parentNode;
    while (node != null) {
      if (node.classList) {
        if (node.classList.contains(className)) {
          return true;
        }
      }
      node = node.parentNode;
    }
    return false;
  }

  static bodyLockPosition() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    document.body.setAttribute('data-body-scroll-fix', scrollPosition);

    document.body.classList.add('fixed');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '-' + scrollPosition + 'px';
    document.body.style.left = '0';
  }

  static bodyUnlockPosition() {
    var scrollCSSPosition = document.body.style.top.replace(/[^0-9.]/g, '');

    document.body.removeAttribute('data-body-scroll-fix');
    document.body.classList.remove('fixed');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.left = '';

    window.scroll(0, scrollCSSPosition);
  }

  static getScrollBarWidth() {
    return scrollBarWidth;
  }

  // Проверяет, видел ли элемент полностью
  static isVisibleFull(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Проверяет, видно ли хотябы часть элемента
  static isVisiblePart(el, part) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    if (part === 'horizontal') {
      return horInView;
    }
    if (part === 'vertical') {
      return vertInView;
    }

    return vertInView && horInView;
  }

  /* eslint-disable no-useless-escape */
  static isMobileOrTablet() {
    let check = false;
    (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }
  /* eslint-enable no-useless-escape */

  static mapGetByValue(map, searchValue) {
    for (const [key, value] of map.entries()) {
      if (value === searchValue) return key;
    }
  }

  /**
   * data — данные. Массив объектов.
   * searchProperty — название свойства, которое мы ищем (как правило это id)
   * target — цель. Значение которое мы ищем
   * start — начало. Начальная позиция в массиве для текущей итерации бинарного поиска.
   * еnd — конец. Конечная позиция в массиве для текущей итерации бинарного поиска.
   */
  static binarySearch(
    data,
    target,
    searchProperty = 'id',
    start = 0,
    end = data.length - 1
  ) {
    if (end < 1) return data[0];
    const middle = Math.floor(start + (end - start) / 2);

    if (target === data[middle][searchProperty]) return data[middle];
    if (end - 1 === start)
      return Math.abs(data[start][searchProperty] - target) >
        Math.abs(data[end][searchProperty] - target)
        ? data[end]
        : data[start];
    if (target > data[middle][searchProperty])
      return Helper.binarySearch(data, target, searchProperty, middle, end);
    if (target < data[middle][searchProperty])
      return Helper.binarySearch(data, target, searchProperty, start, middle);
  }
}
