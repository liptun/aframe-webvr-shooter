function createProjectile(createPosition, createRotation, createSpeed) {
  let sceneEl = document.querySelector('a-scene');
  let newProjectile = document.createElement('a-projectile');

  newProjectile.object3D.position.x = createPosition.x;
  newProjectile.object3D.position.y = createPosition.y;
  newProjectile.object3D.position.z = createPosition.z;

  newProjectile.object3D.rotation.x = createRotation.x;
  newProjectile.object3D.rotation.y = createRotation.y;
  newProjectile.object3D.rotation.z = createRotation.z;

  sceneEl.appendChild(newProjectile);
}

function getRandomPositionAroundPlayer() {
  let playerPos = document.getElementById('player').object3D.position;
  return new THREE.Vector3(
    Math.random() * 4 - 2 + playerPos.x,
    Math.random() * 4 - 2 + playerPos.y,
    Math.random() * 4 - 2 + playerPos.z
  );
}