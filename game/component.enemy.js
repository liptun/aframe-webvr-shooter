AFRAME.registerComponent('enemy', {
  init: function () {
    this.behaviour = 0;
    this.behaviourChangeTimer = 0;
    this.behaviourChangeTimerMax = 100;
    this.behaviourInit = true;
    this.behaviourTarget = new THREE.Vector3();
    this.rotationDirection = Math.floor(Math.random() * 2);
    this.moveSpeed = Math.random() / 100 + 0.005;
    this.el.setAttribute('colide-radius', 0.05);
    this.enemyModel = document.createElement('a-entity');
    this.enemyModel.setAttribute('gltf-model', '#enemy');
    this.enemyModel.setAttribute('scale', '0.05 0.05 0.05');
    this.el.appendChild(this.enemyModel);
    let self = this;
    this.el.addEventListener('collision', function(ev){
      self.el.dispatchEvent(new Event('destroy'));
    });
    this.el.addEventListener('destroy', function(ev){
      let explosion = document.createElement('a-explosion');

      explosion.object3D.position.x = self.el.object3D.position.x;
      explosion.object3D.position.y = self.el.object3D.position.y;
      explosion.object3D.position.z = self.el.object3D.position.z;
      self.el.sceneEl.appendChild(explosion);

      self.el.sceneEl.removeChild(self.el);
    });
  },
  tick: function(){
    
    this.behaviourChangeTimer = Math.max(this.behaviourChangeTimer - 1, 0);
    if ( this.behaviourChangeTimer === 0 ) {
      this.behaviourChangeTimer = this.behaviourChangeTimerMax;
      this.behaviour = Math.floor(Math.random() * 2);
      this.behaviourInit = true;
    }
    if (this.behaviourInit) {
      this.behaviourTarget = getRandomPositionAroundPlayer();
      this.behaviourInit = false;
      this.el.object3D.lookAt(this.behaviourTarget);
    }
    if ( this.behaviour === 0 ) {
      this.el.object3D.translateZ(this.moveSpeed * 2);
    }
    if ( this.behaviour === 1 ) {

      this.behaviourTarget = document.getElementById('player').object3D.position;
      this.el.object3D.lookAt(this.behaviourTarget);
      
      let distanceToPlayer = this.behaviourTarget.distanceTo(this.el.object3D.position);
  
      let safeBouble = .5;
  
      if ( distanceToPlayer > safeBouble ) {
        if ( distanceToPlayer - safeBouble >= this.moveSpeed ) {
          this.el.object3D.translateZ(this.moveSpeed);
        } else {
          this.el.object3D.translateZ(distanceToPlayer - safeBouble);
        }
      } else {
        if ( distanceToPlayer < safeBouble * .8 ) {
          this.el.object3D.translateZ(-this.moveSpeed);
        }
      }
    }

    if ( this.rotationDirection ) {
      this.enemyModel.object3D.rotation.y += this.moveSpeed * 2;
    } else {
      this.enemyModel.object3D.rotation.y -= this.moveSpeed * 2;
    }


  },
  remove: function(){
    
  }
});