import "/styles/main.css";
import { World } from "./world/world";
import { Globe } from "./world/components/globe";

function main() {
  const container = document.querySelector("#globe-container");
  const world = new World(container);
  world.start();

  const globe = new Globe();
  globe.waitForData().then(() => {
    const events = globe.getEvents();
    console.log(events);

    const sidebar = document.querySelector("#sidebar");
    events.forEach(event => {
      const eventElement = document.createElement("div");
      eventElement.classList.add("card");

      const title = document.createElement("h2");
      title.textContent = event.name;
      eventElement.appendChild(title);

      const shortDesc = document.createElement("p");
      shortDesc.textContent = event.description.substring(0, 100) + "..."; // Display the first 100 characters of the description
      eventElement.appendChild(shortDesc);

      const linkButton = document.createElement("button");
      linkButton.textContent = "View More";
      linkButton.onclick = () => window.open('https://reliefweb.int/node/4053837', '_blank');
      eventElement.appendChild(linkButton);

      const globeButton = document.createElement("button");
      globeButton.textContent = "Go to Location";
      globeButton.onclick = () => {
        world.moveToLocation(event.lat, event.lng);
      };
      eventElement.appendChild(globeButton);

      sidebar.appendChild(eventElement);
    });
  });
}

main();