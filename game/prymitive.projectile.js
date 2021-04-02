AFRAME.registerPrimitive('a-projectile', {
  defaultComponents: {
    projectile: {
      speed: 0.05,
      damage: 1,
      lifespan: 100
    }
  },
  mappings: {
    speed: 'projectile.speed'
  }
});