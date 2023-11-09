export default class TaskColumns {
  constructor() {
    this.createTaskColumns();
  }

  createTaskColumns() {
    const taskBoard = document.querySelector('.task-board');

    const toDoColumn = document.createElement('section');
    toDoColumn.className = 'to-do column dropable';
    taskBoard.append(toDoColumn);

    const inProgressColumn = document.createElement('section');
    inProgressColumn.className = 'in-progress column dropable';
    taskBoard.append(inProgressColumn);

    const doneColumn = document.createElement('section');
    doneColumn.className = 'done column dropable';
    taskBoard.append(doneColumn);

    const columnHeaderToDo = document.createElement('header');
    toDoColumn.append(columnHeaderToDo);

    const columnHeaderInProgress = document.createElement('header');
    inProgressColumn.append(columnHeaderInProgress);

    const columnHeaderDone = document.createElement('header');
    doneColumn.append(columnHeaderDone);

    const columnFooterToDo = document.createElement('footer');
    columnFooterToDo.className = 'footer to-do';
    toDoColumn.append(columnFooterToDo);
    const addCardToDo = document.createElement('p');
    addCardToDo.className = 'add-card-button';
    columnFooterToDo.append(addCardToDo);
    addCardToDo.textContent = '✙ Add another card';

    const columnFooterinProgress = document.createElement('footer');
    columnFooterinProgress.className = 'footer in-progess';
    inProgressColumn.append(columnFooterinProgress);
    const addCardInProgress = document.createElement('p');
    addCardInProgress.className = 'add-card-button';
    columnFooterinProgress.append(addCardInProgress);
    addCardInProgress.textContent = '✙ Add another card';

    const columnFooterDone = document.createElement('footer');
    columnFooterDone.className = 'footer done';
    doneColumn.append(columnFooterDone);
    const addCardDone = document.createElement('p');
    addCardDone.className = 'add-card-button';
    columnFooterDone.append(addCardDone);
    addCardDone.textContent = '✙ Add another card';

    const titleToDo = document.createElement('p');
    const contextButtonToDo = document.createElement('div');
    contextButtonToDo.classList = 'column-header-button';
    contextButtonToDo.textContent = '\u22EF';
    columnHeaderToDo.append(titleToDo);
    titleToDo.textContent = 'todo';
    columnHeaderToDo.append(contextButtonToDo);

    const titleInProgress = document.createElement('p');
    const contextButtonInProgress = document.createElement('div');
    contextButtonInProgress.classList = 'column-header-button';
    contextButtonInProgress.textContent = '\u22EF';
    columnHeaderInProgress.append(titleInProgress);
    titleInProgress.textContent = 'in progress';
    columnHeaderInProgress.append(contextButtonInProgress);

    const titleDone = document.createElement('p');
    const contextButtonDone = document.createElement('div');
    contextButtonDone.classList = 'column-header-button';
    contextButtonDone.textContent = '\u22EF';
    columnHeaderDone.append(titleDone);
    titleDone.textContent = 'done';
    columnHeaderDone.append(contextButtonDone);
  }
}
