import { Globe } from '/src/world/components/globe.js';
import { Sidebar } from './Sidebar.js';

class App {
  constructor() {
    this.globe = new Globe();
    this.sidebar = new Sidebar();
  }

  async init() {
    await this.globe.init();
    this.sidebar.render(this.globe.pointsData);
  }
}

export { App };