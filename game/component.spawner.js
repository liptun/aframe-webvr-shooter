AFRAME.registerComponent('spawner', {
  init: function () {
    this.spawnCooldown = 0;
    this.spawnCooldownMax = 15;
    this.el.addEventListener('spawn', function(){
      if ( document.querySelectorAll('a-enemy').length <= 50 ) {
        let newEnemy = document.createElement('a-enemy');
        let newPos = getRandomPositionAroundPlayer();
        newEnemy.object3D.position.x = newPos.x;
        newEnemy.object3D.position.y = newPos.y;
        newEnemy.object3D.position.z = newPos.z;
        document.querySelector('a-scene').appendChild(newEnemy);
      }
    });
  },
  tick: function() {
    if ( this.spawnCooldown === 0 ) {
      this.el.dispatchEvent(new Event('spawn'));
      this.spawnCooldown = this.spawnCooldownMax;
    }
    this.spawnCooldown = Math.max(this.spawnCooldown - 1, 0);
  }
});