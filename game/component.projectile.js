AFRAME.registerComponent('projectile', {
  schema: {
    speed: {type: 'float', default: 0},
    damage: {type: 'int', default: 1},
    lifespan: {type: 'int', default: 100}
  },
  init: function () {
    this.colideRadius = 0.005;
    this.bulletTexture = document.createElement('a-image');
    this.bulletTexture.setAttribute('src', '#bullet');
    this.bulletTexture.setAttribute('height', .05);
    this.bulletTexture.setAttribute('width', .05);
    this.el.appendChild(this.bulletTexture);
    let self = this;
    this.el.addEventListener('destroy', function(ev){
      self.el.sceneEl.removeChild(self.el);
    });
  },
  tick: function(time, delta) {
    let camPos = document.querySelector('[camera]').object3D.position;
    this.bulletTexture.object3D.lookAt(camPos);
    if (this.data.lifespan-- === 0) {
      this.el.dispatchEvent(new Event('destroy'));
    }
    this.el.object3D.translateZ(-this.data.speed);

    let elementsToColideWith = document.querySelectorAll('a-enemy');
    for (let i = 0; i < elementsToColideWith.length; i++) {
      let enemyPos = elementsToColideWith[i].object3D.position;
      let distanceBetween = this.el.object3D.position.distanceTo(enemyPos);
      let minDistance = this.colideRadius + parseFloat(elementsToColideWith[i].getAttribute('colide-radius'));
      if ( distanceBetween <= minDistance ) {
        elementsToColideWith[i].dispatchEvent(new Event('collision'));
        this.el.dispatchEvent(new Event('destroy'));
      }
    }
  },
  remove: function(){

  }
});