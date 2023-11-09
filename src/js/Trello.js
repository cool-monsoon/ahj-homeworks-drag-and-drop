import CardWidget from './CardWidget';
import CreateCard from './CreateCard';

export default class Trello {
  constructor() {
    this.recovery();
    this.clickEvents();
    this.dragEvents();
  }

  clickEvents() {
    const taskBoard = document.querySelector('.task-board');
    taskBoard.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-card-button')) {
        if (document.querySelector('.card-widget')) {
          this.closeOldWidget();
        }
        const targetColumn = event.target.closest('.column');
        const classList = targetColumn.className.split(' ');
        CardWidget.createCardWidget(classList[0]);
      } else if (event.target.classList.contains('card-widget-close')) {
        this.closeWidget();
      } else if (event.target.classList.contains('add-button')) {
        const targetColumn = event.target.closest('.column');
        const classList = targetColumn.className.split(' ');
        const content = document.querySelector('.card-text').value;
        CreateCard.createCard(classList[0], content);
        this.closeWidget();
        this.saveData();
      } else if (event.target.classList.contains('card-close')) {
        const targetCard = event.target.closest('.card-window');
        targetCard.remove();
        this.saveData();
      }
    });
  }

  dragEvents() {
    let dragged = null;
    let ghosted = null;
    let securePlace = null;
    const board = document.querySelector('.task-board');
    board.addEventListener('mousedown', (event) => {
      if (!event.target.classList.contains('card-window')) {
        return;
      }
      event.target.ondragstart = function () {
        return false;
      };

      this.removePointerEvents();

      dragged = event.target;
      ghosted = event.target.cloneNode(true);
      securePlace = event.target.cloneNode(true);
      securePlace.style.opacity = '0';

      const shiftX = event.clientX - dragged.getBoundingClientRect().left
       + board.getBoundingClientRect().left;
      const shiftY = event.clientY - dragged.getBoundingClientRect().top
       + board.getBoundingClientRect().top;

      ghosted.classList.add('dragged');
      ghosted.style.pointerEvents = 'none';
      ghosted.style.position = 'absolute';
      ghosted.style.zIndex = '9';
      ghosted.style.cursor = 'grabbing';
      ghosted.classList.add('size-fixed');

      const fixHeight = `${dragged.offsetHeight}px`;
      const fixWidth = `${dragged.offsetWidth}px`;
      ghosted.style.setProperty('--element-height', fixHeight);
      ghosted.style.setProperty('--element-width', fixWidth);

      dragged.classList.add('invisible');
      document.body.appendChild(ghosted);

      ghosted.style.left = `${event.pageX - shiftX}px`;
      ghosted.style.top = `${event.pageY - shiftY}px`;

      board.addEventListener('mouseleave', () => {
        if (!dragged) {
          return;
        }
        dragged.classList.remove('invisible');
        document.body.removeChild(ghosted);
        ghosted = null;
        dragged = null;
      });
    });

    board.addEventListener('mouseup', (event) => {
      if (!dragged) {
        return;
      }
      const closest = document.elementFromPoint(event.clientX, event.clientY);

      let needToBeHidden;
      const parentOfTheClosest = closest.closest('.dropable');
      if (closest.classList.contains('moveable')) {
        const closestTop = closest.getBoundingClientRect().top;
        const ghostedTop = ghosted.getBoundingClientRect().top;
        if (closestTop >= ghostedTop) {
          parentOfTheClosest.insertBefore(dragged, closest);
        } else {
          closest.after(dragged);
        }
        needToBeHidden = closest.querySelector('.card-close');
        needToBeHidden.style.display = 'none';
      } else if (!closest.classList.contains('moveable')) {
        if (closest.tagName === 'HEADER') {
          closest.after(dragged);
        } else if (closest.tagName === 'FOOTER') {
          parentOfTheClosest.insertBefore(dragged, parentOfTheClosest.lastChild);
        } else if (closest.tagName === 'SECTION') {
          closest.firstChild.after(dragged);
        }
      } else {
        return;
      }
      if (securePlace) {
        securePlace.remove();
      }
      this.restorePointerEvents();
      dragged.classList.remove('invisible');
      document.body.removeChild(ghosted);
      ghosted = null;
      dragged = null;
      this.saveData();
    });
  }

  saveData() {
    localStorage.removeItem('check-list data');

    const toDoColumn = document.querySelector('.to-do');
    const inProgressColumn = document.querySelector('.in-progress');
    const doneColumn = document.querySelector('.done');

    const toDoItems = toDoColumn.querySelectorAll('.card-window');
    let toDoItemsArr = null;
    if (toDoItems) {
      toDoItemsArr = [...toDoItems];
    }

    const inProgressItems = inProgressColumn.querySelectorAll('.card-window');
    let inProgressItemsArr = null;
    if (inProgressItems) {
      inProgressItemsArr = [...inProgressItems];
    }

    const doneItems = doneColumn.querySelectorAll('.card-window');
    let doneItemsArr = null;
    if (doneItems) {
      doneItemsArr = [...doneItems];
    }

    const toDoData = {};

    if (toDoItemsArr) {
      toDoItemsArr.forEach((item, index) => {
        toDoData[index] = item.innerText;
      });
    }

    const inProgressData = {};

    if (inProgressItemsArr) {
      inProgressItemsArr.forEach((item, index) => {
        inProgressData[index] = item.innerText;
      });
    }

    const doneData = {};

    if (doneItemsArr) {
      doneItemsArr.forEach((item, index) => {
        doneData[index] = item.innerText;
      });
    }

    const saveData = {
      'to-do': toDoData,
      'in-progress': inProgressData,
      done: doneData,
    };

    localStorage.setItem('check-list data', JSON.stringify(saveData));
  }

  recovery() {
    if (localStorage.getItem('check-list data')) {
      const loadData = JSON.parse(localStorage.getItem('check-list data'));

      if (Object.keys(loadData['to-do']).length !== 0) {
        for (const key in loadData['to-do']) {
          CreateCard.createCard('to-do', loadData['to-do'][key]);
        }
      }

      if (Object.keys(loadData['in-progress']).length !== 0) {
        for (const key in loadData['in-progress']) {
          CreateCard.createCard('in-progress', loadData['in-progress'][key]);
        }
      }

      if (Object.keys(loadData.done).length !== 0) {
        for (const key in loadData.done) {
          CreateCard.createCard('done', loadData.done[key]);
        }
      }
    }
  }

  closeWidget() {
    const widget = document.querySelector('.card-widget');
    const targetColumn = widget.closest('.column');
    targetColumn.querySelector('footer').style.display = 'block';
    widget.remove();
  }

  removePointerEvents() {
    const columnHeaderParagraphs = [...document.querySelectorAll('.column header p')];
    columnHeaderParagraphs.forEach((item) => {
      item.style.pointerEvents = 'none';
    });

    const columnHeaderDivs = [...document.querySelectorAll('.column header div')];
    columnHeaderDivs.forEach((item) => {
      item.style.pointerEvents = 'none';
    });

    const columnFooterParagraphs = [...document.querySelectorAll('.column footer p')];
    columnFooterParagraphs.forEach((item) => {
      item.style.pointerEvents = 'none';
    });

    const cardCloses = [...document.querySelectorAll('.card-close')];
    cardCloses.forEach((item) => {
      item.style.pointerEvents = 'none';
    });
  }

  restorePointerEvents() {
    const columnHeaderParagraphs = [...document.querySelectorAll('.column header p')];
    columnHeaderParagraphs.forEach((item) => {
      item.style.pointerEvents = 'auto';
    });

    const columnHeaderDivs = [...document.querySelectorAll('.column header div')];
    columnHeaderDivs.forEach((item) => {
      item.style.pointerEvents = 'auto';
    });

    const columnFooterParagraphs = [...document.querySelectorAll('.column footer p')];
    columnFooterParagraphs.forEach((item) => {
      item.style.pointerEvents = 'auto';
    });

    const cardCloses = [...document.querySelectorAll('.card-close')];
    cardCloses.forEach((item) => {
      item.style.pointerEvents = 'auto';
    });
  }
}
