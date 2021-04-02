AFRAME.registerComponent('ship', {
  init: function () {
    this.controller = document.getElementById('ship-control');
    this.targetPosition = new THREE.Vector3();
    this.targetRotation = new THREE.Vector3();
    var self = this;
    document.querySelectorAll('[vive-controls]').forEach(function(el){
      el.addEventListener('triggerdown', function(ev){
        self.shoot = true;
      });
      el.addEventListener('triggerup', function(ev){
        self.shoot = false;
      });
    });
  },
  tick: function(){
    
    this.targetPosition = this.controller.object3D.position;
    this.targetRotation = this.controller.object3D.rotation;

    let shipEl = this.el;
    shipEl.object3D.position.x = this.targetPosition.x;
    shipEl.object3D.position.y = this.targetPosition.y;
    shipEl.object3D.position.z = this.targetPosition.z;

    shipEl.object3D.rotation.x = this.targetRotation.x;
    shipEl.object3D.rotation.y = this.targetRotation.y;
    shipEl.object3D.rotation.z = this.targetRotation.z;

    if ( this.shoot ) {
      this.el.querySelectorAll('[shipgun]').forEach( el => el.dispatchEvent(new Event('shoot')));
    }
  }
});