export default class BoardContainer {
  constructor() {
    this.createBoardContainer();
  }

  createBoardContainer() {
    const body = document.querySelector('body');

    const boardContainer = document.createElement('div');
    boardContainer.className = 'board-container';
    body.append(boardContainer);

    const taskBoard = document.createElement('main');
    taskBoard.className = 'task-board';
    boardContainer.append(taskBoard);
  }
}
