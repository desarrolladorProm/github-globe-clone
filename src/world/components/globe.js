import ThreeGlobe from "three-globe";
import countries from "../assets/globe-min.json";
import { hexToRgb, genRandomNumbers } from "../systems/utils";
import { Color, Raycaster, Vector2, PerspectiveCamera, Spherical, Sprite, SpriteMaterial, CanvasTexture } from 'three';
import { createGalaxyBackground } from './galaxy';

const interval = 2;
let deltaGlobe = 0;
let numbersOfRings = 0;

class Globe {
  constructor() {
    this.instance = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    });
    this.pointsData = [];

    this._buildData();
    this._buildMaterial();

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5; // Adjust as needed
    this.camera.lookAt(this.instance.position);

    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    this.instance.tick = (delta) => this.tick(delta);

    const galaxy = createGalaxyBackground();
    this.instance.add(galaxy);
  }

  async init() {
    await this._buildData();
    this.initCountries(1000);
  }

  initCountries(delay) {
    setTimeout(() => {
      this.instance
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(false) // Ensure atmosphere is disabled
        .hexPolygonColor((e) => {
          return "rgba(255,255,255, 0.7)";
        });
    }, delay);
  }
tick(delta) {
  deltaGlobe += delta;

  if (deltaGlobe > interval) {
    numbersOfRings = genRandomNumbers(
      0,
      this.pointsData.length,
      Math.floor((this.pointsData.length * 4) / 5)
    );
    this.instance.ringsData(
      this.pointsData.filter((d, i) => numbersOfRings.includes(i))
    );

    // Render text labels based on the type field
    for (let i = 0; i < this.pointsData.length; i++) {
      const point = this.pointsData[i];

      function degToRad(degrees) {
        return degrees * (Math.PI / 180);
      }

      // Create a canvas to draw the text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 10048; // Increase canvas width
      canvas.height = 1024; // Increase canvas height
      context.font = '1000px Arial'; // Increase font size
      context.fillStyle = point.status === 'ongoing' ? '#ff0000' : '#00ff00';
      context.fillText(point.type, 0, 800); // Adjust text position

      // Create a texture from the canvas
      const texture = new CanvasTexture(canvas);
      const material = new SpriteMaterial({ map: texture });
      const sprite = new Sprite(material);

      // Scale the sprite to make the text larger
      sprite.scale.set(10, 5, 1); // Adjust scale as needed

      // Convert spherical coords to Cartesian
      const radius = 100; // Adjust as needed
      const zOffset = 4; // Adjust as needed
      const sphericalPos = new Spherical(
        radius + zOffset,
        degToRad(90 - point.lat),
        degToRad(point.lng)
      );
      sprite.position.setFromSpherical(sphericalPos);

      // Add the sprite to the scene
      this.instance.add(sprite);
    }

    deltaGlobe = deltaGlobe % interval;
  }
}

  async _buildData() {
    let points = [];
    try {
      // Fetch data from API
      const response = await fetch('https://api.reliefweb.int/v1/disasters?appname=rw-user-0&profile=full&preset=latest&slim=0&limit=10');
      const data = await response.json();
      const arcs = data.data; // get the 'data' array from the response

      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        const rgb = hexToRgb('#62DAFF'); // use a fixed color for now
        points.push({
          size: 1.0,
          order: i, // use the index as the order
          color: (t) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
          label: arc.fields.primary_country.name,
          lat: arc.fields.primary_country.location.lat,
          lng: arc.fields.primary_country.location.lon,
          name: arc.fields.name,
          type: arc.fields.primary_type.name,
          status: arc.fields.status,
          description: arc.fields.description,
          url: arc.fields.url,
        });
      }
      this.pointsData = points.filter(
        (v, i, a) =>
          a.findIndex((v2) => ["lat", "lng"].every((k) => v2[k] === v[k])) === i
      );
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  _buildMaterial() {
    const globeMaterial = this.instance.globeMaterial();
    globeMaterial.color = new Color(0x3b42ec);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.9;
  }

  async waitForData() {
    if (this.pointsData.length > 0) {
      // Data is already loaded
      return;
    }

    // Wait for data to load
    await this._buildData();
  }

  getEvents() {
    return this.pointsData;
  }
}

export { Globe };