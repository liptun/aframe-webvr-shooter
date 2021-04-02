AFRAME.registerComponent('shipgun', {
  init: function () {
    this.cooldown = 0;
    let self = this;
    this.el.addEventListener('shoot', function(ev){
      if ( self.cooldown === 0 ) {
        self.cooldown = 6;
        createProjectile(
          self.el.object3D.getWorldPosition(new THREE.Vector3()),
          self.el.parentNode.object3D.rotation,
          1
        );
      }
    });
  },
  tick: function() {
    this.cooldown = Math.max(0, this.cooldown - 1);
  }
});