import { TextureLoader, MeshBasicMaterial, SphereGeometry, Mesh, BackSide } from 'three';

export function createGalaxyBackground() {
  // Load the galaxy texture
  const textureLoader = new TextureLoader();
  const galaxyTexture = textureLoader.load('static/galaxyTexture.jpg'); // Replace with the path to your galaxy texture

  // Create a material with the galaxy texture
  const galaxyMaterial = new MeshBasicMaterial({ map: galaxyTexture, side: BackSide });

  // Create a sphere geometry with a large radius
  const galaxyGeometry = new SphereGeometry(500, 32, 32); // Adjust the radius as needed

  // Create a mesh with the geometry and material
  const galaxy = new Mesh(galaxyGeometry, galaxyMaterial);

  return galaxy;
}