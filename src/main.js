import "./styles/main.css";
import { World } from "./world/world";
import { Globe } from "./world/components/globe";
import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from "./components/Sidebar";

function main() {
  const container = document.querySelector("#globe-container");
  const world = new World(container);
  world.start();

  const globe = new Globe();
  globe.waitForData().then(() => {
    const events = globe.getEvents();
    console.log(events);

    ReactDOM.render(<Sidebar events={events} world={world} />, document.querySelector("#sidebar"));
  }).catch((error) => {
    console.error('Error initializing globe:', error);
  });
}

main();